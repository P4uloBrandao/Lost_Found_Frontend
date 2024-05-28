import React from 'react';
import WelcomeHeaderComponent from '../../components/headerWithNameComponent/welcomeHeader.jsx'
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext.jsx'

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function Home() {
  const { authUser } = useAuth();
  const location = useLocation();

  // Verifica se authUser não é undefined antes de renderizar o componente
  const formattedName = authUser ? capitalizeFirstLetter(authUser.first_name) : null;
 
  return (
    <div>
      {/* Renderiza o componente somente se authUser não for undefined */}
      {authUser !== undefined && (
        <WelcomeHeaderComponent name={formattedName} description={'Did you know that over 30 million wallets are lost every year?'}/>
      )}
    </div>
  );
}
