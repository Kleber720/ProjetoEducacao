import Login from './pages/Login';
import CadastrarUsuario from './pages/CadastrarUsuario';
import Home from './pages/Home';
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

      </Routes>

    </BrowserRouter>
  );
}

export default App;
