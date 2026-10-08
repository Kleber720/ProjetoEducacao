import './CadastrarUsuario.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaRegUser, FaSignInAlt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import Button from '../components/Button';
import { registerUser } from '../services/registerUser';

function CadastrarUsuario() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await registerUser(name, email, password);
            console.log(response);
            navigate('/login');
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="containerUsuario">
            <main className='cadastroUsuario'>

                

                <form className='cadastro' onSubmit={handleSubmit}>
                    <h1 className='principalTitle'>Cadastrar Usuário</h1>

                    <h3 className="titleSecondary">Dados do Usuário</h3>

                    <h3 className="title"><FaRegUser className="cadastroIcon" aria-hidden="true" /> Nome</h3>
                    <input className="cadastroInput" type="text" placeholder="Nome" value={name} onChange={(e)=>setName(e.target.value)} />

                    <h3 className="title"><MdOutlineEmail className="cadastroIcon" aria-hidden="true" /> E-mail</h3>
                    <input className="cadastroInput" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />

                    <h3 className="title"><RiLockPasswordLine className="cadastroIcon" aria-hidden="true" /> Senha</h3>
                    <input className="cadastroInput" type="password" placeholder="Senha" value={password} onChange={(e)=> setPassword(e.target.value)} />

                    <Button type="submit" className="buttonCadastrar" text="Cadastrar" icon={<FaSignInAlt className="cadastroIcon" aria-hidden="true" />} />
                </form>
            </main>
        </div>
    );
}

export default CadastrarUsuario;
