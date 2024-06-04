import React, { useState, useEffect } from 'react';
import LostItemDetails from './LostItemDetails/LostItemDetails';
import LostItemPicture from './LostPictureComponent/LostItemPictures';
import axios from "axios";
import imageSrc from './LostPictureComponent/Image.svg'; 
import LostItemHeader from './LostItemHeader/LostItemHeader';
import MatchFoundComponent from './MatchFoundComponent';
import LoadingSpinner from '../LoadingPage/LoadingSpinner';

const LostItemComponent = ({ itemid }) => {
  const [lostObject, setLostObject] = useState(null);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLostObjectAndMatches = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const objectResponse = await axios.get(`http://localhost:3000/api/lost-objects/${itemid}`);
        setLostObject(objectResponse.data);

        const matchesResponse = await axios.post(`http://localhost:3000/api/match`, {
          lostObjectId: itemid
        });
        setMatches(matchesResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };


    fetchLostObjectAndMatches();
  }, [itemid]);


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Erro ao carregar dados. (Error loading data.)</div>;
  }

  if (!lostObject) {
    return <div>Objeto perdido não encontrado. (Lost object not found.)</div>;
  }

  return (
    <div className="lost-item-container" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <LostItemHeader title={lostObject.title} />
      <div style={{ display: 'flex', alignItems: 'start', marginTop: '20px', gap: '40px' }}>
        <div style={{ flex: '0 0 40%', padding: '0' }}>
          <LostItemPicture images={lostObject.objectImage ? [lostObject.objectImage] : []} nome={lostObject.title} />
        </div>
        <div style={{ flex: '1 1 55%', marginTop: '1%' }}>
          <LostItemDetails status={lostObject.status} description={lostObject.description} location={lostObject.location} />
        </div>
      </div>
      <MatchFoundComponent matches={matches} />
    </div>
  );
};

export default LostItemComponent;
