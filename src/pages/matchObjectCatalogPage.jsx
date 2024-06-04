import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileMenu from '../components/profileMenu/index';
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

  const menuOptions = ['Profile Settings', 'My Auctions', 'My Lost Objects','Payments Details', 'Privacy Settings'];

  const [selectedOption, setSelectedOption] = useState(menuOptions[0]);

  return (
    <div>
      <WelcomeHeaderComponent name={'Carlos'} description={'Did you know that over 30 milion wallets are lost every year?'}/>
     <ProfileMenu options={menuOptions} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <LostItemComponent itemid={itemid} /> 
    </div>
  );
}
