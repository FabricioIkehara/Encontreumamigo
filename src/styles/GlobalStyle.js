import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS Simples */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    background-color: #f4f4f9;
    color: #333;
  }
`;

export default GlobalStyle;