import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import AuctionInfoComponent from '../SelectedAuctionComponent/ObjectDataComponent/AuctionDataContainer.jsx'
import Card from "../CardComponentAuction/index";
import SearchInput from "../SearchInputFieldComponent/index";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";
import {useParams} from "react-router-dom";

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
  cursor: pointer;
  margin-right: 11px;
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToPayContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #000000;
  background: linear-gradient(90deg, rgba(3, 155, 175, 0.5), rgba(247, 219, 97, 0.5));
    border-radius: 15px;
  gap: 30px;
`

export default function AuctionsCatalog() {
  const [errorMessage, setErrorMessage] = useState("");
  const [auctions, setAuctions] = useState([]);
  const [auctionName, setAuctionName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [auctionsToPay, setAuctionsToPay] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null); // UseRef para o campo de busca
  const [openCard, setOpenCard]= useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userResponse = await axios.get(process.env.REACT_APP_API_URL+`/api/users/profile/${token}`);
        const userData = userResponse.data.currentUser._id;

        // Buscar os dados dos leilões
        const auctionsResponse = await axios.get(process.env.REACT_APP_API_URL+`/api/auction/user/${userData}`);
        let auctionsData = auctionsResponse.data;

        // Verificar se a mensagem de "Not participated in any auctions" foi recebida
        if (auctionsData.message === 'Not participated in any auctions') {
          setErrorMessage(auctionsData.message);
          setIsLoading(false);
          return;
        }



        // Array para armazenar as promessas de solicitação HTTP
        const requests = [];
        const requestsBid = [];

        // Iterar sobre os dados dos leilões e adicionar as promessas de solicitação HTTP ao array
        auctionsData.forEach(auction => {
          const foundObject = auction.foundObject;
          const requestPromise = axios.get(process.env.REACT_APP_API_URL+`/api/found-objects/${foundObject}`);
          requests.push(requestPromise);
          const requestPromiseBid = axios.get(process.env.REACT_APP_API_URL+`/api/auction/${auction._id}/bid`);
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

        // Atualizar o estado dos leilões com os dados buscados
        auctionsData.forEach((auction, index) => {
          auction['winnerBidValue'] = bidsData[index].value;
          auction['name'] = foundObjectsData[index].name;
          auction['objectImage'] = foundObjectsData[index].objectImage;
          auction['location'] = foundObjectsData[index].location;
          auction['description'] = foundObjectsData[index].description;
          auction['category'] = foundObjectsData[index].category;
        });
        setAuctions(auctionsData);

        setIsLoading(false);
      } catch (error) {
        console.log('Failed to fetch data:', error);
        setErrorMessage('We had an issue on our side. Please try again later');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const handleCardClick = (id) => {
    setOpenCard(id);
  };

  const handlePayButtonClick = async (auctionId) => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    const auction = auctionsToPay.find(auction => auction._id === auctionId);
    const response = await axios.post(process.env.REACT_APP_API_URL+`/api/payment`, {
      name: auction.name,
      image: process.env.REACT_APP_CLOUDINARY_IMAGE_URL + auction.objectImage,
      price: auction.winnerBidValue,
      auctionId: auctionId
    });
    const result = stripe.redirectToCheckout({
      sessionId: response.data.id
    })
  };


  const handleDropdownChange = (selectedOptionName) => {
    setAuctionName(selectedOptionName);
  };

  useEffect(() => {

    const reorderAuctions = async () => {
      const auctionsCopy = [...auctions];
      const auctionsToPay = [];
      let indexesToRemove = [];
      for (const auction of auctionsCopy) {
        const index = auctionsCopy.indexOf(auction);
        if(!!auction.winnerBid) {
          if (!!auction && auction.winnerBid === auction.bid) {
            const response = await axios.get(process.env.REACT_APP_API_URL+`/api/payment/checkPayment/${auction._id}`);
            const paid = response.data.paid;
            auction['paid'] = paid;
            auctionsToPay.push(auction);
            indexesToRemove.push(index);
          }
        }
      }
      indexesToRemove = indexesToRemove.sort((a, b) => b - a);
        indexesToRemove.forEach(index => auctionsCopy.splice(index, 1));
      setFilteredAuctions(auctionsCopy);
      auctionsToPay.sort((a, b) => {
        if (a.paid === false && b.paid === true) {
          return -1;
        }
        // Mantém a ordem dos objetos com paid: true
        if (a.paid === true && b.paid === false) {
          return 1;
        }
        // Se ambos são iguais, mantém a ordem original
        return 0;
      });
        setAuctionsToPay(auctionsToPay);
    };

    reorderAuctions();

  } , [auctions]);


  const handleSearch = (value) => {
    const filtered = auctions.filter((auction, index) => {
      return auction.name.toLowerCase() === value.toLowerCase();
    });
    setFilteredAuctions(filtered);
  };
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilteredAuctions(auctions); // Exibir todos os leilões novamente
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <Container>
      <Title>My Auctions</Title>
      <CategoryTitle>
        Here you can view all the auctions you placed a bid on! Hope you win it!
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
            value={auctionName}
            ref={searchInputRef}
          />
          <SearchButton onClick={() => {handleSearch(auctionName)}}>Search</SearchButton>
          <ResetButton onClick={handleResetFilters}>Reset Filters</ResetButton>
        </ButtonContainer>
      </div>
      {auctionsToPay.length>0 && <ToPayContainer>
        <Title> Auctions Payment: </Title>
        {auctionsToPay.map((auction, index) => (
              <Card
                  spacing={2}
                  name={auction.name}
                  description={auction.description}
                  location={auction.location}
                  category={auction.category}
                  id={auction._id}
                  catId={auction.status}
                  date={auction.endDate}
                  photo={process.env.REACT_APP_CLOUDINARY_IMAGE_URL + auction.objectImage[0]}
                  status={auction.status}
                  matchButton={true}
                  highbid={auction.winnerBidValue + " EUR"}
                  onCardClick={handleCardClick}
                  onPayClick={handlePayButtonClick}
                  bidValue={auction.value}
                  paymentObject={{
                    paid: auction.paid
                  }}
              />
        ))}

      </ToPayContainer>}
      <Grid sx={{ textAlign: '-webkit-center', pt: 7, width: '100%' }} container spacing={5}>
       {openCard ? <AuctionInfoComponent itemid={openCard}/> : null}
        {filteredAuctions.map((auction, index) => (
          <Grid spacing={2} sx={{ justifyContent: 'center' }} item xs={10} md={10} key={index}>
            <Card  
              spacing={2}
              name={auction.name}
              description={auction.description}
              location={auction.location}
              category={auction.category}
              id={auction._id}
              catId={auction.status}
              date={auction.endDate}
              photo={ process.env.REACT_APP_CLOUDINARY_IMAGE_URL + auction.objectImage[0]}
              status={auction.status}
              matchButton={true}
              highbid={auction.winnerBidValue + " EUR"}
              onCardClick={handleCardClick}
              bidValue={auction.value}
            />
          </Grid>
        ))}  
      </Grid> 
    </Container>
  );
}
