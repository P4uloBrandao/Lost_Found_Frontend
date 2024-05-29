import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

import Card from "../CardComponent/index";
import SearchInput from "../SearchInputFieldComponent/index";
import axios from "axios";


const Container = styled.div`
    position: relative;
`;

const Title = styled.h2`
  color: var(--black-color);
  opacity: 1;
  text-align: left;
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  color: #3cb684;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  text-align: left !important;
  margin-top: 0px;
`;

export default function AuctionsCatalog() {
  const [errorMessage, setErrorMessage]= useState("")
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [auctions, setAuctions] = useState([]);
  const [auctionName, setAuctionName] = React.useState('');
  const [auction, setAuction] = React.useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        // Buscar os dados dos objetos perdidos
        const auctionsResponse = await axios.get(`http://localhost:3000/api/auction/user/${token}`);

        const auctionsData = auctionsResponse.data;
  
        // Atualizar o estado dos objetos com os dados buscados
        setAuctions(auctionsData);

        setIsLoading(false);
  
        // Para cada objeto, buscar o nome da categoria associada
        const updatedAuctions = await Promise.all(auctionsData.map(async (auction) => {
        const catId = auction.category_id;
        const categoryResponse = await axios.get(`http://localhost:3000/api/category/${catId}`);
        const categoryName = categoryResponse.data.name;
  
          // Retornar um novo objeto com o nome da categoria atualizado
          return {
            ...auction,
            category: categoryName,
            catId: catId
          };
        }));
        // Atualizar o estado dos objetos com os dados das categorias atualizados
        setAuctions(updatedAuctions);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Lidar com erros conforme necessário
      }
    };
  
    fetchData();
  }, []);
  
  

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.put(`http://localhost:3000/api/auction/${getAuctionID(auctionName,auctions)}`);
    } catch (error) {
        console.error( error);

        if (error.response && error.response.data) {
            setErrorMessage(error.response.data); // Set the error message if present in the error response
        } else {
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    }
    //  window.location.reload();
  }

  const handleDropdownChange = (selectedOptionName) => {
    setAuctionName(selectedOptionName)
  };

  function  getAuctionID(name,auctions){
    const foundItem = auctions.find(item => item.name === name);
    return foundItem ? foundItem._id : null;
  }

  const AuctionsArray = Object.entries(auctions);
  if (isLoading) {
    return <div>Carregando...</div>;
}

  return (
    <Container>
      <Title>My Lost Objects</Title>
        <CategoryTitle>
        Here you can view all your lost objects. Remember to never lose hope!
        </CategoryTitle>
        <SearchInput 
                
                placeholder={'Search your Lost Objects'}  
                id="Objects"
                required
                onClick = {(e) => setAuctionName(e.target.value)}
                value={auction}
                onChange={handleDropdownChange}
                name="Lost Object"
                options={auctions}
              
          />
      
       <Grid sx={{ textAlign: '-webkit-center', pt: 7, width:'100%' }} container spacing={5}>
        {auctions.map((auction, index) => (
          
         <Grid spacing={2} sx={{justifyContent: 'center'        
          }} item  xs={10} md={10} key={index}>
            <Card  spacing={2}
              name={auction.title}
              description={auction.description}
              location={auction.location}
              category={auction.category}
              id={auction._id}
              catId={auction.category_id}
              date ={auction.date}
              photo ={auction.objectImage}
              status={auction.status}
              matchButton = {true}
            />
          </Grid>
          ))}  
      </Grid> 
    </Container>
  );
}



