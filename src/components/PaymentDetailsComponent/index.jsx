import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

import Card from "../CardComponentPayment/index";

import axios from "axios";

import "../../assets/colors/colors.css"

const token = localStorage.getItem("token");

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    display:grid 
  }
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 100%;
`;

const InputSubmit = styled.button`
width: 100%;
  height: 40px;
  background: #c6c3c3;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--white-color);
  }
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


const Container = styled.div`
    position: relative;
`;


const PaymentDetails = () => {
    
  const [errorMessage, setErrorMessage] = useState("");
  const [auctions, setAuctions] = useState([]);
  const [auctionName, setAuctionName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null); // UseRef para o campo de busca
  const [foundObjectsList, setFoundObjectsList] = useState([]);
  const [foundObjectsListF, setFoundObjectsListF] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userResponse = await axios.get(`http://localhost:3000/api/users/profile/${token}`);
        const userData = userResponse.data.currentUser._id;

        const bidderResponse = await axios.get(`http://localhost:3000/api/users/bidder/${userData}`);
        const bidderId = bidderResponse.data[0]._id;
    
        const idsResponse = await axios.get(`http://localhost:3000/api/payment/getPaymentInfoUser/${bidderId}`);
        const idsData = idsResponse.data;
        const auctionIds = idsData.map((payment) => payment.paymentAuction);

        // Em seguida, obtenha os detalhes de cada leilão usando os IDs
        const auctionPromises = auctionIds.map((auctionId) =>
          axios.get(`http://localhost:3000/api/auction/${auctionId}`)
        );

        const auctionsResponses = await Promise.all(auctionPromises);
        const auctionsData = auctionsResponses.map((response) => response.data);

        setAuctions(auctionsData);

        // Atualizar o estado dos leilões com os dados buscados
        setAuctions(auctionsData);
        setFilteredAuctions(auctionsData); // Inicialmente, mostrar todos os leilões

        // Array para armazenar as promessas de solicitação HTTP
        const requests = [];
        const requestsBid = [];

        // Iterar sobre os dados dos leilões e adicionar as promessas de solicitação HTTP ao array
        auctionsData.forEach(auction => {
          const foundObject = auction.foundObject;
          const requestPromise = axios.get(`http://localhost:3000/api/found-objects/${foundObject}`);
          requests.push(requestPromise);
          const requestPromiseBid = axios.get(`http://localhost:3000/api/auction/${auction._id}/bid`);
          requestsBid.push(requestPromiseBid);
        });

        // Aguardar que todas as solicitações sejam concluídas
        const responses = await Promise.all(requests);
        const responsesBid = await Promise.all(requestsBid);

        // Iterar sobre as respostas e extrair os objetos encontrados
        let foundObjectsData = responses.map(response => response.data);
        const bidsData = responsesBid.map(response => response.data);

        // Renomear o campo title para name
        foundObjectsData = foundObjectsData.map(obj => ({ ...obj, name: obj.title }));

        auctionsData.forEach((auction, index) => {
          auction.winnerBid = bidsData[index].value;
        });

        setFoundObjectsList(foundObjectsData);
        setFoundObjectsListF(foundObjectsData);

        setIsLoading(false);
  
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Lidar com erros conforme necessário
      }
    };
  
    fetchData();
  }, []);
  
  
  useEffect(() => {
    console.log("Current auctionName:", auctionName); // Print auctionName to the console whenever it changes
  }, [auctionName]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
        <Title>Payments Details</Title>
        <CategoryTitle>
        Here you can find the payment status of all the auctions you have won and pay the ones in debt.
        </CategoryTitle>
          
        <Grid sx={{ textAlign: '-webkit-center', pt: 7, width: '100%' }} container spacing={5}>
            {filteredAuctions.map((auction, index) => (
            <Grid spacing={2} sx={{ justifyContent: 'center' }} item xs={10} md={10} key={index}>
                <Card  
                spacing={2}
                name={foundObjectsListF[index].name}
                description={auction.description}
                location={foundObjectsListF[index].location}
                category={foundObjectsListF[index].category}
                id={auction._id}
                catId={auction.status}
                date={auction.endDate.split('T')[0]}
                photo={foundObjectsListF[index].objectImage[0]}
                status={auction.status}
                matchButton={true}
                highbid={auction.winnerBid + " EUR"}
                />
            </Grid>
            ))}  
        </Grid> 
    </Container>    
    );
  };
  
  export default PaymentDetails;
             
