import React from 'react'
import SignUp from "../components/SignUpComponent";
import styled, { keyframes } from 'styled-components';
import LoginImage from '../assets/background/loginImage.svg'; 
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import "./LoginPage.css"
import  { useEffect } from "react";
import AuctionsComponent from "../components/AuctionsComponent";



export default function AuctionsPage() {
  useEffect(() => {
    // Bloquear scroll horizontal e vertical

    // Retornar a função de limpeza no desmonte do componente
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
   
    <Grid  container  spacing={0}>
    <Grid className="logincontainer" xs={12} md={5}>
    <AuctionsComponent/>
  </Grid>
  <Grid xs={12} md={7}>

  </Grid>
    </Grid>
  );
}
