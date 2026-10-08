import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks, stripTypeScriptTypes } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';

const rows = new Map();
let nextId = 1;
const queries = [];
const pool = {
    async query(sql, values = []) {
        queries.push({ sql, values });
        if (sql.startsWith('SELECT')) {
            let found = [...rows.values()];
            if (sql.includes('WHERE id = ?')) found = found.filter((row) => row.id === values[0]);
            else if (sql.includes('WHERE email = ?')) found = found.filter((row) => row.email === values[0]);
            else if (sql.includes('WHERE email LIKE ?')) found = found.filter((row) => row.email.includes(values[0].slice(1, -1)));
            else if (sql.includes('WHERE name LIKE ?')) found = found.filter((row) => row.name.toLowerCase().includes(values[0].slice(1, -1).toLowerCase()));
            return [found.map((row) => ({ ...row })), []];
        }
        if (sql.startsWith('INSERT')) {
            const [name, password, email, phone] = values;
            if ([...rows.values()].some((row) => row.email === email || (phone !== null && row.phone === phone))) throw Object.assign(new Error('Duplicate'), { code: 'ER_DUP_ENTRY' });
            assert.equal(typeof name, 'string');
            assert.equal(typeof email, 'string');
            assert.equal(password.length, 49);
            const id = nextId++;
            rows.set(id, { id, name, password, email, phone });
            return [{ insertId: id, affectedRows: 1 }, []];
        }
        if (sql.startsWith('UPDATE')) {
            const id = values.at(-1);
            const row = rows.get(id);
            if (!row) return [{ affectedRows: 0 }, []];
            const [name, email, phone] = values;
            if ([...rows.values()].some((other) => other.id !== id && (other.email === email || (phone !== null && other.phone === phone)))) throw Object.assign(new Error('Duplicate'), { code: 'ER_DUP_ENTRY' });
            assert.equal(typeof email, 'string');
            Object.assign(row, { name, email, phone });
            if (sql.includes('password = ?')) {
                assert.equal(values[3].length, 49);
                row.password = values[3];
            }
            return [{ affectedRows: 1 }, []];
        }
        if (sql.startsWith('DELETE')) return [{ affectedRows: rows.delete(values[0]) ? 1 : 0 }, []];
        throw new Error('Unexpected query: ' + sql);
    },
};
globalThis.__userTestPool = pool;

// Run the real TypeScript modules with native type stripping and an isolated DB.
registerHooks({
    resolve(specifier, context, nextResolve) {
        if (specifier.startsWith('.') && context.parentURL?.endsWith('.ts') && !/\.[a-z]+$/i.test(specifier)) {
            return nextResolve(specifier + '.ts', context);
        }
        return nextResolve(specifier, context);
    },
    load(url, context, nextLoad) {
        if (url.endsWith('/config/db.ts')) return { format: 'module', source: 'export default globalThis.__userTestPool;', shortCircuit: true };
        if (url.endsWith('.ts')) return { format: 'module', source: stripTypeScriptTypes(readFileSync(fileURLToPath(url), 'utf8')), shortCircuit: true };
        return nextLoad(url, context);
    },
});

const { default: router } = await import('../routes/UserRoutes.ts');
const { verifyPassword } = await import('../services/UserCredentials.ts');
const { default: infrastructure } = await import('../infrastructure/UserInfrastructure.ts');
let server;
let base;
before(async () => {
    const app = express();
    app.use(express.json());
    app.use('/api', router);
    server = await new Promise((resolve) => {
        const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
    });
    base = 'http://127.0.0.1:' + server.address().port + '/api';
});
after(async () => { await new Promise((resolve) => server.close(resolve)); });
beforeEach(() => { rows.clear(); queries.length = 0; nextId = 1; });

