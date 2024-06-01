import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

import Card from "../CardComponentAuction/index";
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
  const [foundObjectsList, setfoundObjectsList] = useState([]);
  const [foundObjectsListF, setfoundObjectsListF] = useState([]);

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

        /// Array para armazenar as promessas de solicitação HTTP
        const requests = [];

        // Iterar sobre os dados dos leilões e adicionar as promessas de solicitação HTTP ao array
        auctionsData.forEach(auction => {
            const foundObject = auction.foundObject;
            const requestPromise = axios.get(`http://localhost:3000/api/found-objects/${foundObject}`);
            requests.push(requestPromise);
        });

        // Aguardar que todas as solicitações sejam concluídas
        const responses = await Promise.all(requests);

        // Iterar sobre as respostas e extrair os objetos encontrados
        const obgf = responses.map(response => response.data);
        setfoundObjectsList(obgf);
        setfoundObjectsListF(obgf);
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
    const filtered = auctions.filter((auction, index) => {
      const foundObject = foundObjectsList[index];
      return foundObject.title.toLowerCase() === value.toLowerCase();
    });

   setfoundObjectsListF(foundObjectsList.filter((fo, index) => {
      return fo.title.toLowerCase() === value.toLowerCase();
    }));

   setFilteredAuctions(filtered); 
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilteredAuctions(auctions); // Exibir todos os objetos novamente
    setfoundObjectsListF(foundObjectsList);
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
          options={foundObjectsList}
          value = {(e) => setAuctionName(e.target.value)}
          field_name = 'title'
          ref={searchInputRef}
        />
          <SearchButton onClick={() => handleSearch(auctionName) }>Search</SearchButton>
          <ResetButton onClick={handleResetFilters}>Reset Filters</ResetButton>
        </ButtonContainer>
      </div>
      <Grid sx={{ textAlign: '-webkit-center', pt: 7, width:'100%' }} container spacing={5}>
        {filteredAuctions.map((auction, index) => ( 
          <Grid spacing={2} sx={{justifyContent: 'center'}} item xs={10} md={10} key={index}>
            <Card  
              spacing={2}
              name={foundObjectsListF[index].title}
              description={auction.description}
              location={foundObjectsListF[index].location}
              category={auction.status}
              id={auction._id}
              catId={auction.status}
              date ={auction.endDate}
              photo ={foundObjectsListF[index].objectImage}
              status={auction.status}
              matchButton = {true}
            />
          </Grid>
        ))}  
      </Grid> 
    </Container>
  );
}
