import Login from './pages/Login';
import CadastrarUsuario from './pages/CadastrarUsuario';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App(){
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<CadastrarUsuario />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;