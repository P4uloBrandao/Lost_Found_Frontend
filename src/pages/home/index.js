import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth, AuthProvider } from '../../components/AuthContext';
import axios from "axios";
import { useState, useContext,useEffect } from "react";
import { Navigate } from "react-router-dom"; 
import Layout from '../../components/Layout/Layout';
import WelcomeHeaderComponent from '../../components/headerWithNameComponent/welcomeHeader.jsx';
import styled from 'styled-components';
import { InputSubmit, Container,InputBox ,Title,Form, Wrapper } from '../../assets/StylePopularComponent/style';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AuctionInfoComponent from '../../components/SelectedAuctionComponent/ObjectDataComponent/AuctionDataContainer.jsx'

import AuctionsCardComponent from "../../components/AuctionsCardComponent";
import TuneIcon from '@mui/icons-material/Tune';
import FormGroup from '@mui/material/FormGroup';

const token = localStorage.getItem("token");

const AuctionContainer = styled.div`
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

const PrimaryContainer = styled.div`
  margin: 0.1em 7em;
  text-align: -webkit-center;
  place-content: center;
`;
const BannerContainer = styled.div`
  background-color: #f5f5f5;
  padding: 2em;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BannerButton = styled.button`
  margin: 1em;
`;

const defaultTheme = createTheme();
function Home() {
  const navigate = useNavigate();
const [showFilters, setShowFilters] = React.useState(false);
  const [auctions, setAuctions] = React.useState([]);
  const [openCard, setOpenCard] = useState(null);
  const [user, setUser] = useState('');
  const { token, loading } = useAuth();

  const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
];
  const redirectLogin = () => {
    navigate("/login");
  
  }
  const redirectRegister = () => {    
    navigate("/register");
  }
  
  function getDaysLeft(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }
  
  useEffect(() => {
      const fetchUserProfile = async () => {
          if (!token) {
              setUser("there");
              return;
          }

          try {
              const response = await axios.get(process.env.REACT_APP_API_URL+`/api/users/profile/${token}`);
              const userProfileData = response.data.currentUser;
              setUser(userProfileData.first_name);
          } catch (error) {
              console.error("Failed to fetch user profile:", error);
          }
      };

      fetchUserProfile();
  }, [token]);
  
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+"/api/auction").then((response) => {
      setAuctions(response.data);
      console.log(response.data)
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  }


  const handleCardClick = (id) => {
      const auction = auctions.find(auction => auction._id === id);
      setOpenCard(auction);
  };
  if (loading) {
      return null; // Or a loading spinner
  };
  return (<>
      <PrimaryContainer>
          <WelcomeHeaderComponent name={user} description={'Welcome to BidFind.er! Let\'s get you started!'}/>
      </PrimaryContainer>

      {user==="there" && (
  <>
    <BannerContainer>
      <Typography variant="h4" gutterBottom>
        Create an account or log in to access all features.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Already have an account?
      </Typography>
      <InputSubmit alt={"Login"}onClick={redirectLogin} variant="contained" color="primary">
        Login
      </InputSubmit>
      <InputSubmit alt={"Create account"} onClick={redirectRegister} variant="outlined" color="primary">
        Create account
      </InputSubmit>
    </BannerContainer>
  </>
)}
    <BannerContainer>
     <Title>Active auctions</Title>
        <div className="lost-item-container" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {openCard ? <AuctionInfoComponent itemid={openCard} /> : null}
            <AuctionContainer>
              {auctions.slice(0, 6).map((auction, index) => (
                auction._id !== openCard && (
                  <Grid spacing={2} sx={{ justifyContent: 'center' }} item xs={10} md={10} key={index}>
                    <AuctionsCardComponent 
                      image={auction.objectImage.length ===0 ? "https://res.cloudinary.com/dkyu0tmfx/image/upload/v1719065883/objectImages/default_obj_ht0fde.png": "https://res.cloudinary.com/dkyu0tmfx/image/upload/v1/objectImages/"+ auction.objectImage[0]}
                      itemTitle={auction.foundObjectTitle}
                      id={auction._id}
                      daysLeft={getDaysLeft(auction.startDate, auction.endDate)}
                      bidsNumber={auction.bids.length}
                      price={auction.highestBid}
                      
                      onCardClick={handleCardClick}
                    />
                  </Grid>
                )
              ))}
            </AuctionContainer>
          </div>

    

     </BannerContainer>
     
     </>
   
  );
}

export default Home;