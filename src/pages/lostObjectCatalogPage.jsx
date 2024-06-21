import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Card from "../components/CardComponent/index";
import axios from "axios";
import WelcomeHeaderComponent from '../components/headerWithNameComponent/welcomeHeader.jsx';
import ProfileMenu from '../components/profileMenu/index';
import LostItemComponent from '../components/matchItemsComponents/LostItemComponent.jsx';

const Container = styled.div`
    top: 3em;
    position: relative;
`;

export default function LostObjectCatalogPage() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [objects, setObjects] = useState([]);
  const [openCard, setOpenCard]= useState(null);
  console.log(objects)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
       
        // Buscar os dados dos objetos perdidos
        const objectsResponse = await axios.get(process.env.REACT_APP_API_URL+`/api/lost-objects/user/${token}`);
        const objectsData = objectsResponse.data;
  
        // Atualizar o estado dos objetos com os dados buscados
        setObjects(objectsData);
  
        // Para cada objeto, buscar o nome da categoria associada
        const updatedObjects = await Promise.all(objectsData.map(async (object) => {
          const catId = object.category;
          const categoryResponse = await axios.get(process.env.REACT_APP_API_URL+`/api/category/${catId}`);
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

  const handleCardClick = (id) => {
    setOpenCard(id);
  };


  const menuOptions = ['Profile Settings', 'My Auctions', 'My Lost Objects','Payments Details', 'Privacy Settings'];
  const [selectedOption, setSelectedOption] = useState(menuOptions[0]);
  return (
   
    <div className="lost-item-container" style={{ display: 'flex', flexDirection: 'column', width: '100%',}}>
      {openCard ? <div> <h2 style={{marginTop:'89px'}}> More Lost Obbjects</h2> <LostItemComponent itemid={openCard}/> </div> : null}
      
      <div>
        {objects.map((object, index) => (
            object.object_id !== openCard && (
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
                photo ={object.objectImage[0]}
                status={object.status}
                policeOfficer={object.policeOfficerThatReceived}
                matchButton = {true}
                onCardClick={handleCardClick}
              />
            </Grid>
            )
          ))}
      </div>
     
  </div>
   
  );
}
