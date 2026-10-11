import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import NotebookChoice from '../components/NotebookChoice';
import { FiArrowLeft, FiBookOpen, FiLink, FiYoutube, FiCheckCircle } from 'react-icons/fi';
import { getYouTubeId } from '../services/getYoutube';
import cornellService from '../services/cornellService';
import loginService from '../services/loginService';
import './cornell.css';

function Cornell() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const requestedNotebookId = Number(searchParams.get("notebook"));
    const [choosing, setChoosing] = useState(true);
    const [existingNotebooks, setExistingNotebooks] = useState([]);
    const [notebookId, setNotebookId] = useState(null);
    const [user] = useState(loginService.getUser);
    const [notebook, setNotebook] = useState({ title: '', description: '', noteClass: '', resume: '' });
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(Boolean(user?.id));
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [videoId, setVideoId] = useState(null);
    const [videoError, setVideoError] = useState('');

    useEffect(() => {
        if (!user?.id) return;
        const controller = new AbortController();

        async function loadNotebook() {
            try {
                const cornells = await cornellService.searchCornellByUserId(user.id, controller.signal);
                if (controller.signal.aborted) return;

                setExistingNotebooks(cornells);
                if (requestedNotebookId) {
                    const selected = cornells.find(item => item.id === requestedNotebookId);
                    if (selected) selectNotebook(selected);
                    else setSaveMessage('Caderno não encontrado.');
                }

            } catch (error) {
                if (!controller.signal.aborted) setSaveMessage(error.message);

            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        loadNotebook();
        return () => controller.abort();
    }, [user?.id, requestedNotebookId]);

    function createNotebook() {
        setNotebook({ title: '', description: '', noteClass: '', resume: '' });
        setSaved(false);
        setSaveMessage('');
        setNotebookId(null);
        setChoosing(false);
    }

    function selectNotebook(selected) {
        setNotebook({ title: selected.title, description: selected.description, noteClass: selected.noteClass, resume: selected.resume });
        setSaved(true);
        setSaveMessage('Salvo no banco de dados');
        setNotebookId(selected.id);
        setChoosing(false);
    }

    function updateNotebook(field, value) {
        setNotebook((current) => ({ ...current, [field]: value }));
        setSaved(false);
        setSaveMessage('Alterações não salvas');
    }

    async function saveNotebook() {
        if (!user?.id || saving || saved) return;
        setSaving(true);
        setSaveMessage('Salvando...');

        try {
            const cornell = notebookId
                ? await cornellService.updateCornell(notebookId, user.id, notebook)
                : await cornellService.createCornell(user.id, notebook.title, notebook.description, notebook.resume, notebook.noteClass);
            setNotebook({ title: cornell.title, description: cornell.description, noteClass: cornell.noteClass, resume: cornell.resume });
            setSaved(true);
            setSaveMessage('Salvo no banco de dados');
            setNotebookId(cornell.id);
            setExistingNotebooks(current => notebookId
                ? current.map(item => item.id === notebookId ? cornell : item)
                : [cornell, ...current]);
            if (!notebookId) navigate('/cadernos');

        } catch (error) {
            setSaveMessage(error.message);

        } finally {
            setSaving(false);
        }
    }

    function loadVideo(event) {
        event.preventDefault();
        const id = getYouTubeId(videoLink);
        if (!id) {
            setVideoError('Cole um link válido de vídeo do YouTube.');
            return;
        }
        setVideoError('');
        setVideoId(id);
    }

    const text = [notebook.description, notebook.noteClass, notebook.resume].join(' ').trim();
    const words = text ? text.split(/\s+/).length : 0;

    if (choosing) {
        return <NotebookChoice method="Método Cornell" notebooks={existingNotebooks} loading={loading} error={saveMessage} onNew={createNotebook} onSelect={selectNotebook} />;
    }

    return (
        <main className="cornellPage">
            <header className="cornellHeader">
                <div className="cornellHeading">
                    <Link className="cornellBackLink" to="/home" aria-label="Voltar aos métodos"><FiArrowLeft aria-hidden="true" /></Link>
                    <div className="cornellHeadingText">
                        <p className="cornellEyebrow">MÉTODO 02 · ANOTAÇÕES E REVISÃO</p>
                        <h1 className="cornellPageTitle">Método Cornell</h1>
                    </div>
                </div>
                <span className="cornellBadge"><FiBookOpen aria-hidden="true" /> Seu caderno de estudo</span>
            </header>

            <div className="cornellWorkspace">
                <section className="cornellPanel cornellNotebook" aria-labelledby="cornellNotebookHeading">

                    <h2 className="cornellPanelEyebrow" id="cornellNotebookHeading"><FiBookOpen aria-hidden="true" /> CADERNO CORNELL</h2>

                    <button className="cornellPrimaryButton cornellChooseButton" type="button" disabled={saving} onClick={() => { setSaveMessage(''); setChoosing(true); }}>Trocar caderno</button>

                    <label className="cornellLabel" htmlFor="cornellTitle">Título do caderno</label>

                    <input className="cornellInput" id="cornellTitle" maxLength={255} disabled={loading || saving} placeholder="Ex.: História — Revolução Industrial" value={notebook.title} onChange={(event) => updateNotebook('title', event.target.value)} />

                    <div className="cornellSheet">
                        <div className="cornellCuesArea">

                            <label className="cornellSheetLabel" htmlFor="cornellCues">Perguntas e palavras-chave</label>

                            <p className="cornellFieldHint">O que você precisa lembrar?</p>

                            <textarea className="cornellSheetInput" id="cornellCues" disabled={loading || saving} placeholder="Perguntas, conceitos e termos importantes…" value={notebook.description} onChange={(event) => updateNotebook('description', event.target.value)} />

                        </div>

                        <div className="cornellNotesArea">
                            <label className="cornellSheetLabel" htmlFor="cornellNotes">Notas da aula</label>

                            <p className="cornellFieldHint">Registre as ideias e os exemplos.</p>

                            <textarea className="cornellSheetInput" id="cornellNotes" disabled={loading || saving} placeholder="Anote explicações, exemplos e conexões durante a aula…" value={notebook.noteClass} onChange={(event) => updateNotebook('noteClass', event.target.value)} />

                        </div>

                        <div className="cornellSummaryArea">

                            <label className="cornellSheetLabel" htmlFor="cornellSummary">Resumo</label>

                            <p className="cornellFieldHint">Explique o assunto com suas palavras.</p>

                            <textarea className="cornellSheetInput cornellSummaryInput" id="cornellSummary" disabled={loading || saving} placeholder="Resuma as principais ideias em poucas frases…" value={notebook.resume} onChange={(event) => updateNotebook('resume', event.target.value)} />

                        </div>
                    </div>

                    <div className="cornellNotebookStatus">

                        <span className="cornellWordCount">{words} {words === 1 ? 'palavra' : 'palavras'}</span>

                        <span className="cornellSaveStatus" role="status">{!user?.id ? 'Faça login para salvar seu caderno' : loading ? 'Carregando caderno...' : saveMessage}</span>

                    </div>

                    <button className="cornellPrimaryButton cornellSaveButton" type="button" disabled={!user?.id || loading || saving || saved || !notebook.title.trim()} onClick={saveNotebook}>
                        {saving ? 'Salvando...' : notebookId ? 'Atualizar caderno' : 'Salvar caderno'}
                    </button>

                    {!user?.id && <Link className="cornellYoutubeLink" to="/login">Entrar na sua conta</Link>}
                </section>

                <section className="cornellPanel cornellVideoPanel" aria-labelledby="cornellVideoHeading">

                    <h2 className="cornellPanelTitle" id="cornellVideoHeading">Sua vídeo-aula</h2>

                    <form className="cornellVideoForm" onSubmit={loadVideo}>

                        <div className="cornellVideoField">

                            <label className="cornellLabel" htmlFor="cornellYoutubeLink">Link do YouTube</label>

                            <div className="cornellLinkInput">

                                <FiLink className="cornellLinkIcon" aria-hidden="true" />

                                <input className="cornellInput" id="cornellYoutubeLink" type="text" inputMode="url" placeholder="https://www.youtube.com/watch?v=…" value={videoLink} onChange={(event) => { setVideoLink(event.target.value); setVideoError(''); }} aria-invalid={Boolean(videoError)} aria-describedby={videoError ? 'cornellYoutubeError' : undefined} />

                            </div>

                        </div>

                        <button className="cornellPrimaryButton" type="submit">Carregar vídeo</button>

                    </form>

                    {videoError && <p className="cornellVideoError" id="cornellYoutubeError" role="alert">{videoError}</p>}

                    <div className="cornellPlayer">
                        {videoId ? (
                            <iframe className="cornellVideoFrame" key={videoId} src={'https://www.youtube.com/embed/' + videoId} title="Vídeo-aula para o caderno Cornell" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                        ) : (

                            <div className="cornellVideoPlaceholder">
                                <FiYoutube className="cornellYoutubeIcon" aria-hidden="true" />

                                <h3 className="cornellPlaceholderTitle">Assista, anote e conecte</h3>

                                <p className="cornellPlaceholderText">Cole o link de uma aula para assistir enquanto preenche seu caderno Cornell.</p>
                            </div>
                        )}
                    </div>
                    {videoId && <a className="cornellYoutubeLink" href={'https://www.youtube.com/watch?v=' + videoId} target="_blank" rel="noopener">Assistir no YouTube ↗</a>}

                    <p className="cornellVideoHint">Durante o vídeo, use a coluna de notas. Depois, transforme as ideias em perguntas e escreva seu resumo.</p>

                </section>

                <aside className="cornellPanel cornellGuide" aria-labelledby="cornellGuideHeading">

                    <h2 className="cornellPanelTitle" id="cornellGuideHeading">Como estudar</h2>

                    <ol className="cornellGuideSteps">
                        <li className="cornellGuideStep"><span className="cornellStepNumber">01</span><h3 className="cornellStepTitle">Anote</h3><p className="cornellStepText">Registre os pontos principais da aula na coluna maior.</p></li>
                        <li className="cornellGuideStep"><span className="cornellStepNumber">02</span><h3 className="cornellStepTitle">Questione</h3><p className="cornellStepText">Crie perguntas e palavras-chave na coluna esquerda.</p></li>
                        <li className="cornellGuideStep"><span className="cornellStepNumber">03</span><h3 className="cornellStepTitle">Resuma</h3><p className="cornellStepText">Sintetize o conteúdo no espaço inferior com suas palavras.</p></li>
                    </ol>
                    
                    <div className="cornellReviewTip"><FiCheckCircle className="cornellTipIcon" aria-hidden="true" /><p className="cornellTipText">Na revisão, cubra as notas e tente responder às perguntas sem consultar.</p></div>
                </aside>
            </div>
        </main>
    );
}

export default Cornell;
