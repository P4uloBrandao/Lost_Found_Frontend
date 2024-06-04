import React from 'react';
import styled from 'styled-components';

import WelcomeHeaderComponent from '../components/headerWithNameComponent/welcomeHeader.jsx';
import Menu from '../components/profileMenu/index.jsx'; 

import LostItemComponent from '../components/matchItemsComponents/LostItemComponent';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';


const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function LostObjectCatalogPage() {

  const { authUser } = useAuth();
 
  const formattedName = authUser ? capitalizeFirstLetter(authUser.first_name) : null;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const itemid = searchParams.get('param1'); // Extract the param1 value from the URL

  const option = ['My Account', 'Payment Details', 'Privacy Settings', 'My Auctions', 'My Lost Objects'];


  return (
    <div>
      {authUser !== undefined && (<WelcomeHeaderComponent name={formattedName} description={'Did you know that over 30 million wallets are lost every year?'}/>)}
      <Menu options={option} selected={'My Lost Objects'} />
      <LostItemComponent itemid={itemid} /> 
    </div>
  );
}
