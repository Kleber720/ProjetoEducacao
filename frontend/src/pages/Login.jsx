import "./Login.css";
import Button from "../components/Button";
function Login(){
    return(
        <div className="container">
            <main>
                <h1>Bem-vindo de volta</h1>
                <p>Entre para explorar métodos de estudo feitos para a você</p>
                <form>  
                    <h3>E-mail</h3>
                    <input type="text" placeholder="Voce@exemplo.com" />

                    <h3>Senha</h3>
                    <input type="password" placeholder="Senha"  />

                    <Button className="login" text="Login" />
                    <Button className="cadastrarUsuario" text="Cadastrar Usuario" />

                    <p>Ao clicar em "Login", você concorda com nossos termos de serviço e política de privacidade.</p>

                </form>

            </main>
        </div>
    );
}
export default Login;