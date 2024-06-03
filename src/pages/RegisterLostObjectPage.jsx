import React, { useState } from 'react';
import axios from "axios";

import styled, { keyframes } from 'styled-components';

import AddLostObjectComponent  from '../components/AddLostObjectComponent' ; 
import WelcomeHeaderComponent from '../components/headerWithNameComponent/welcomeHeader.jsx';

import "./LoginPage.css"
import  '../assets/colors/colors.css' ; 

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


export default function RegisterLostObjectPage() {

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

  return (
    <PrimaryContainer>
      {/* Renderizar o componente Menu com as opções */}
      <WelcomeHeaderComponent name={user} description={'At bidfind.er we believe that nothing is trully lost, never lose your hope!'}/>
      <ChangeContainer>
         <AddLostObjectComponent />
      </ChangeContainer>
    </PrimaryContainer>
  );
};
