import React from 'react';
import Login from '../components/loginComponent/index';
import photo from '../assets/background/bg-photo.jpg';
import styled, { keyframes } from 'styled-components';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import "./LoginPage.css"
import  { useEffect } from "react";
import AddLostObjectComponent  from '../components/AddLostObjectComponent' ; 
import  '../assets/colors/colors.css' ; 

export default function RegisterLostObjectPage() {
  
  return (
   
    
    <div style={{ marginTop: '65pt', backgroundColor: 'var(--white-color)' }}> {/* Adiciona margem superior */}
    <AddLostObjectComponent />
  </div>
  
  );
}
