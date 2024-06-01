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
  const [auctions, setAuctions] = useState([]);
  const [auctionName, setAuctionName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null); // UseRef para o campo de busca

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userResponse = await axios.get(`http://localhost:3000/api/users/profile/${token}`);
        const userData = userResponse.data.currentUser._id;
    
        // Buscar os dados dos objetos perdidos
        const auctionsResponse = await axios.get(`http://localhost:3000/api/auction/user/${userData}`);
        const auctionsData = auctionsResponse.data;

        // Atualizar o estado dos objetos com os dados buscados
        setAuctions(auctionsData);
        setFilteredAuctions(auctionsData); // Inicialmente, mostrar todos os objetos

        // /// Array para armazenar as promessas de solicitação HTTP
        // const requests = [];

        // // Iterar sobre os dados dos leilões e adicionar as promessas de solicitação HTTP ao array
        // auctionsData.forEach(auction => {
        //     const foundObject = auction.foundObject;
        //     const requestPromise = axios.get(`http://localhost:3000/api/lost-objects/${foundObject}`);
        //     requests.push(requestPromise);
        // });

        // // Aguardar que todas as solicitações sejam concluídas
        // const responses = await Promise.all(requests);

        // // Iterar sobre as respostas e extrair os objetos encontrados
        // const foundObjectsList = responses.map(response => response.data.foundObject);
        // console.log(foundObjectsList);
  
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
  }, [auctionName]);

  useEffect(() => {
    console.log("Current searchTerm:", searchTerm); // Print searchTerm to the console whenever it changes
  }, [searchTerm]);


  const handleDropdownChange = (selectedOptionName) => {
    setAuctionName(selectedOptionName)
  };

  const handleSearch = (value) => {
    const filtered = auctions.filter(obj =>
      obj._id.toLowerCase() === (value.toLowerCase())
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
          field_name = '_id'
          ref={searchInputRef}
        />
          <SearchButton onClick={() => {setAuctionName(auctionName); handleSearch(auctionName); }}>Search</SearchButton>
          <ResetButton onClick={handleResetFilters}>Reset Filters</ResetButton>
        </ButtonContainer>
      </div>
      <Grid sx={{ textAlign: '-webkit-center', pt: 7, width:'100%' }} container spacing={5}>
        {filteredAuctions.map((auction, index) => (
          <Grid spacing={2} sx={{justifyContent: 'center'}} item xs={10} md={10} key={index}>
            <Card  
              spacing={2}
              name={auction._id}
              description={auction.description}
              location={auction.location}
              category={auction.status}
              id={auction._id}
              catId={auction.status}
              date ={auction.endDate}
              photo ={auction.objectImage}
              status={auction.startDate}
              matchButton = {true}
            />
          </Grid>
        ))}  
      </Grid> 
    </Container>
  );
}
