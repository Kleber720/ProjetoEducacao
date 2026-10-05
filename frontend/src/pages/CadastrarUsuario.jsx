import './CadastrarUsuario.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaRegUser, FaSignInAlt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import Button from '../components/Button';

function CadastrarUsuario() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleRegister(e){
        e.preventDefault();
        
    }

    return (
        <div className="container">
            <main className='cadastroUsuario'>

                

                <form className='cadastro'>
                    <h1 className='principalTitle'>Cadastrar Usuário</h1>

                    <h3 className="titleSecondary">Dados do Usuário</h3>

                    <h3 className="title"><FaRegUser aria-hidden="true" /> Nome</h3>
                    <input type="text" placeholder="Nome" />

                    <h3 className="title"><MdOutlineEmail aria-hidden="true" /> E-mail</h3>
                    <input type="email" placeholder="Email" />

                    <h3 className="title"><RiLockPasswordLine aria-hidden="true" /> Senha</h3>
                    <input type="password" placeholder="Senha" />

                    <Button type="submit" className="buttonCadastrar" text="Cadastrar" icon={<FaSignInAlt aria-hidden="true" />} />
                </form>
            </main>
        </div>
    );
}

export default CadastrarUsuario;
