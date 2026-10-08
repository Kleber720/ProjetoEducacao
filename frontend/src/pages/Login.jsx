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
            const response = await loginService.login(email, password);
            if(response.success){
                navigate('/home');
            }

        }catch(error){
            alert(error.message || "Erro ao logar, tente novamente");
        }
        
    }

    function handleCadasterUser(e){
        e.preventDefault();
        navigate('/cadastrarUsuario');
    }

    return(
        <div className="containerLogin">
            <main className='login'>

                <h1 className="loginTitle">Bem-vindo de volta</h1>

                <p className="loginDescription">Entre para explorar métodos de estudo feitos para a você</p>

                <form className='formLogin' onSubmit={handleLogin}>

                    <div className="email">
                         
                        
                        <h3 className="loginFieldLabel"><MdOutlineEmail className="loginIcon" aria-hidden="true" /> E-mail</h3>
                        
                        <input className="loginInput"
                        
                       
                            type="text"
                            
                            placeholder= "Voce@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="password">

                        <h3 className="loginFieldLabel"><RiLockPasswordLine className="loginIcon" aria-hidden="true" /> Senha</h3>

                        <input className="loginInput" type="password" placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="buttonLogin" text="Login" icon={<CiLogin className="loginIcon" aria-hidden="true" />} />

                    <Button onClick={handleCadasterUser} className="buttonCadastrarUsuario" text="Cadastrar Usuario" icon={<FaSignInAlt className="loginIcon" aria-hidden="true" />} />

                    <p className="loginTerms"> em "Login", você concorda com nossos termos de serviço e política de privacidade.</p>

                </form>

            </main>
        </div>
    );
}
export default Login;
