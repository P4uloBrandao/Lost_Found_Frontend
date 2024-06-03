// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from "axios";

import ProfileMenu from '../components/profileMenu/index';
import ChangePassword from '../components/ChangePasswordComponent';
import ProfileSettings from '../components/profileSettings/index';
import DeleteProfile from '../components/deleteProfile/index';
import MyAuctions from "../components/AuctionsCatalog/index.jsx";
import MyLost from '../components/LostObjectsCatalog/index.jsx';
import WelcomeHeaderComponent from '../components/headerWithNameComponent/welcomeHeader.jsx';
import styled from 'styled-components';

const token = localStorage.getItem("token");


const PrimaryContainer = styled.div`
  margin: 0.1em 7em;
  text-align: -webkit-center;
  place-content: center;
`;

const ChangeContainer = styled.div`
  opacity: 1;
  background-color: var(--white-color);  
  margin-top: 2em ;
  padding: 2em ;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: var(--black-color);
  opacity: 1;
  text-align: left;
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  color: #3cb684;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 27px;
  text-align: left !important;
  margin-top: 0px;
`;


const ProfilePage = () => {

    const [user, setUser] = useState('');

    const fetchUserProfile = async () => {
      try {
      
        const response = await axios.get(`https://bidfinderbackend.ddns.net/api/users/profile/${token}`);
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

  // Definir as opções de menu
  const menuOptions = ['Profile Settings', 'My Auctions', 'My Lost Objects','Payments Details', 'Privacy Settings'];

  const [selectedOption, setSelectedOption] = useState(menuOptions[0]);
  
  const renderComponent = () => {
    switch (selectedOption) {
      case 'Profile Settings':
        return [
          <ProfileSettings/>,
          <ChangePassword  />,
          <DeleteProfile />
        ];
      case 'My Auctions':
        return <MyAuctions />;
      case 'My Lost Objects':
        return <MyLost />;
      case 'Payments Details':
          return <DeleteProfile />;
      case 'Privacy Settings':
          return <DeleteProfile />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <PrimaryContainer>
      {/* Renderizar o componente Menu com as opções */}
      <WelcomeHeaderComponent name={user} description={'Did you know that over 30 milion wallets are lost every year?'}/>
      <ProfileMenu options={menuOptions} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <ChangeContainer>
        {renderComponent()}
      </ChangeContainer>
    </PrimaryContainer>
  );
};

export default ProfilePage;
