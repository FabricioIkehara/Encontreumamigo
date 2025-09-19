import styled from 'styled-components';


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
  gap: 15px; // Espaçamento entre os elementos
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

const Button = styled.button`
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;
// --- Fim dos componentes de estilo ---

function LoginPage() {
  return (
    <PageContainer>
      <FormWrapper>
        <Title>Entrar na sua Conta</Title>
        <Input type="email" placeholder="seu@email.com" />
        <Input type="password" placeholder="Sua senha" />
        <Button type="submit">Entrar</Button>
      </FormWrapper>
    </PageContainer>
  );
}

export default LoginPage;