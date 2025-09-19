// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from './styles/GlobalStyle.js';

// Encontra o elemento no HTML onde a aplicação será montada
const rootElement = document.getElementById('root');

// Cria a "raiz" da aplicação React nesse elemento
const root = createRoot(rootElement);

// Renderiza a aplicação
root.render(
  <StrictMode>
    <GlobalStyle /> {/* Aplica os estilos globais */}
    <App />       {/* Renderiza o componente principal App */}
  </StrictMode>
);