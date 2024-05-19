import React from 'react';
import Login from '../components/loginComponent/index';
import photo from '../assets/background/bg-photo.jpg';
import styled, { keyframes } from 'styled-components';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import "./LoginPage.css"
import  { useEffect, useState } from "react";
import AddFoundObjectComponent  from '../components/AddFoundObjectComponent/index' ; 
import CategoryComponent  from '../components/CategoryComponent/index' ; 
import SationComponent  from '../components/StationComponent/index' ; 
import PoliceComponent  from '../components/PoliceComponent/index' ; 
import AdminMenu from '../components/profileMenu/index'
import ProfileSettings from '../components/profileSettings';

const PrimaryContainer = styled.div`
  margin: 9em 7em;
  text-align: -webkit-center;
  place-content: center;
`;

const ChangeContainer = styled.div`
  width: auto;
  margin: 5em 0;
  opacity: 1;
  
  padding: 40px;
`;
export default function AdminPage() {
  const menuOptions = ['Found Object', 'Police station','Profile'];

  const [selectedOption, setSelectedOption] = useState(menuOptions[0]);
  const renderComponent = () => {
    switch (selectedOption) {
      
     
      case 'Police station':
          return <SationComponent/> ;
      case 'Profile':
          return <ProfileSettings />;
      default:
        return < AddFoundObjectComponent />;
      
    }
    
  };
  return (
   
    
    
    
    <PrimaryContainer>
      <AdminMenu  options={menuOptions} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
    <ChangeContainer>
    {renderComponent()}
  </ChangeContainer>
  
  </PrimaryContainer>
  );
}