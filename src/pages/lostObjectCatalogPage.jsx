import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Card from "../components/CardComponent/index";
import axios from "axios";
import WelcomeHeaderComponent from '../components/headerWithNameComponent/welcomeHeader.jsx';
import Menu from '../components/profileMenu/index.jsx'; 

const Container = styled.div`
    top: 3em;
    position: relative;
`;

export default function LostObjectCatalogPage() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [objects, setObjects] = useState([]);
  console.log(objects)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
       
        // Buscar os dados dos objetos perdidos
        const objectsResponse = await axios.get(`http://localhost:3000/api/lost-objects/user/${token}`);
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
            category: categoryName,
            catId: catId
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
  const option =['My Account','Payment Details','Privacy Settings','My Auctions','My Lost Objects'] 
  return (
    <div className="lost-item-container" style={{ display: 'flex', flexDirection: 'column', width: '100%',}}>
      <WelcomeHeaderComponent name={'Carlos'} description={'Did you know that over 30 milion wallets are lost every year?'}/>
      <Menu options={option} selected={'My Lost Objects'} />

      <div>
        {objects.map((object, index) => (

            <Grid spacing={2} sx={{justifyContent: 'center'        
            }} item  xs={10} md={10} key={index}>
              <Card  spacing={2}
                name={object.title}
                description={object.description}
                location={object.location}
                category={object.category}
                id={object.object_id}
                catId={object.catId}
                date ={object.date}
                photo ={object.objectImage}
                status={object.status}
                policeOfficer={object.policeOfficerThatReceived}
                matchButton = {true}
              />
            </Grid>
          ))}
      </div>
     
  </div>
   
  );
}
