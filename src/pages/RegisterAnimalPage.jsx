// src/pages/RegisterAnimalPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../lib/supabaseClient';

// --- Estilos ---
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
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
  max-width: 600px;
`;

const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const Input = styled.input``; // Reutilize os estilos anteriores
const Select = styled.select``; // Reutilize os estilos anteriores
const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
`;
const Button = styled.button``; // Reutilize os estilos anteriores

function RegisterAnimalPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Cachorro');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null); // Para guardar o arquivo da imagem

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleRegisterAnimal = async (e) => {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Sessão expirada. Por favor, faça login novamente.");
      navigate('/login');
      return;
    }
    
    let imageUrl = '';
    // 1. Faz o upload da imagem se ela existir
    if (imageFile) {
        const filePath = `${user.id}/${Date.now()}_${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
            .from('animal-photos') // Nome do seu bucket
            .upload(filePath, imageFile);

        if (uploadError) {
            alert(`Erro no upload da imagem: ${uploadError.message}`);
            return;
        }

        // Pega a URL pública da imagem
        const { data } = supabase.storage
            .from('animal-photos')
            .getPublicUrl(filePath);
        
        imageUrl = data.publicUrl;
    }

    // 2. Insere os dados do animal no banco de dados
    const { error: insertError } = await supabase
      .from('animals')
      .insert({
        name,
        species,
        age,
        description,
        protector_id: user.id, // Liga o animal ao protetor logado
        image_url: imageUrl, // Salva a URL da imagem
      });
      
    if (insertError) {
      alert(`Erro ao cadastrar o animal: ${insertError.message}`);
    } else {
      alert('Animal cadastrado com sucesso!');
      navigate('/'); // Redireciona para a home para ver o novo pet
    }
  };

  return (
    <PageContainer>
      <FormWrapper onSubmit={handleRegisterAnimal}>
        <Title>Cadastrar um Amigo</Title>
        <Input type="text" placeholder="Nome do animal" value={name} onChange={(e) => setName(e.target.value)} />
        <Select value={species} onChange={(e) => setSpecies(e.target.value)}>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
          <option value="Outro">Outro</option>
        </Select>
        <Input type="number" placeholder="Idade (anos)" value={age} onChange={(e) => setAge(e.target.value)} />
        <TextArea placeholder="Conte a história e a personalidade do animal..." value={description} onChange={(e) => setDescription(e.target.value)} />
        
        <label>Foto do animal:</label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />

        <Button type="submit">Cadastrar Animal</Button>
      </FormWrapper>
    </PageContainer>
  );
}

export default RegisterAnimalPage;