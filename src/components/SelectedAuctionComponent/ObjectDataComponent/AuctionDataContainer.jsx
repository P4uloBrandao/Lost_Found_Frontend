import React, { useState, useEffect } from 'react';
import LostItemPicture from '../../matchItemsComponents/LostPictureComponent/LostItemPictures';
import axios from "axios";
import imageSrc from './Image.svg'; 
import { useLocation } from 'react-router-dom';
import './style.css';
import AuctionComponent from './AuctionDetailsComponent';
import LoadingSpinner from '../../LoadingPage/LoadingSpinner';

const AuctionInfoComponent = ({itemid}) => {
  const [selectedAuction, setselectedAuction] = useState(itemid);
  const [foundObject, setfoundObject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);


  if (!selectedAuction) {
    return <div>Objeto perdido não encontrado. (Lost object not found.)</div>;
  }
 
  return (
    <div className="lost-item-container" style={{ display: 'flex',marginLeft: '5%',flexDirection: 'column', width: '90%',marginBottom:'90px' }}>
      <div style={{ display: 'flex', alignItems: 'start', marginTop: '20px', gap: '40px' }}>
        <div style={{ flex: '0 0 40%', padding: '0' }}>
          <LostItemPicture images={selectedAuction.objectImage || []} nome={selectedAuction.foundObjectTitle || ''} />
        </div>
        <div style={{ flex: '1 1 55%', marginTop: '1%' }}>
          <AuctionComponent auction={selectedAuction} />
        </div>
      </div>
      <div className="lost-item-description" style={{ width: '100%', marginTop: '30px', padding: '20px' }}>
        <span className='description-title'>Description:</span>
        <p className='description-value'>{selectedAuction.description}</p>
      </div>
    </div>
  );
};

export default AuctionInfoComponent;
