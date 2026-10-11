import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiBookOpen, FiChevronDown, FiRefreshCw, FiEdit2, FiTrash2 } from 'react-icons/fi';
import SideBar from '../components/SideBar';
import loginService from '../services/loginService';
import pomodoroService from '../services/pomodoroService';
import cornellService from '../services/cornellService';
import './PainelNotebook.css';

const NOTEBOOK_TYPES = [
    {
        key: 'pomodoro',
        name: 'Pomodoro',
        search: pomodoroService.searchPomodoroByUserId,
        remove: pomodoroService.deletePomodoro,
        fields: [['resume', 'Anotações']]
    },
    {
        key: 'cornell',
        name: 'Cornell',
        search: cornellService.searchCornellByUserId,
        remove: cornellService.deleteCornell,
        fields: [['description', 'Perguntas e palavras-chave'], ['noteClass', 'Notas da aula'], ['resume', 'Resumo']]
    }
];

function PainelNotebook() {
    const [user] = useState(loginService.getUser);
    const [notebooks, setNotebooks] = useState({});
    const [loading, setLoading] = useState(Boolean(user?.id));
    const [reload, setReload] = useState(0);
    const [deleting, setDeleting] = useState('');
    const [actionError, setActionError] = useState('');

    async function deleteNotebook(type, notebook) {
        if (deleting || !window.confirm('Excluir o caderno "' + notebook.title + '"? Esta ação não pode ser desfeita.')) return;
        setDeleting(type.key + ':' + notebook.id);
        setActionError('');
        try {
            await type.remove(notebook.id, user.id);
            setNotebooks(current => ({ ...current, [type.key]: {
                ...current[type.key], items: current[type.key].items.filter(item => item.id !== notebook.id)
            } }));
        } catch (error) {
            setActionError(error.message);
        } finally {
            setDeleting('');
        }
    }

    useEffect(() => {
        if (!user?.id) return;
        const controller = new AbortController();

        async function loadNotebooks() {
            setLoading(true);
            const results = await Promise.allSettled(
                NOTEBOOK_TYPES.map(type => type.search(user.id, controller.signal))
            );
            if (controller.signal.aborted) return;

            const loaded = Object.fromEntries(results.map((result, index) => [
                NOTEBOOK_TYPES[index].key,
                result.status === 'fulfilled'
                    ? { items: result.value, error: '' }
                    : { items: [], error: result.reason.message || 'Não foi possível carregar os cadernos.' }
            ]));

            setNotebooks(loaded);
            setLoading(false);
        }

        loadNotebooks();
        return () => controller.abort();
    }, [user?.id, reload]);

    return (
        <div className="notebookPage">
            <SideBar />

            <main className="notebookContainer">
                <header className="notebookHeader">
                    <div className="notebookHeading">
                        <Link className="notebookBackLink" to="/home" aria-label="Voltar à Home"><FiArrowLeft aria-hidden="true" /></Link>
                        <div className="notebookHeadingText">
                            
                            <h1 className="notebookTitle">Cadernos</h1>
                        </div>
                    </div>

                    {user?.id && <button className="notebookRefresh" type="button" disabled={loading || Boolean(deleting)} onClick={() => setReload(current => current + 1)}><FiRefreshCw aria-hidden="true" /> Atualizar</button>}
                </header>

                <p className="notebookIntroduction">Releia os cadernos que você salvou. Clique em um título para ver suas anotações.</p>

                {actionError && <p className="notebookError" role="alert">{actionError}</p>}

                {!user?.id ? (
                    <div className="notebookMessage">
                        <p className="notebookMessageText">Entre na sua conta para acessar seus cadernos.</p>
                        <Link className="notebookLink" to="/login">Fazer login</Link>
                    </div>
                ) : loading ? (
                    <p className="notebookMessage" role="status">Carregando seus cadernos...</p>
                ) : (
                    <div className="notebookGroups">
                        {NOTEBOOK_TYPES.map(type => {
                            const { items = [], error = '' } = notebooks[type.key] || {};

                            return (
                                <section className="notebookGroup" key={type.key} aria-labelledby={type.key + 'NotebooksTitle'}>
                                    <header className="notebookGroupHeader">
                                        <h2 className="notebookGroupTitle" id={type.key + 'NotebooksTitle'}><FiBookOpen aria-hidden="true" /> {type.name}</h2>
                                        {!error && <span className="notebookCount">{items.length} {items.length === 1 ? 'caderno' : 'cadernos'}</span>}
                                    </header>

                                    {error ? (
                                        <p className="notebookError" role="alert">{error} Use Atualizar para tentar novamente.</p>
                                    ) : items.length === 0 ? (
                                        <p className="notebookEmpty">Você ainda não salvou um caderno {type.name}.</p>
                                    ) : (
                                        <div className="notebookList">
                                            {items.map(notebook => (
                                                <details className="notebookCard" key={notebook.id}>
                                                    <summary className="notebookCardSummary">
                                                        <h3 className="notebookCardTitle">{notebook.title}</h3>
                                                        <FiChevronDown className="notebookExpandIcon" aria-hidden="true" />
                                                    </summary>

                                                    <div className="notebookCardContent">
                                                        {type.fields.map(([field, label]) => (
                                                            <div className="notebookField" key={field}>
                                                                <h4 className="notebookFieldTitle">{label}</h4>
                                                                <p className="notebookFieldText">{notebook[field] || 'Nenhuma anotação neste campo.'}</p>
                                                            </div>
                                                        ))}
                                                        <div className="notebookActions">
                                                            <Link className="notebookEdit" to={'/' + type.key + '?notebook=' + notebook.id}><FiEdit2 aria-hidden="true" /> Editar</Link>
                                                            <button className="notebookDelete" type="button" disabled={Boolean(deleting)} onClick={() => deleteNotebook(type, notebook)}><FiTrash2 aria-hidden="true" /> {deleting === type.key + ':' + notebook.id ? 'Excluindo...' : 'Excluir'}</button>
                                                        </div>
                                                    </div>
                                                </details>
                                            ))}
                                        </div>
                                    )}

                                    <Link className="notebookLink" to={'/' + type.key}>Estudar com {type.name} →</Link>
                                </section>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

export default PainelNotebook;
