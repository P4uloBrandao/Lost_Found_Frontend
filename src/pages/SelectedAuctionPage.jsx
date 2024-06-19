import React from 'react';
import styled from 'styled-components';
import AuctionHeaderComponent from '../components/SelectedAuctionComponent/BannerComponent/auctionHeader.jsx';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';
import AuctionInfoComponent from '../components/SelectedAuctionComponent/ObjectDataComponent/AuctionDataContainer.jsx'


const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function SelectedAuctionPage() {
    const { authUser } = useAuth();
    const location = useLocation();
  
    // Verifica se authUser não é undefined antes de renderizar o componente
    const formattedName = authUser ? capitalizeFirstLetter(authUser.first_name) : null;
   
    return (
      <div>
        {/* Renderiza o componente somente se authUser não for undefined */}
        {authUser !== undefined && (
          <AuctionHeaderComponent name={formattedName} />
        )}
          <AuctionInfoComponent/>
      </div>
    );
}
