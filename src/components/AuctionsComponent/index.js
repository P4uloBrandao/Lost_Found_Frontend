import styled, { css } from 'styled-components';
import React, { useEffect, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { AuthContext } from "../AuthContext";
import './style.css';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AuctionInfoComponent from '../SelectedAuctionComponent/ObjectDataComponent/AuctionDataContainer.jsx'
import { createTheme } from '@mui/material/styles';
import "../../assets/colors/colors.css"
import AuctionsCardComponent from "../AuctionsCardComponent";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import io from 'socket.io-client'; // Import socket.io-client

const colors = css`
  --primary-color: #c6c3c3;
  --second-color: #ffffff;
  --black-color: #000000;
`;

const defaultTheme = createTheme();

const Container = styled.div`
  padding: 32px 64px;
  flex-direction: column;
  overflow: auto;
  display: flex;  
  justify-content: flex-start;
  align-items: center;
  
  p {
    color: #000;
    margin: 0;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  margin-bottom: 3rem;
`;

const FilterText = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  
  &:hover {
    background: #ECECEC;
    border-radius: 15px;
  }
`;

const SearchInput = styled.div`
  display: flex;
  border-radius: 30px;
  background: #ECECEC;
  align-items: center;
  gap: 40px;
  padding: 5px 10px;
  color: #000000;
`;

const FilterInputContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  position: relative;
  
  &:hover {
    background: #ECECEC;
    border-radius: 15px;
  }
`;

const FilterOptions = styled.div`
  position: absolute;
  top: 105%;
  left: 0;
  background: #ECECEC;
  border-radius: 15px;
  padding: 1rem;
  z-index: 100;
`;

const FilterCheckBoxes = styled.div`
  display: flex;
  align-items: center;
`;

function getDaysLeft(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const socket = io('http://localhost:5000'); // Connect to your WebSocket server

export default function AuctionsComponent() {
  const [showFilters, setShowFilters] = React.useState(false);
  const [auctions, setAuctions] = React.useState([]);
  const [auctionsFiltered, setAuctionsFiltered] = React.useState([]);
  const [openCard, setOpenCard] = useState(null);
  const [filters, setFilters] = React.useState([]);

  useEffect(() => {

    const fetchAuctions = () => {
      axios.get(process.env.REACT_APP_API_URL + "/api/auction")
          .then((response) => {
            setAuctions(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    };

    // Initial fetch when component mounts
    fetchAuctions();

    // Set up interval to fetch data every 2 seconds
    const intervalId = setInterval(fetchAuctions, 3000);

    // Set up WebSocket event listeners
    socket.on('newBid', (updatedAuction) => {
      // Update the auction list when a new bid occurs
      setAuctions((prevAuctions) =>
          prevAuctions.map(auction =>
              auction._id === updatedAuction._id ? updatedAuction : auction
          )
      );
    });

    return () => {
      // Clean up WebSocket listeners
      clearInterval(intervalId);
      socket.off('newBid');
    };
  }, []); // Dependency array to run effect on changes to 'auctions'

  useEffect(() => {
    if (filters.includes('current')) {
      currentFilter();
    } else if (filters.includes('past')) {
      pastFilter();
    } else if (filters.includes('future')) {
      futureFilter();
    } else {
      setAuctionsFiltered(auctions);
    }
  }, [auctions, filters]);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCardClick = (id) => {
    const auction = auctions.find(auction => auction._id === id);
    setOpenCard(auction);
  };

  const setSearchingFilter = (search) => {
    const value = search.target.value;

    if (value === '') {
      setAuctionsFiltered(auctions);
    } else {
      const filteredAuctions = auctions.filter(auction => {
        return auction.foundObjectTitle.toLowerCase().includes(value.toLowerCase());
      });
      setAuctionsFiltered(filteredAuctions);
    }
  };

  const currentFilter = () => {
    const currentAuctions = auctions.filter(auction => {
      const today = new Date();
      const endDate = new Date(auction.endDate);
      const startDate = new Date(auction.startDate);
      return today >= startDate && today <= endDate;
    });
    setAuctionsFiltered(currentAuctions);
  };

  const setCurrentFilter = () => {
    if (filters.includes('current')) {
      filters.splice(filters.indexOf('current'), 1);
      setAuctionsFiltered(auctions);
    } else {
      filters.splice(filters.indexOf('past'), 1);
      filters.splice(filters.indexOf('future'), 1);
      filters.push('current');

        currentFilter();
    }
  };

  const pastFilter = () => {
    const pastAuctions = auctions.filter(auction => {
      const today = new Date();
      const endDate = new Date(auction.endDate);
      return today > endDate;
    });
    setAuctionsFiltered(pastAuctions);
  }

  const setPastFilter = () => {
    if (filters.includes('past')) {
      filters.splice(filters.indexOf('past'), 1);
      setAuctionsFiltered(auctions);
    } else {
      filters.splice(filters.indexOf('current'), 1);
      filters.splice(filters.indexOf('future'), 1);
      filters.push('past');

        pastFilter();
    }
  };

    const futureFilter = () => {
      const futureAuctions = auctions.filter(auction => {
        const today = new Date();
        const startDate = new Date(auction.startDate);
        return today < startDate;
      });
      console.log(futureAuctions)
        setAuctionsFiltered(futureAuctions);
    }
  const setFutureFilter = () => {
    if (filters.includes('future')) {
      setAuctionsFiltered(auctions);
      filters.splice(filters.indexOf('future'), 1);
    } else {
      filters.splice(filters.indexOf('past'), 1);
      filters.splice(filters.indexOf('current'), 1);
      filters.push('future');

        futureFilter();
    }
  };

  return (
    <>
      <Container>
        <FiltersContainer>
          <FilterText className={filters.includes('current') ? 'background-filtered': ''} onClick={setCurrentFilter}>Current</FilterText>
          <FilterText className={filters.includes('future') ? 'background-filtered': ''} onClick={setFutureFilter}>Future</FilterText>
          <FilterText className={filters.includes('past') ? 'background-filtered': ''} onClick={setPastFilter}>Past</FilterText>
          <SearchInput>
            <input onChange={setSearchingFilter}  type={"text"} placeholder={"Search"} className={"searchInput"}/>
            <SearchIcon className={"searchIcon"}/>
          </SearchInput>
        </FiltersContainer>

        <div className="lost-item-container" style={{ display: 'flex', flexDirection: 'column', width: '100%', }}>
          {openCard ? <AuctionInfoComponent itemid={ openCard} /> : null}
          <CardsContainer>
            {auctionsFiltered.map((auction, index) => (
              auction !== openCard && (
                <AuctionsCardComponent
                  key={auction._id}
                  image={"https://res.cloudinary.com/dkyu0tmfx/image/upload/v1/objectImages/" +auction.objectImage[0]}
                  itemTitle={auction.foundObjectTitle}
                  id={auction._id}
                  daysLeft={getDaysLeft(auction.startDate, auction.endDate)}
                  bidsNumber={auction.bids.length}
                  price={auction.highestBid}
                  onCardClick={handleCardClick}
                />
              )
            ))}
          </CardsContainer>
        </div>
      </Container>
    </>
  );
}
