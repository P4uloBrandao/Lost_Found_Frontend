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
// TODO remove, this demo shouldn't need to reset the theme.
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
`

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  justify-content: center;
`
const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
    justify-content: center;
  margin-bottom: 3rem;
`

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
`

const SearchInput = styled.div`
  display: flex;
  border-radius: 30px;
  background: #ECECEC;
  align-items: center;
  gap: 40px;
  padding: 5px 10px;
  color: #000000;
`

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
  
`

const FilterOptions = styled.div`
    position: absolute;
    top: 105%;
    left: 0;
    background: #ECECEC;
    border-radius: 15px;
    padding: 1rem;
    z-index: 100;
`

const FilterCheckBoxes = styled.div`
    display: flex;
  align-items: center;
`

function getDaysLeft(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}


export default function AuctionsComponent() {

  const [showFilters, setShowFilters] = React.useState(false);
  const [auctions, setAuctions] = React.useState([]);
  const [auctionsFiltered, setAuctionsFiltered] = React.useState([]);

  const [openCard, setOpenCard] = useState(null);
  const [filters, setFilters] = React.useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/auction").then((response) => {
      setAuctions(response.data);
      setAuctionsFiltered(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  }


  const handleCardClick = (id) => {
    setOpenCard(id);
  };

  const setCurrentFilter = () => {
    if (filters.includes('current')) {
      filters.splice(filters.indexOf('current'), 1);
      setAuctionsFiltered(auctions);
    } else {

      filters.splice(filters.indexOf('past'), 1);
      filters.splice(filters.indexOf('future'), 1);
        filters.push('current');

      //filtrar auctions
      const currentAuctions = auctions.filter(auction => {
        const today = new Date();
        const endDate = new Date(auction.endDate);
        const startDate = new Date(auction.startDate);
        return today >= startDate && today <= endDate;
      })
      setAuctionsFiltered(currentAuctions);
    }
  }

  const setPastFilter = () => {
    if (filters.includes('past')) {
      filters.splice(filters.indexOf('past'), 1);
      setAuctionsFiltered(auctions);
    } else {

      filters.splice(filters.indexOf('current'), 1);
      filters.splice(filters.indexOf('future'), 1);
        filters.push('past');

      //filtrar auctions
      const pastAuctions = auctions.filter(auction => {
        const today = new Date();
        const endDate = new Date(auction.endDate);
        return today > endDate;
      });
      setAuctionsFiltered(pastAuctions);
    }
  }

    const setFutureFilter = () => {
    if (filters.includes('future')) {
      setAuctionsFiltered(auctions);

        filters.splice(filters.indexOf('future'), 1);
    } else {

      filters.splice(filters.indexOf('past'), 1);
      filters.splice(filters.indexOf('current'), 1);
        filters.push('future');



      //filtrar auctions
      const futureAuctions = auctions.filter(auction => {
        const today = new Date();
        const startDate = new Date(auction.startDate);
        return today < startDate;
      });
      setAuctionsFiltered(futureAuctions);
    }
  }

  return (
      <>
        <Container>
          <FiltersContainer>
            <FilterText className={filters.includes('current') ? 'background-filtered': ''} onClick={setCurrentFilter}>Current</FilterText>
            <FilterText className={filters.includes('future') ? 'background-filtered': ''} onClick={setFutureFilter}>Future</FilterText>
            <FilterText className={filters.includes('past') ? 'background-filtered': ''} onClick={setPastFilter}>Past</FilterText>
            <FilterInputContainer>
              <FilterText onClick={handleShowFilters}>Filter <TuneIcon></TuneIcon></FilterText>
              {showFilters && <FilterOptions>
                <FormGroup>
                  <FormControlLabel control={<Checkbox/>} label="Label" />
                  <FormControlLabel control={<Checkbox/>} label="Label" />
                  <FormControlLabel control={<Checkbox/>} label="Label" />
                </FormGroup>
              </FilterOptions>}

            </FilterInputContainer>
            <SearchInput>
              <input type={"text"} placeholder={"Search"} className={"searchInput"}/>
              <SearchIcon className={"searchIcon"}/>
            </SearchInput>
          </FiltersContainer>

          <div className="lost-item-container" style={{ display: 'flex', flexDirection: 'column', width: '100%', }}>
            {openCard ? <AuctionInfoComponent itemid={openCard} /> : null}
          <CardsContainer>
            {auctions.map((auction, index) => (
                auction._id !== openCard && (
                    <AuctionsCardComponent
                        image={"https://res.cloudinary.com/dkyu0tmfx/image/upload/v1/objectImages/" +auction.objectImage[0]} itemTitle={auction.foundObjectTitle}
                        id={auction._id}
                        daysLeft={getDaysLeft(auction.startDate, auction.endDate)}
                        bidsNumber={auction.bids.length}
                        price={auction.highestBid}
                        onCardClick={handleCardClick}
                    ></AuctionsCardComponent>
                )
            ))}
          </CardsContainer>
          </div>
        </Container>
      </>
  );
}