import React from 'react';
import Login from '../components/loginComponent/index';
import photo from '../assets/background/bg-photo.jpg';
import styled, { keyframes } from 'styled-components';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import "./LoginPage.css"
import  { useEffect } from "react";
import AddLostObjectComponent  from '../components/AddLostObjectComponent' ; 
import  '../assets/colors/colors.css' ; 
const PrimaryContainer = styled.div`
  margin: 9em 7em;
  text-align: -webkit-center;
  place-content: center;
  @media (max-width: 1200px) {
    margin: 7em 5em; // Margens para telas médias
  }

  @media (max-width: 768px) {
    margin: 5em 3em; // Margens para telas pequenas
  }
`;
export default function RegisterLostObjectPage() {
  
  return (
   
    
    <PrimaryContainer > 
    <AddLostObjectComponent />
  </PrimaryContainer>
  
  );
}
