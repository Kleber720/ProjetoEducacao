import { useEffect, useRef } from 'react';
import { FiArrowDown } from 'react-icons/fi';
import pomodoroImage from '../assets/pomodoro.jpg';
import cornellImage from '../assets/cornell.jpg';
import { Link } from "react-router-dom";
import SideBar from '../components/SideBar';
import './Home.css';

function Home() {
   
    const cardsRef = useRef(null);

    useEffect(() => {
        const cards = cardsRef.current.querySelectorAll(".studyCard");

        if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("revealPending");
                    entry.target.classList.add("isVisible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach((card) => {
            card.classList.add("revealPending");
            observer.observe(card);
        });

        return () => {
            observer.disconnect();
            cards.forEach((card) => {
                card.classList.remove("revealPending", "isVisible");
            });
        };
    }, []);

   
    return (

        <div className="homePage">
            <SideBar />
            <div className="containerHome">

                <article className="start">

                    <h1 className="phraseEinstein">
                        "O importante é não parar de questionar,
                        <br className="phraseEinsteinBreak" /> a curiosidade tem sua própria razão de existir."
                    </h1>

                    <a className="homeExplore" href="#metodos">
                        Explore os métodos <FiArrowDown className="homeExploreIcon" aria-hidden="true" />
                    </a>
                </article>

                <main className="middle" id="metodos" aria-labelledby="homeMethodsTitle">

                    <header className="homeMethodsHeader">

                        <p className="homeMethodsEyebrow">SEU PRÓXIMO PASSO</p>

                        <h2 className="homeMethodsTitle" id="homeMethodsTitle">Encontre seu jeito de estudar</h2>

                        <p className="homeMethodsDescription">Mais foco e anotações organizadas. Escolha um método para começar.</p>
                    </header>

                    <div className="cards" ref={cardsRef}>
                        <Link className="studyCard cardPomodoro" to="/pomodoro" aria-labelledby="pomodoroTitle">

                            <img className="studyCardImage" src={pomodoroImage} alt="Método Pomodoro" loading="lazy" />

                            <span className="studyCardCategory">FOCO E TEMPO</span>

                            <h3 className="studyCardTitle" id="pomodoroTitle">Pomodoro</h3>

                            <p className="studyCardDescription">Divida seus estudos em períodos de concentração e pequenas pausas para manter o ritmo.</p>

                            <div className="studyCardHighlight">25 min de foco · 5 min de pausa</div>

                            <div className="studyCardDetails">

                                <ol className="studyCardSteps">

                                    <li className="studyCardStep">Escolha uma tarefa e estude por 25 minutos.</li>
                                    <li className="studyCardStep">Faça uma pausa de 5 minutos.</li>
                                    <li className="studyCardStep">Após quatro ciclos, descanse por 15 a 30 minutos.</li>

                                </ol>

                            </div>
                        </Link>

                        <Link className="studyCard cardCornell" to="/cornell" aria-labelledby="cornellTitle">
                            
                            <img className="studyCardImage" src={cornellImage} alt="Método Cornell" loading="lazy" />

                            <span className="studyCardCategory">ANOTAÇÕES E REVISÃO </span>

                            <h3 className="studyCardTitle" id="cornellTitle">Cornell</h3>

                            <p className="studyCardDescription">Organize suas anotações com perguntas, conceitos e um resumo para facilitar a revisão.</p>

                            <div className="studyCardHighlight">Anote · Questione · Resuma</div>

                            <div className="studyCardDetails">

                                <ol className="studyCardSteps">

                                    <li className="studyCardStep">Divida a folha em uma coluna de perguntas, outra de notas e um espaço inferior.</li>
                                    <li className="studyCardStep">Registre as notas e crie perguntas sobre o conteúdo.</li>
                                    <li className="studyCardStep">Escreva um resumo no espaço inferior e revise respondendo às perguntas.</li>

                                </ol>

                            </div>

                        </Link>



                    </div>
                </main>

                <footer className="homeFooter">

                    <p className="homeFooterText">© 2026 EduKation. Todos os direitos reservados.</p>
                    <p className="homeFooterCredit">Desenvolvido com ❤️ por Kléber Amaro</p>

                </footer>

            </div>
        </div>
    );
}

export default Home;
