import React, { useState, useEffect } from 'react';
import LostItemPicture from '../../matchItemsComponents/LostPictureComponent/LostItemPictures';
import axios from "axios";
import imageSrc from './Image.svg'; 
import { useLocation } from 'react-router-dom';
import './style.css';
import AuctionComponent from './AuctionDetailsComponent';
import LoadingSpinner from '../../LoadingPage/LoadingSpinner';

const AuctionInfoComponent = () => {
  const [selectedAuction, setselectedAuction] = useState(null);
  const [foundObject, setfoundObject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const itemid = searchParams.get('param1');

  useEffect(() => {
    const fetchAuction = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const objectResponse = await axios.get(`http://localhost:3000/api/auction/${itemid}`);
        console.log(objectResponse);
        
        const auctionData = objectResponse.data; // Armazena a resposta em uma variável temporária
        setselectedAuction(auctionData); // Atualiza o estado com a resposta
        
        const detailedObjectResponse = await axios.get(`http://localhost:3000/api/found-objects/${auctionData.foundObject}`);
        console.log(detailedObjectResponse);
        const objectFound=detailedObjectResponse.data;
        setfoundObject(objectFound);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuction();
  }, [itemid]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Erro ao carregar dados. (Error loading data.)</div>;
  }

  if (!selectedAuction) {
    return <div>Objeto perdido não encontrado. (Lost object not found.)</div>;
  }
 
  return (
    <div className="lost-item-container" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'start', marginTop: '20px', gap: '40px' }}>
        <div style={{ flex: '0 0 40%', padding: '0' }}>
          <LostItemPicture images={foundObject?.objectImage || []} nome={foundObject?.title || ''} />
        </div>
        <div style={{ flex: '1 1 55%', marginTop: '1%' }}>
          <AuctionComponent auction={selectedAuction} object={foundObject} />
        </div>
      </div>
      <div className="lost-item-description" style={{ width: '100%', marginTop: '30px', padding: '20px' }}>
        <span className='description-title'>Description:</span>
        <p className='description-value'>{foundObject.description}</p>
      </div>
    </div>
  );
};

export default AuctionInfoComponent;
