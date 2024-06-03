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
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth, AuthProvider } from '../../components/AuthContext';
import axios from "axios";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom"; 
import Layout from '../../components/Layout/Layout';

import WelcomeHeaderComponent from '../../components/headerWithNameComponent/welcomeHeader.jsx';
import styled from 'styled-components';

const token = localStorage.getItem("token");


const PrimaryContainer = styled.div`
  margin: 0.1em 7em;
  text-align: -webkit-center;
  place-content: center;
`;


const defaultTheme = createTheme();

function Home() {
    const [user, setUser] = useState('');
    const { setAuthUser, authUser, isLoggedIn, setIisLoggedIn,token,loading } = useAuth();

    if (loading) {
     return null;
    }
  
    if (!token) {
      setUser("there");
    }

    else{
      const fetchUserProfile = async () => {
      try {
      
        const response = await axios.get(`https://10.182.0.39/api/users/profile/${token}`);
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
      <Navigate to="/profile" replace />;
    }
  
    return(
    <PrimaryContainer>
     
      <WelcomeHeaderComponent name={user} description={'Welcome to bidfind.er! Lets get you started!'}/>
      
    </PrimaryContainer>
    );
  }
  
  export default Home;