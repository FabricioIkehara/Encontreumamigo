// src/pages/HomePage.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../lib/supabaseClient';
import { FaMars, FaVenus, FaHeart } from 'react-icons/fa';

// --- Nossos Estilos (a maioria permanece a mesma) ---
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
`;

const AnimalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const AnimalCard = styled.div` // ...código do card igual ao anterior... `;
const AnimalImage = styled.img` // ...código do card igual ao anterior... `;
const CardContent = styled.div` // ...código do card igual ao anterior... `;
const AssociationName = styled.p` // ...código do card igual ao anterior... `;
const NameContainer = styled.div` // ...código do card igual ao anterior... `;
const AnimalName = styled.h3` // ...código do card igual ao anterior... `;
const IconsContainer = styled.div` // ...código do card igual ao anterior... `;
const Location = styled.p` // ...código do card igual ao anterior... `;
const AdoptButton = styled.button` // ...código do card igual ao anterior... `;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// NOVO: Estilo para o botão e container de "Carregar Mais"
const LoadMoreContainer = styled.div`
  text-align: center;
  padding: 40px 0;
`;

const LoadMoreButton = styled.button`
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #e67e22;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d35400;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;
// --- Fim dos Estilos ---

const ITEMS_PER_PAGE = 6; // Definimos a quantidade de itens por página

function HomePage() {
  // --- NOVOS E MODIFICADOS ESTADOS ---
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // Estado para controlar a página atual (começa em 0)
  const [hasMore, setHasMore] = useState(true); // Estado para saber se há mais itens

  // --- LÓGICA DE BUSCA MODIFICADA ---
  const fetchAnimals = async (currentPage) => {
    setLoading(true);

    const from = currentPage * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    try {
      const { data, error } = await supabase
        .from('animals')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to); // A MÁGICA ACONTECE AQUI!

      if (error) throw error;

      // Adiciona os novos animais à lista existente
      setAnimals(prevAnimals => [...prevAnimals, ...data]);

      // Se o número de animais retornados for menor que o limite, não há mais páginas
      if (data.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      alert(`Erro ao buscar os animais: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para buscar os dados baseado na página
  useEffect(() => {
    fetchAnimals(page);
  }, [page]); // Este efeito roda sempre que o estado 'page' mudar

  // Função para o botão "Carregar Mais"
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  
  return (
    <PageContainer>
      <Title>Encontre seu Novo Amigo</Title>
      <AnimalsGrid>
        {animals.map((animal) => (
          <StyledLink to={`/animal/${animal.id}`} key={animal.id}>
            <AnimalCard>
              {/* ... O conteúdo do card permanece o mesmo ... */}
            </AnimalCard>
          </StyledLink>
        ))}
      </AnimalsGrid>

      {/* --- BOTÃO E LÓGICA DE CARREGAMENTO --- */}
      <LoadMoreContainer>
        {loading && <p>Carregando mais amiguinhos...</p>}
        {!loading && hasMore && (
          <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
            Carregar Mais
          </LoadMoreButton>
        )}
        {!hasMore && <p>Você já viu todos os nossos amiguinhos!</p>}
      </LoadMoreContainer>
    </PageContainer>
  );
}

export default HomePage;