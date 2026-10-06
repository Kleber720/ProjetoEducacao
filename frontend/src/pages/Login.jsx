import './Login.css';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CiLogin } from 'react-icons/ci';
import { FaSignInAlt } from 'react-icons/fa';
import loginService from '../services/loginService';

function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

    async function handleLogin(e) {
        e.preventDefault();

        try{
            response = await loginService.login(email, password);
            if(response.success){
                navigate('/home');
            }

        }catch{
            alert("Erro ao logar, tente novamente");
        }
        
    }

    function handleCadasterUser(e){
        e.preventDefault();
        navigate('/cadastrarUsuario');
    }

    return(
        <div className="container">
            <main className='login'>

                <h1>Bem-vindo de volta</h1>

                <p>Entre para explorar métodos de estudo feitos para a você</p>

                <form className='formLogin'>  

                    <div className="email">
                         
                        
                        <h3 className="loginFieldLabel"><MdOutlineEmail aria-hidden="true" /> E-mail</h3>
                        
                        <input
                        
                       
                            type="text"
                            
                            placeholder= "Voce@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="password">

                        <h3 className="loginFieldLabel"><RiLockPasswordLine aria-hidden="true" /> Senha</h3>

                        <input type="password" placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleLogin} className="buttonLogin" text="Login" icon={<CiLogin aria-hidden="true" />} />

                    <Button onClick={handleCadasterUser} className="buttonCadastrarUsuario" text="Cadastrar Usuario" icon={<FaSignInAlt aria-hidden="true" />} />

                    <p>Ao clicar em "Login", você concorda com nossos termos de serviço e política de privacidade.</p>

                </form>

            </main>
        </div>
    );
}
export default Login;
