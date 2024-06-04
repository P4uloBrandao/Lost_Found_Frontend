import {React,useState,Navigate} from 'react';
import WelcomeHeaderComponent from '../../components/headerWithNameComponent/welcomeHeader.jsx'
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext.jsx'
import axios
 from 'axios';
import styled from 'styled-components';

const token = localStorage.getItem("token");


const PrimaryContainer = styled.div`
  margin: 0.1em 7em;
  text-align: -webkit-center;
  place-content: center;
`;




function Home() {
    const [user, setUser] = useState('');
    const { setAuthUser, authUser, isLoggedIn, setIisLoggedIn,token,loading } = useAuth();

    if (loading) {
     return null;
    }
  
    if (!token) {
      setUser("there");
    }

    else{
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
      <Navigate to="/profile" replace />;
    }
  
    return(
    <PrimaryContainer>
     
      <WelcomeHeaderComponent name={user} description={'Welcome to bidfind.er! Lets get you started!'}/>
      
    </PrimaryContainer>
    );
  }
  
  export default Home;

