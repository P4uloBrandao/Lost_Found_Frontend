import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import FilterButtons from "../components/SearchFilters/index";
import Card from "../components/CardComponent/index";
import axios from "axios";
import { useLocation } from 'react-router-dom';


 


const Container = styled.div`
    top: 3em;
    position: relative;
`;

export default function LostObjectCatalogPage() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [objects, setObjects] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const param1 = searchParams.get('param1');
  const param2 = searchParams.get('param2');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        // Buscar os dados dos objetos perdidos
        const objectsResponse = await axios.get(`http://localhost:3000/api/lost-objects/user`, param1);
        const objectsData = objectsResponse.data;
  
        // Atualizar o estado dos objetos com os dados buscados
        setObjects(objectsData);
  
        // Para cada objeto, buscar o nome da categoria associada
        const updatedObjects = await Promise.all(objectsData.map(async (object) => {
          const catId = object.category;
          const categoryResponse = await axios.get(`http://localhost:3000/api/category/${catId}`);
          const categoryName = categoryResponse.data.name;
  
          // Retornar um novo objeto com o nome da categoria atualizado
          return {
            ...object,
            category: categoryName
          };
        }));
  
        // Atualizar o estado dos objetos com os dados das categorias atualizados
        setObjects(updatedObjects);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Lidar com erros conforme necessário
      }
    };
  
    fetchData();
  }, []);
  
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    // Add code to apply the selected filter
  };
  
  return (
    <Container>
      <h1>Similar Object: {param2}</h1>
       <Grid sx={{ textAlign: '-webkit-center',placeContent: 'center' }} container spacing={5}>
        {objects.map((object, index) => (
          
          <Grid spacing={2} sx={{justifyContent: 'center'        
          }} item  xs={10} md={10} key={index}>
            <Card  spacing={2}
              name={object.title}
              description={object.description}
              location={object.location}
              category={object.category}
              id={object._id}
              date ={object.date}
              photo ={object.objectImage}
              status={object.status}
              matchButton = {false}
              policeOfficer={object.policeOfficerThatReceived}
            />
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}
