import React from 'react';
import axios from "axios";

import styled, { keyframes } from 'styled-components';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import "./LoginPage.css"
import  { useEffect, useState } from "react";
import AddFoundObjectComponent  from '../components/AddFoundObjectComponent/index' ; 
import CategoriesComponents  from '../components/CategoriesComponents/index' ; 
import StationCreateComponent  from '../components/StationCreateComponent/index' ; 
import PoliceComponent  from '../components/PoliceComponent/index' ; 
import AdminMenu from '../components/profileMenu/index'
import Statistics from '../components/StatisticsComponent/index'
import AdminAuctionComponent from '../components/AdminAuctionComponent/index';
import AdminUserAccountComponent from '../components/AdminUserAccountComponent/index.jsx';
import WelcomeHeaderComponent from '../components/headerWithNameComponent/welcomeHeader.jsx';
import DeleteFoundObjComponent from '../components/DeleteFoundObjComponent/index'
import ListFoundObjComponent from '../components/ListFoundObjComponent/index.jsx'
import ListUsersComponent from '../components/ListUsersComponent/index.jsx';

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

  const menuOptions = ['Estatistics','Users','Found Object', 'Categories','Auctions','Police station','Police Officer'];

  const [selectedOption, setSelectedOption] = useState(menuOptions[0]);
  const renderComponent = () => {
    switch (selectedOption) {
      
      case 'Found Object':
        return (
          <>
            {/* < AddFoundObjectComponent /> */}
            < DeleteFoundObjComponent />
            < ListFoundObjComponent />
          </>
        );
      case 'Categories':
        return <CategoriesComponents/>
      case 'Users':
        return (<>
        <AdminUserAccountComponent/>
          < ListUsersComponent />
       </> )
      case 'Police station':
          return < StationCreateComponent/> ;
      case 'Police Officer':
          return <PoliceComponent />;
      case 'Auctions':
          return <AdminAuctionComponent />;
      default:
        return <Statistics />
      
    }
    
  };
  return (
   
    
    
    
    <PrimaryContainer>
      <WelcomeHeaderComponent name={user} description={'Welcome to your dedicated Admin Page!'}/>
      <AdminMenu  options={menuOptions} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
    <ChangeContainer>
    {renderComponent()}
  </ChangeContainer>
  
  </PrimaryContainer>
  );
}