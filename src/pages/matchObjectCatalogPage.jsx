import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import WelcomeHeaderComponent from '../components/headerWithNameComponent/welcomeHeader.jsx';

import { useLocation } from 'react-router-dom';
import LostItemComponent from '../components/matchItemsComponents/LostItemComponent';

const Container = styled.div`
  top: 3em;
  position: relative;
`;

export default function LostObjectCatalogPage() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const param1 = searchParams.get('param1'); 

  return (
    <Container>
      {/* Add filter buttons if needed based on your implementation */}
      <Grid sx={{ textAlign: '-webkit-center', placeContent: 'center' }} container spacing={5}>
        <Grid key="lost-object" spacing={2} sx={{ justifyContent: 'center' }} item xs={10} md={10}>
           <WelcomeHeaderComponent name={'Carlos'} description={'Did you know that over 30 milion wallets are lost every year?'}/>
          <LostItemComponent/>

        </Grid>


      </Grid>
    </Container>
  );
}