async function request(method, path, body) {
    const response = await fetch(base + path, { method, headers: { 'Content-Type': 'application/json' }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    return { status: response.status, body: await response.json() };
}
const account = { name: ' Ana ', email: 'ana@example.com', password: 'senha123' };
async function create(body = account) { return request('POST', '/users', body); }

function assertPublic(row) {
    assert.deepEqual(Object.keys(row).sort(), ['email', 'id', 'name', 'phone']);
}

test('cadastro valida campos, aceita telefone opcional e armazena hash no limite do esquema', async () => {
    assert.equal((await create({ ...account, password: '' })).status, 400);
    assert.equal((await create({ ...account, email: 'invalido' })).status, 400);
    assert.equal((await create({ ...account, name: null })).status, 400);
    assert.equal((await request('POST', '/users', [])).status, 400);
    assert.equal(queries.length, 0);
    const result = await create();
    assert.equal(result.status, 201);
    assert.deepEqual(result.body, { id: 1 });
    const stored = rows.get(1);
    assert.equal(stored.name, 'ANA');
    assert.equal(stored.phone, null);
    assert.equal(stored.password.length, 49);
    assert.equal(await verifyPassword(account.password, stored.password), true);
    assert.equal(await verifyPassword('incorreta', stored.password), false);
});

test('login funciona com hash e com contas antigas sem expor senha', async () => {
    await create();
    const login = await request('POST', '/login', { email: account.email, password: account.password });
    assert.equal(login.status, 200);
    assertPublic(login.body.user);
    assert.equal((await request('POST', '/login', { email: account.email, password: 'errada' })).status, 401);
    rows.set(2, { id: 2, name: 'LEGADO', email: 'legado@example.com', password: Buffer.from('1234'), phone: null });
    assert.equal((await request('POST', '/login', { email: 'legado@example.com', password: '1234' })).status, 200);
});

test('buscas por ID, nome e e-mail usam rotas distintas e respostas públicas', async () => {
    await create();
    for (const route of ['/users/list', '/users/1', '/users/name/Ana', '/users/email/ana%40example.com']) {
        const result = await request('GET', route);
        assert.equal(result.status, 200);
        assert.equal(result.body.length, 1);
        assertPublic(result.body[0]);
    }
    assert.equal((await request('GET', '/users/999')).status, 404);
    assert.equal((await request('GET', '/users/abc')).status, 400);
    assert.equal((await request('GET', '/users/1e3')).status, 400);
    assert.equal((await request('GET', '/users/0')).status, 400);
    assert.deepEqual((await request('GET', '/users/name/Ninguem')).body, []);
    // The category service's existing repository contract stays intact.
    const internal = await infrastructure.searchUserById(1);
    assert.ok(Array.isArray(internal));
    assert.ok(Buffer.isBuffer(internal[0].password));
});

test('atualização parcial preserva senha e campos omitidos e permite limpar telefone', async () => {
    await create({ ...account, phone: '11999999999' });
    const originalPassword = rows.get(1).password;
    const result = await request('PUT', '/users/1', { name: 'Beatriz' });
    assert.equal(result.status, 200);
    assert.equal(result.body.name, 'BEATRIZ');
    assert.equal(result.body.email, account.email);
    assert.equal(result.body.phone, '11999999999');
    assertPublic(result.body);
    assert.equal(rows.get(1).password, originalPassword);
    assert.equal((await request('PUT', '/users/1', { phone: null })).body.phone, null);
    assert.equal((await request('PUT', '/users/1', { email: 'novo@example.com', password: 'novaSenha' })).status, 200);
    assert.equal(await verifyPassword('novaSenha', rows.get(1).password), true);
    assert.equal(await verifyPassword(account.password, rows.get(1).password), false);
    assert.equal((await request('POST', '/login', { email: 'novo@example.com', password: 'novaSenha' })).status, 200);
    assert.equal((await request('PUT', '/users/1', { name: '' })).status, 400);
    assert.equal((await request('PUT', '/users/1', { password: null })).status, 400);
    assert.equal((await request('PUT', '/users/1', {})).status, 400);
    assert.equal((await request('PUT', '/users/999', { name: 'Teste' })).status, 404);
});

test('cadastro e atualização retornam 409 para e-mail ou telefone duplicado', async () => {
    await create();
    assert.equal((await create()).status, 409);
    await create({ ...account, email: 'outro@example.com' });
    assert.notDeepEqual(rows.get(1).password, rows.get(2).password);
    assert.equal((await request('PUT', '/users/2', { email: account.email })).status, 409);
    assert.equal((await request('PUT', '/users/1', { phone: '11999999999' })).status, 200);
    assert.equal((await create({ ...account, email: 'terceiro@example.com', phone: '11999999999' })).status, 409);
    assert.equal((await request('PUT', '/users/2', { phone: '11999999999' })).status, 409);
});

test('exclusão usa o ID correto e trata usuários inexistentes', async () => {
    await create();
    assert.equal((await request('DELETE', '/users/abc')).status, 400);
    assert.equal(rows.size, 1);
    assert.equal((await request('DELETE', '/users/1')).status, 200);
    assert.equal(rows.size, 0);
    assert.equal((await request('DELETE', '/users/1')).status, 404);
});
