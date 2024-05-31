import React, { useState, useEffect, useRef } from 'react';
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

const SearchButton = styled.button`

  
  bottom: 50px;
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #3cb684;
  color: white;
  border: none;
  border-radius: 33px;
  cursor: pointer;
  &:hover {
    background-color: #34a26a;
  }
`;

const ResetButton = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: var(--primary-green-color);
  cursor:pointer;
  margin-right: 11px;
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function AuctionsCatalog() {
  const [errorMessage, setErrorMessage] = useState("");
  const [auctions, setOAuctions] = useState([]);
  const [auctionName, setAuctionName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null); // UseRef para o campo de busca

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        // Buscar os dados dos objetos perdidos
        const auctionsResponse = await axios.get(`http://localhost:3000/api/auction/user/${token}`);
        const auctionsData = auctionsResponse.data;
  
        // Atualizar o estado dos objetos com os dados buscados
        setAuctions(auctionsData);
        setFilteredAuctions(auctionsData); // Inicialmente, mostrar todos os objetos
  
        setIsLoading(false);
  
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Lidar com erros conforme necessário
      }
    };
  
    fetchData();
  }, []);
  
  
  useEffect(() => {
    console.log("Current objectName:", auctionName); // Print objectName to the console whenever it changes
  }, [objectName]);

  useEffect(() => {
    console.log("Current searchTerm:", searchTerm); // Print searchTerm to the console whenever it changes
  }, [searchTerm]);


  const handleDropdownChange = (selectedOptionName) => {
    setAuctionName(selectedOptionName)
  };

  const handleSearch = (value) => {
    const filtered = auctions.filter(obj =>
      obj.title.toLowerCase() === (value.toLowerCase())
    );
    setFilteredAuctions(filtered);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilteredAuctions(auctions); // Exibir todos os objetos novamente
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Title>My Auctions</Title>
      <CategoryTitle>
        Here you can view all the auction you placed a bid! Hope you win it!
      </CategoryTitle>
      <div>
      <ButtonContainer>
        <SearchInput 
          placeholder={'Search your Auctions'}  
          id="Auctions"
          required
          onChange={handleDropdownChange}
          name="Auction"
          options={auctions}
          field_name = 'title'
          ref={searchInputRef}
        />
          <SearchButton onClick={() => {setObjectName(objectName); handleSearch(objectName); }}>Search</SearchButton>
          <ResetButton onClick={handleResetFilters}>Reset Filters</ResetButton>
        </ButtonContainer>
      </div>
      <Grid sx={{ textAlign: '-webkit-center', pt: 7, width:'100%' }} container spacing={5}>
        {filteredObjects.map((object, index) => (
          <Grid spacing={2} sx={{justifyContent: 'center'}} item xs={10} md={10} key={index}>
            <Card  
              spacing={2}
              name={object.title}
              description={object.description}
              location={object.location}
              category={object.category}
              id={object._id}
              catId={object.category_id}
              date ={object.date}
              photo ={object.objectImage}
              status={object.status}
              matchButton = {true}
            />
          </Grid>
        ))}  
      </Grid> 
    </Container>
  );
}
