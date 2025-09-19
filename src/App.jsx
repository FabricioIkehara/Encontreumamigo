// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

// Importe suas páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import RegisterAnimalPage from './pages/RegisterAnimalPage';

// Estilos para o container e a navegação
const AppContainer = styled.div`
  font-family: 'Helvetica', sans-serif;
`;

const Nav = styled.nav`
  background-color: #3498db;
  padding: 15px;
  display: flex;
  gap: 20px;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        {/* Barra de Navegação Simples */}
        <Nav>
          <Link to="/">Início</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Cadastre-se</Link>
        </Nav>

        {/* Definindo as Rotas */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cadastrar-animal" element={<RegisterAnimalPage />} />
        </Routes>
        
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;