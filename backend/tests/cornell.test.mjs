import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks, stripTypeScriptTypes, createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const records = [];
let failDatabase = false;

globalThis.cornellTestPool = {
    async query(sql, values) {
        if (failDatabase) throw new Error('Private database details');

        if (sql.startsWith('SELECT * FROM user')) {
            return [[1, 2].includes(values[0]) ? [{ id: values[0] }] : []];
        }

        if (sql.startsWith('INSERT INTO cornell')) {
            const [userId, title, description, resume, noteClass] = values;
            const id = records.length + 1;
            records.push({ id, userId, title, description, resume, noteClass });
            return [{ insertId: id }];
        }

        if (sql.includes('WHERE id = ? AND userId = ?')) {
            if (sql.startsWith('SELECT')) return [records.filter(record => record.id === values[0] && record.userId === values[1])];
            const offset = sql.startsWith('UPDATE') ? 4 : 0;
            const index = records.findIndex(record => record.id === values[offset] && record.userId === values[offset + 1]);
            if (index < 0) return [{ affectedRows: 0 }];
            if (sql.startsWith('UPDATE') && ["title","description","resume","noteClass"].every((field, position) => records[index][field] === values[position])) return [{ affectedRows: 0 }];
            if (sql.startsWith('DELETE')) records.splice(index, 1);
            else Object.assign(records[index], { title: values[0], description: values[1], resume: values[2], noteClass: values[3] });
            return [{ affectedRows: 1 }];
        }

        return [records.filter(record => record.userId === values[0]).toReversed()];
    }
};

registerHooks({
    resolve(specifier, context, nextResolve) {
        if (specifier.startsWith('.') && !/\.\w+$/.test(specifier)) {
            if (context.parentURL?.endsWith('.ts')) specifier += '.ts';
            else if (context.parentURL?.includes('/frontend/src/services/')) specifier += '.js';
        }

        return nextResolve(specifier, context);
    },

    load(url, context, nextLoad) {
        if (url.endsWith('/config/db.ts')) {
            return { format: 'module', source: 'export default globalThis.cornellTestPool;', shortCircuit: true };
        }

        if (url.endsWith('.ts')) {
            const source = stripTypeScriptTypes(readFileSync(fileURLToPath(url), 'utf8'));
            return { format: 'module', source, shortCircuit: true };
        }

        return nextLoad(url, context);
    }
});

const require = createRequire(import.meta.url);
const express = require('express');
const { default: routes } = await import('../routes/CornellRoutes.ts');
const app = express();
app.use(express.json());
app.use('/api', routes);
let server;
let baseUrl;

before(async () => {
    server = await new Promise(resolve => {
        const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
    });
    baseUrl = 'http://127.0.0.1:' + server.address().port;
});

after(() => new Promise(resolve => server.close(resolve)));

async function create(body) {
    return fetch(baseUrl + '/api/cornell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: "", noteClass: "", ...body })
    });
}

test('salva título e anotações com o usuário correto', async () => {
    const response = await create({ userId: 1, title: '  Biologia  ', resume: 'Fotossíntese\nIdeias e dúvidas' });
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), { id: 1, userId: 1, title: 'Biologia', description: '', noteClass: '', resume: 'Fotossíntese\nIdeias e dúvidas' });
});

test('lista apenas os cadernos do usuário, do mais recente ao mais antigo', async () => {
    await create({ userId: 2, title: 'Outro usuário', resume: '' });
    await create({ userId: 1, title: 'Química', resume: '' });
    const response = await fetch(baseUrl + '/api/cornell/user/1');
    assert.equal(response.status, 200);
    const notebooks = await response.json();
    assert.deepEqual(notebooks.map(notebook => notebook.title), ['Química', 'Biologia']);
    assert.ok(notebooks.every(notebook => notebook.userId === 1));
});

test('rejeita dados inválidos sem inserir registros', async () => {
    const count = records.length;
    for (const body of [{}, { userId: 0, title: 'Teste', resume: '' }, { userId: '1', title: 'Teste', resume: '' }, { userId: 1, title: ' ', resume: '' }, { userId: 1, title: 'a'.repeat(256), resume: '' }, { userId: 1, title: 'Teste', resume: 123 }, { userId: 1, title: 'Teste', resume: 'á'.repeat(32768) }]) {
        assert.equal((await create(body)).status, 400);
    }
    assert.equal(records.length, count);
});

test('rejeita usuário inexistente e parâmetro inválido', async () => {
    assert.equal((await create({ userId: 99, title: 'Teste', resume: '' })).status, 404);
    assert.equal((await fetch(baseUrl + '/api/cornell/user/99')).status, 404);
    assert.equal((await fetch(baseUrl + '/api/cornell/user/abc')).status, 400);
});

test('usuário sem cadernos recebe uma lista vazia', async () => {
    const response = await fetch(baseUrl + '/api/cornell/user/2');
    assert.ok((await response.json()).length > 0);
    const previous = records.splice(0);
    try {
        assert.deepEqual(await (await fetch(baseUrl + '/api/cornell/user/2')).json(), []);
    } finally {
        records.push(...previous);
    }
});

test('falha do banco retorna erro sem expor detalhes internos', async () => {
    failDatabase = true;
    try {
        const response = await create({ userId: 1, title: 'Teste', resume: '' });
        assert.equal(response.status, 500);
        assert.deepEqual(await response.json(), { message: 'Erro ao acessar o caderno Cornell.' });
    } finally {
        failDatabase = false;
    }
});

