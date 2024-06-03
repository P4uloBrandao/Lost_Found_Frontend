import React from 'react'
import SignUp from "../components/SignUpComponent";
import styled, { keyframes } from 'styled-components';
import LoginImage from '../assets/background/loginImage.svg'; 
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import "./LoginPage.css"
import  { useEffect } from "react";



export default function LoginPage() {
  useEffect(() => {
    // Bloquear scroll horizontal e vertical
    document.body.style.overflow = 'hidden';

    // Retornar a função de limpeza no desmonte do componente
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
   
    <Grid  container  spacing={0}>
    <Grid className="logincontainer" xs={12} md={5}>
    <SignUp/>
  </Grid>
  <Grid xs={12} md={7}>
  <img className='image' src={LoginImage} alt="" />

  </Grid>
    </Grid>
  );
}
