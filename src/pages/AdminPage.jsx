import React from 'react';
import Login from '../components/loginComponent/index';
import photo from '../assets/background/bg-photo.jpg';
import styled, { keyframes } from 'styled-components';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import "./LoginPage.css"
import  { useEffect } from "react";
import AddFoundObjectComponent  from '../components/AddFoundObjectComponent/index' ; 
import CategoryComponent  from '../components/CategoryComponent/index' ; 
import SationComponent  from '../components/StationComponent/index' ; 
import PoliceComponent  from '../components/PoliceComponent/index' ; 


export default function AdminPage() {
  
  return (
   
    <Grid sx={{ textAlign: '-webkit-center'}} container  spacing={2}>
    <Grid  xs={12} >
  </Grid>
  <Grid xs={12}>
  <  AddFoundObjectComponent />
  <  CategoryComponent/>
  <  SationComponent/> 
  <  PoliceComponent/>
  </Grid>
    </Grid>
  );
}
