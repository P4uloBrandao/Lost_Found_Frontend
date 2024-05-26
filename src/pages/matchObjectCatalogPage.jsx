import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import WelcomeHeaderComponent from '../components/headerWithNameComponent/welcomeHeader.jsx';
import Menu from '../components/profileMenu/index.jsx'; 
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
  const option =['My Account','Payment Details','Privacy Settings','My Auctions','My Lost Objects']
  return (
    <div>
      <WelcomeHeaderComponent name={'Carlos'} description={'Did you know that over 30 milion wallets are lost every year?'}/>
      <Menu options={option} selected={'My Lost Objects'} />
      <LostItemComponent/>
    </div>
   


  );
}