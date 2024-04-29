import styled, { keyframes } from 'styled-components';
import LoginImage from '../assets/background/loginImage.svg'; 
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import FilterButtons from "../components/SearchFilters/index"
import React, { useState , useEffect } from 'react';
import Card from "../components/CardComponent/index";
 
const Item = styled.div`
border:1px solid black;
    
  
`;
const Container = styled.div`

    top: 3em;
    position: relative;

    
  
`;
export default function LostObjectCatalogPage() {

  const [selectedFilter, setSelectedFilter] = useState(null);
  const [objects, setObjects] = useState([]);

  const filters = ['Filter 1', 'Filter 2', 'Filter 3']; // Defina seus filtros aqui

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    // Adicione o código para aplicar o filtro selecionado
    
  };
  useEffect(() => {
    // Simulação de chamada de API para obter os dados dos objetos perdidos
    const fetchData = async () => {
        // Suponha que você tenha uma função de API chamada getLostObjectsData()
        // que retorna um array de objetos com as informações dos objetos perdidos
        
    };

    fetchData();
}, []);
  
    return ( 
    <Container>
      <h1>Lost Object Catalogue</h1>
      <FilterButtons filters={filters} handleFilterClick={handleFilterClick} />
      <Grid container spacing={2}>

      {objects.map((object, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card>
                            <h2>{object.name}</h2>
                            <p>{object.description}</p>
                            {/* Adicione mais campos de dados do objeto conforme necessário */}
                        </Card>
                    </Grid>
                ))}
            </Grid>
    </Container>
  );
};

