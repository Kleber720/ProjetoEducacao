import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotebookChoice from '../components/NotebookChoice';
import { FiArrowLeft, FiBookOpen, FiLink, FiPlay, FiPause, FiRotateCcw, FiSkipForward, FiYoutube } from 'react-icons/fi';
import { POMODORO_MODES,  remainingSeconds, nextSession } from '../services/pomodoro';
import { getYouTubeId } from '../services/getYoutube';
import pomodoroService from '../services/pomodoroService';
import loginService from '../services/loginService';
import './Pomodoro.css';

function Pomodoro() {
    const navigate = useNavigate();
    const [choosing, setChoosing] = useState(true);
    const [existingNotebooks, setExistingNotebooks] = useState([]);
    const [isNewNotebook, setIsNewNotebook] = useState(true);
    const [user] = useState(loginService.getUser);
    const [notebook, setNotebook] = useState({ title: '', notes: '' });
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(Boolean(user?.id));
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [videoId, setVideoId] = useState(null);
    const [videoError, setVideoError] = useState('');
    const [notice, setNotice] = useState('');
    const [timer, setTimer] = useState({ mode: 'focus', remaining: 1500, cycles: 0, running: false, deadline: null });

    useEffect(() => {
        if (!user?.id) return;
        const controller = new AbortController();

        async function loadNotebook() {
            try {
                const pomodoros = await pomodoroService.searchPomodoroByUserId(user.id, controller.signal);
                if (controller.signal.aborted) return;

                setExistingNotebooks(pomodoros);

            } catch (error) {
                if (!controller.signal.aborted) setSaveMessage(error.message);

            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        loadNotebook();
        return () => controller.abort();
    }, [user?.id]);

    function createNotebook() {
        setNotebook({ title: '', notes: '' });
        setSaved(false);
        setSaveMessage('');
        setIsNewNotebook(true);
        setChoosing(false);
    }

    function selectNotebook(selected) {
        setNotebook({ title: selected.title, notes: selected.resume });
        setSaved(true);
        setSaveMessage('Salvo no banco de dados');
        setIsNewNotebook(false);
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
            const pomodoro = await pomodoroService.createPomodoro(user.id, notebook.title, notebook.notes);
            setNotebook({ title: pomodoro.title, notes: pomodoro.resume });
            setSaved(true);
            setSaveMessage('Salvo no banco de dados');
            if (isNewNotebook) navigate('/cadernos');

        } catch (error) {
            setSaveMessage(error.message);

        } finally {
            setSaving(false);
        }
    }

    useEffect(() => {
        if (!timer.running) return;
        const tick = () => {
            const remaining = remainingSeconds(timer.deadline);
            if (remaining === 0) {
                setNotice(timer.mode === 'focus' ? 'Foco concluído! Sua pausa está pronta. Inicie quando quiser.' : 'Pausa concluída! Pronto para mais um período de foco?');
            }
            setTimer((current) => {
                if (!current.running || current.deadline !== timer.deadline) return current;
                return remaining === 0 ? nextSession(current) : { ...current, remaining };
            });
        };
        tick();
        const interval = window.setInterval(tick, 250);
        const syncOnReturn = () => { if (!document.hidden) tick(); };
        document.addEventListener('visibilitychange', syncOnReturn);
        return () => {
            window.clearInterval(interval);
            document.removeEventListener('visibilitychange', syncOnReturn);
        };
    }, [timer.running, timer.deadline, timer.mode]);

    function toggleTimer() {
        setNotice('');
        setTimer((current) => {
            if (current.running) {
                const remaining = remainingSeconds(current.deadline);
                return remaining === 0 ? nextSession(current) : { ...current, remaining, running: false, deadline: null };
            }
            return { ...current, running: true, deadline: Date.now() + current.remaining * 1000 };
        });
    }

    function selectMode(mode) {
        setNotice('');
        setTimer((current) => ({ ...current, mode, remaining: POMODORO_MODES[mode].seconds, running: false, deadline: null }));
    }

    function resetTimer() {
        setNotice('');
        setTimer((current) => ({ ...current, remaining: POMODORO_MODES[current.mode].seconds, running: false, deadline: null }));
    }

    function skipSession() {
        setTimer((current) => nextSession(current, false));
        setNotice('Etapa pulada. Inicie a próxima quando quiser.');
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

    const minutes = String(Math.floor(timer.remaining / 60)).padStart(2, '0');
    const seconds = String(timer.remaining % 60).padStart(2, '0');
    const progress = (1 - timer.remaining / POMODORO_MODES[timer.mode].seconds) * 100;
    const words = notebook.notes.trim() ? notebook.notes.trim().split(/\s+/).length : 0;
    const dots = timer.cycles > 0 && timer.cycles % 4 === 0 ? 4 : timer.cycles % 4;

    if (choosing) {
        return <NotebookChoice method="Técnica Pomodoro" notebooks={existingNotebooks} loading={loading} error={saveMessage} onNew={createNotebook} onSelect={selectNotebook} />;
    }

    return (
        <main className="pomodoroPage">

            <header className="pomodoroHeader">

                <div className="pomodoroHeading">

                    <Link className="pomodoroBackLink" to="/home" aria-label="Voltar aos métodos"><FiArrowLeft aria-hidden="true" /></Link>

                    <div className="pomodoroHeadingText">

                        <p className="pomodoroEyebrow">MÉTODO 01 · FOCO E CONCENTRAÇÃO</p>
                        <h1 className="pomodoroPageTitle">Técnica Pomodoro</h1>

                    </div>
                </div>

                <span className="pomodoroCycleBadge">{timer.cycles} {timer.cycles === 1 ? 'ciclo concluído' : 'ciclos concluídos'}</span>

            </header>

            <div className="pomodoroWorkspace">

                <section className="pomodoroPanel pomodoroNotebook" aria-labelledby="notebookHeading">

                    <h2 className="pomodoroPanelEyebrow" id="notebookHeading"><FiBookOpen aria-hidden="true" /> CADERNO</h2>

                    <button className="pomodoroPrimaryButton pomodoroChooseButton" type="button" disabled={saving} onClick={() => { setSaveMessage(''); setChoosing(true); }}>Trocar caderno</button>

                    <label className="pomodoroLabel" htmlFor="notebookTitle">Título do caderno</label>

                    <input className="pomodoroInput" id="notebookTitle" maxLength={255} disabled={loading || saving} placeholder="Ex.: Biologia — Fotossíntese" value={notebook.title} onChange={(event) => updateNotebook('title', event.target.value)} />

                    <label className="pomodoroLabel" htmlFor="notebookNotes">Anotações</label>

                    <textarea className="pomodoroNotes" id="notebookNotes" disabled={loading || saving} placeholder="Anote ideias, dúvidas e conceitos-chave durante a aula…" value={notebook.notes} onChange={(event) => updateNotebook('notes', event.target.value)} />

                    <div className="pomodoroNotebookStatus">

                        <span className="pomodoroWordCount">{words} {words === 1 ? 'palavra' : 'palavras'}</span>
                        <span className="pomodoroSaveStatus" role="status">{!user?.id ? 'Faça login para salvar seu caderno' : loading ? 'Carregando caderno...' : saveMessage}</span>

                    </div>

                    <button className="pomodoroPrimaryButton pomodoroSaveButton" type="button" disabled={!user?.id || loading || saving || saved || !notebook.title.trim()} onClick={saveNotebook}>
                        {saving ? 'Salvando...' : 'Salvar caderno'}
                    </button>

                    {!user?.id && <Link className="pomodoroYoutubeLink" to="/login">Entrar na sua conta</Link>}
                </section>

                <section className="pomodoroPanel pomodoroVideoPanel" aria-labelledby="videoHeading">

                    <h2 className="pomodoroPanelTitle" id="videoHeading">Sua vídeo-aula</h2>

                    <form className="pomodoroVideoForm" onSubmit={loadVideo}>

                        <div className="pomodoroVideoField">

                            <label className="pomodoroLabel" htmlFor="youtubeLink">Link do YouTube</label>

                            <div className="pomodoroLinkInput">

                                <FiLink className="pomodoroLinkIcon" aria-hidden="true" />

                                <input className="pomodoroInput" id="youtubeLink" type="text" inputMode="url" placeholder="https://www.youtube.com/watch?v=…" value={videoLink} onChange={(event) => { setVideoLink(event.target.value); setVideoError(''); }} aria-invalid={Boolean(videoError)} aria-describedby={videoError ? 'youtubeError' : undefined} />

                            </div>
                        </div>

                        <button className="pomodoroPrimaryButton" type="submit">Carregar vídeo</button>

                    </form>

                    {videoError && <p className="pomodoroVideoError" id="youtubeError" role="alert">{videoError}</p>}

                    <div className="pomodoroPlayer">

                        {videoId ? (
                            <iframe className="pomodoroVideoFrame" key={videoId} src={'https://www.youtube.com/embed/' + videoId} title="Vídeo-aula do YouTube" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                        ) : (

                            <div className="pomodoroVideoPlaceholder">

                                <FiYoutube className="pomodoroYoutubeIcon" aria-hidden="true" />

                                <h3 className="pomodoroPlaceholderTitle">Seu espaço para aprender</h3>

                                <p className="pomodoroPlaceholderText">Cole o link de uma aula e assista enquanto organiza suas anotações.</p>
                            </div>
                        )}
                    </div>

                    {videoId && <a className="pomodoroYoutubeLink" href={'https://www.youtube.com/watch?v=' + videoId} target="_blank" rel="noopener">Assistir no YouTube ↗</a>}

                </section>

                <section className="pomodoroPanel pomodoroTimerPanel" aria-label="Cronômetro Pomodoro">

                    <div className="pomodoroModes" role="group" aria-label="Etapa do Pomodoro">
                        {Object.entries(POMODORO_MODES).map(([mode, config]) => (
                            <button className={'pomodoroModeButton' + (timer.mode === mode ? ' isActive' : '')} key={mode} type="button" aria-pressed={timer.mode === mode} onClick={() => selectMode(mode)}>{config.label}</button>
                        ))}

                    </div>
                    <div className="pomodoroTimerRing" style={{ '--timer-progress': progress + '%' }}>

                        <div className="pomodoroTimerFace">

                            <span className="pomodoroTime" role="timer" aria-label={minutes + ' minutos e ' + seconds + ' segundos'}>{minutes}:{seconds}</span>

                            <span className="pomodoroTimerLabel">{POMODORO_MODES[timer.mode].label}</span>
                        </div>
                        
                    </div>

                    <div className="pomodoroControls">

                        <button className="pomodoroIconButton" type="button" aria-label="Reiniciar etapa" title="Reiniciar etapa" onClick={resetTimer}><FiRotateCcw aria-hidden="true" /></button>

                        <button className="pomodoroPrimaryButton" type="button" onClick={toggleTimer}>{timer.running ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}{timer.running ? 'Pausar' : timer.remaining < POMODORO_MODES[timer.mode].seconds ? 'Continuar' : 'Iniciar'}</button>

                        <button className="pomodoroIconButton" type="button" aria-label="Pular etapa sem contar ciclo" title="Pular etapa" onClick={skipSession}><FiSkipForward aria-hidden="true" /></button>

                    </div>

                    <div className="pomodoroCycleDots" aria-label={dots + ' de 4 ciclos de foco concluídos'}>{[0, 1, 2, 3].map((dot) => <span className={'pomodoroCycleDot' + (dot < dots ? ' isComplete' : '')} key={dot} />)}</div>

                    <p className="pomodoroTimerHint">Após 4 ciclos de foco, faça uma pausa longa.</p>
                    
                    <p className="pomodoroNotice" role="status">{notice}</p>
                </section>
            </div>
        </main>
    );
}

export default Pomodoro;
