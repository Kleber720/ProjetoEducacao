import { Link } from 'react-router-dom';
import { FiArrowLeft, FiBookOpen } from 'react-icons/fi';
import './NotebookChoice.css';

function NotebookChoice({ method, notebooks, loading, error, onNew, onSelect }) {
    return (
        <main className="notebookChoicePage">
            <section className="notebookChoicePanel" aria-labelledby="notebookChoiceTitle">
                <Link className="notebookChoiceBack" to="/home"><FiArrowLeft aria-hidden="true" /> Voltar </Link>

                <p className="notebookChoiceMethod">{method}</p>
                <h1 className="notebookChoiceTitle" id="notebookChoiceTitle">Qual caderno você quer usar?</h1>

                <button className="notebookChoiceNew" type="button" disabled={loading} onClick={onNew}>
                    <FiBookOpen aria-hidden="true" /> Criar novo caderno
                </button>

                <h2 className="notebookChoiceSubtitle">Usar um caderno existente</h2>

                {loading ? (
                    <p className="notebookChoiceMessage" role="status">Carregando seus cadernos...</p>
                ) : error ? (
                    <p className="notebookChoiceError" role="alert">{error}</p>
                ) : notebooks.length === 0 ? (
                    <p className="notebookChoiceMessage">Você ainda não tem cadernos salvos deste método.</p>
                ) : (
                    <div className="notebookChoiceList">
                        {notebooks.map(notebook => (
                            <button className="notebookChoiceExisting" key={notebook.id} type="button" onClick={() => onSelect(notebook)}>
                                <FiBookOpen className="notebookChoiceIcon" aria-hidden="true" />
                                <span className="notebookChoiceName">{notebook.title}</span>
                                <span className="notebookChoiceOpen">Abrir →</span>
                            </button>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default NotebookChoice;
