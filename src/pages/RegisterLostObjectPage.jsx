import React from 'react';
import Login from '../components/loginComponent/index';
import photo from '../assets/background/bg-photo.jpg';
import styled, { keyframes } from 'styled-components';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import "./LoginPage.css"
import  { useEffect } from "react";
import AddLostObjectComponent  from '../components/registro_obj_pt2/App' ; 


export default function RegisterLostObjectPage() {
  
  return (
   
    <Grid sx={{ textAlign: '-webkit-center'}} container  spacing={2}>
    <Grid  xs={12} >
  </Grid>
  <Grid xs={12} >
  <  AddLostObjectComponent />

  </Grid>
    </Grid>
  );
}
