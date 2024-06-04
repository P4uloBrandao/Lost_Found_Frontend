import React from 'react'
import axios from "axios";
import SignUp from "../components/SignUpComponent";
import styled, { keyframes } from 'styled-components';
import LoginImage from '../assets/background/loginImage.svg'; 
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import "./LoginPage.css"
import  { useEffect, useState } from "react";
import AuctionsComponent from "../components/AuctionsComponent";
import WelcomeHeaderComponent from '../components/headerWithNameComponent/welcomeHeader.jsx';

const token = localStorage.getItem("token");


const PrimaryContainer = styled.div`
  margin: 0.1em 7em;
`;

export default function AuctionsPage() {
  useEffect(() => {
    // Retornar a função de limpeza no desmonte do componente
    return () => {
    };
  }, []);

  const [user, setUser] = useState('');

  const fetchUserProfile = async () => {
    try {
    
      const response = await axios.get(`http://localhost:3000/api/users/profile/${token}`);
      const userProfileData = response.data.currentUser; // Supondo que o endpoint forneça os detalhes do perfil do usuário
      setUser(userProfileData.first_name);
            // ... (outros estados conforme necessário)
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      // Lide com erros conforme necessário
    }
  };
      // Chame a função de busca ao montar o componente
  fetchUserProfile();

  return (
    <>
    <PrimaryContainer container  spacing={0}>
      <WelcomeHeaderComponent name={user} description={'Creating auctions is our way to save the planet, bid and buy lost items! '}/>
    </PrimaryContainer>
    <Grid className="logincontainer">
      <AuctionsComponent/>
    </Grid>
    </>
  );
}
