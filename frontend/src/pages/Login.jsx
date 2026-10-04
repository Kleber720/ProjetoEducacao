import './Login.css';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';

function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        
        if(e.target.innerText === "Cadastrar Usuario"){
            navigate('/cadastrar');
        }else{
            console.log('Email:', email);
            console.log('Senha:', password);
        }
    }

    return(
        <div className="container">
            <main className='login'>
                <h1>Bem-vindo de volta</h1>
                <p>Entre para explorar métodos de estudo feitos para a você</p>
                <form className='formLogin'>  

                    <div className="email">
                        <MdOutlineEmail />
                        <h3 >E-mail</h3>
                        <input
                        
                            type="text"
                            placeholder="Voce@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="password">
                        <h3>Senha</h3>
                        <input type="password" placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleLogin} className="buttonLogin" text="Login" />
                    <Button onClick={handleLogin} className="buttonCadastrarUsuario" text="Cadastrar Usuario" />

                    <p>Ao clicar em "Login", você concorda com nossos termos de serviço e política de privacidade.</p>

                </form>

            </main>
        </div>
    );
}
export default Login;