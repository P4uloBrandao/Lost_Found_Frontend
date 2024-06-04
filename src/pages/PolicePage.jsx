import React from 'react';
import axios from "axios";
import Login from '../components/loginComponent/index';
import photo from '../assets/background/bg-photo.jpg';
import styled, { keyframes } from 'styled-components';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import "./LoginPage.css"
import  { useEffect, useState } from "react";
import AddFoundObjectComponent  from '../components/AddFoundObjectComponent/index' ; 
import SationComponent  from '../components/StationComponent/index' ; 
import PoliceComponent  from '../components/PoliceComponent/index' ; 
import AdminMenu from '../components/profileMenu/index'
import ProfileSettings from '../components/profileSettings';
import WelcomeHeaderComponent from '../components/headerWithNameComponent/welcomeHeader.jsx';

const token = localStorage.getItem("token"); 

const PrimaryContainer = styled.div`
  margin: 0.1em 7em;
  text-align: -webkit-center;
  place-content: center;
  @media (max-width: 1200px) {
    margin: 7em 5em; // Margens para telas médias
  }

  @media (max-width: 768px) {
    margin: 5em 3em; // Margens para telas pequenas
  }
`;

const ChangeContainer = styled.div`
  width: auto;
  margin: 5em 0;
  opacity: 1;
  
  padding: 40px;
`;
export default function AdminPage() {

  const [user, setUser] = useState('');

    const fetchUserProfile = async () => {
      try {
      
        const response = await axios.get(`http://localhost:3000/api/users/profile/${token}`);
        const userProfileData = response.data.currentUser; // Supondo que o endpoint forneça os detalhes do perfil do usuário
        setUser(userProfileData.first_name);
              // ... (outros estados conforme necessário)
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Lide com erros conforme necessário
      }
    };
        // Chame a função de busca ao montar o componente
    fetchUserProfile();

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
      <WelcomeHeaderComponent name={user} description={'Thank you for making this project possible! Have a great day!'}/>
      <AdminMenu  options={menuOptions} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
    <ChangeContainer>
    {renderComponent()}
  </ChangeContainer>
  
  </PrimaryContainer>
  );
}