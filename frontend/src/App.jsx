import Login from './pages/Login';
import CadastrarUsuario from './pages/CadastrarUsuario';
import Home from './pages/Home';
import Pomodoro from './pages/Pomodoro';
import Cornell from './pages/cornell';
import PainelNotebook from './painel/PainelNotebook';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App(){
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<CadastrarUsuario />} />
        <Route path="/cadastrarUsuario" element={<CadastrarUsuario />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/cornell" element={<Cornell />} />
        <Route path="/cadernos" element={<PainelNotebook />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