test('serviços frontend guardam o usuário e enviam as anotações à API', async () => {
    const storage = new Map();
    globalThis.sessionStorage = {
        getItem: key => storage.get(key) ?? null,
        setItem: (key, value) => storage.set(key, value),
        removeItem: key => storage.delete(key)
    };

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url, options) => {
        if (url.endsWith('/api/login')) {
            return Response.json({ success: true, user: { id: 1, name: 'Ana' } });
        }
        return originalFetch(url.replace('http://localhost:3000', baseUrl), options);
    };

    try {
        const { default: loginService } = await import('../../frontend/src/services/loginService.js');
        const { default: cornellService } = await import('../../frontend/src/services/cornellService.js');
        await loginService.login('ana@example.com', 'senha');
        assert.equal(loginService.getUser().id, 1);
        const notebook = await cornellService.createCornell(loginService.getUser().id, 'Frontend', 'Perguntas', 'Resumo', 'Notas da aula');
        assert.equal(notebook.description, 'Perguntas');
        assert.equal(notebook.resume, 'Resumo');
        assert.equal(notebook.noteClass, 'Notas da aula');
        const notebooks = await cornellService.searchCornellByUserId(1);
        assert.equal(notebooks[0].id, notebook.id);
        const edited = await cornellService.updateCornell(notebook.id, 1, { ...notebook, title: 'Frontend editado' });
        assert.equal(edited.id, notebook.id);
        assert.equal(edited.title, 'Frontend editado');
        await cornellService.deleteCornell(notebook.id, 1);
        assert.ok(!(await cornellService.searchCornellByUserId(1)).some(item => item.id === notebook.id));
        loginService.logout();
        assert.equal(loginService.getUser(), null);
    } finally {
        globalThis.fetch = originalFetch;
        delete globalThis.sessionStorage;
    }
});

test('valida os três campos do caderno e mantém cada conteúdo separado', async () => {
    for (const field of ['description', 'resume', 'noteClass']) {
        for (const value of [null, 123, 'á'.repeat(32768), undefined]) {
            const response = await create({ userId: 1, title: 'Teste', description: '', resume: '', noteClass: '', [field]: value });
            assert.equal(response.status, 400);
        }
    }

    const body = { userId: 1, title: 'Cornell completo', description: 'Perguntas\nPalavras-chave', resume: 'Resumo da aula', noteClass: 'Notas e exemplos' };
    const response = await create(body);
    assert.equal(response.status, 201);
    const saved = await response.json();
    assert.deepEqual(saved, { id: saved.id, ...body });
    const notebooks = await (await fetch(baseUrl + '/api/cornell/user/1')).json();
    assert.deepEqual(notebooks[0], saved);
});

async function modify(id, body, method = 'PUT') {
    return fetch(baseUrl + '/api/cornell/' + id + (method === 'DELETE' ? '?userId=' + body.userId : ''), {
        method, headers: { 'Content-Type': 'application/json' },
        ...(method === 'PUT' ? { body: JSON.stringify(body) } : {})
    });
}

test('atualiza sem duplicar, mantém os campos e permite salvar sem mudanças', async () => {
    const body = { userId: 1, title: 'Original', resume: 'Notas', description: 'Perguntas', noteClass: 'Aula' };
    const created = await (await create(body)).json();
    const count = records.length;
    const updated = { ...body, title: '  Editado  ', resume: '' };
    const response = await modify(created.id, updated);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ...updated, title: 'Editado', id: created.id });
    assert.equal(records.length, count);
    assert.equal((await modify(created.id, updated)).status, 200);
    assert.equal((await modify(created.id, { ...updated, title: ' ' })).status, 400);
    assert.equal(records.find(record => record.id === created.id).title, 'Editado');
});

test('atualização e exclusão validam IDs e não alteram cadernos de outro usuário', async () => {
    const body = { userId: 1, title: 'Privado', resume: '', description: '', noteClass: '' };
    const created = await (await create(body)).json();
    assert.equal((await modify(created.id, { ...body, userId: 2 })).status, 404);
    assert.equal((await modify(created.id, { userId: 2 }, 'DELETE')).status, 404);
    assert.equal((await modify('abc', body)).status, 400);
    assert.equal((await modify(0, body, 'DELETE')).status, 400);
    assert.equal((await modify(created.id, { userId: 0 }, 'DELETE')).status, 400);
    assert.equal((await modify(99999, body)).status, 404);
    assert.equal((await modify(created.id, { userId: 1 }, 'DELETE')).status, 200);
    assert.ok(!records.some(record => record.id === created.id));
    assert.equal((await modify(created.id, body)).status, 404);
    assert.equal((await modify(created.id, { userId: 1 }, 'DELETE')).status, 404);
});

test('update e delete retornam falhas do banco sem detalhes internos', async () => {
    failDatabase = true;
    try {
        for (const method of ['PUT', 'DELETE']) {
            const response = await modify(1, { userId: 1, title: 'Teste', resume: '', description: '', noteClass: '' }, method);
            assert.equal(response.status, 500);
            assert.deepEqual(await response.json(), { message: 'Erro ao acessar o caderno Cornell.' });
        }
    } finally { failDatabase = false; }
});
