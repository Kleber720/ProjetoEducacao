import './CadastrarUsuario.css';

function CadastrarUsuario() {
    return (
        <div className="container">
            <main className='cadastroUsuario'>

                

                <form className='cadastro'>
                    <h1 className='principalTitle'>Cadastrar Usuário</h1>

                    <h3 className="titleSecondary">Dados do Usuário</h3>

                    <h3 className="title">Nome</h3>
                    <input type="text" placeholder="Nome" />

                    <h3 className="title">E-mail</h3>
                    <input type="email" placeholder="Email" />

                    <h3 className="title">Senha</h3>
                    <input type="password" placeholder="Senha" />

                    <button type="submit">Cadastrar</button>
                </form>
            </main>
        </div>
    );
}

export default CadastrarUsuario;
