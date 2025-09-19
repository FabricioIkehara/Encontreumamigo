// src/pages/SignUpPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../lib/supabaseClient';

// --- Estilos (podemos reutilizar ou criar novos se necessário) ---
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const FormWrapper = styled.form`
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #2ecc71; /* Cor verde para cadastro */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #27ae60;
  }
`;
// --- Fim dos estilos ---


function SignUpPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('adotante'); // Valor padrão

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // 'data' é onde podemos enviar metadados que serão salvos no usuário
        data: {
          full_name: fullName,
          role: role,
        }
      }
    });

    if (error) {
      alert(`Erro no cadastro: ${error.message}`);
    } else {
      alert('Cadastro realizado! Por favor, verifique seu e-mail para confirmar a conta.');
      navigate('/login'); // Redireciona para a página de login após o cadastro
    }
  };

  return (
    <PageContainer>
      <FormWrapper onSubmit={handleSignUp}>
        <Title>Crie sua Conta</Title>
        <Input
          type="text"
          placeholder="Nome Completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Crie uma senha forte"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="adotante">Quero Adotar</option>
          <option value="protetor">Quero Cadastrar um Animal</option>
        </Select>
        <Button type="submit">Finalizar Cadastro</Button>
      </FormWrapper>
    </PageContainer>
  );
}

export default SignUpPage;