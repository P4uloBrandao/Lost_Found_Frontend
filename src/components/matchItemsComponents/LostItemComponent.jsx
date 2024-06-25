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
        const objectResponse = await axios.get(process.env.REACT_APP_API_URL+`/api/lost-objects/${itemid}`);
        const auctionData = objectResponse.data;
        console.log(auctionData);
        setLostObject(auctionData);


        const matchesResponse = await axios.post(process.env.REACT_APP_API_URL+'/api/match/', { lostObjectId: itemid });
        const matchesData = matchesResponse.data;
        console.log(matchesData);
        setMatches(matchesData);

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
    <div className="lost-item-container" style={{ display: 'flex',flexDirection: 'column', width: '96%' }}>
      <LostItemHeader title={lostObject.title} />
      <div style={{ display: 'flex', alignItems: 'start', marginTop: '20px', gap: '40px' }}>
        <div style={{ flex: '0 0 40%', padding: '0' }}>
          <LostItemPicture images={lostObject.objectImage ? [lostObject.objectImage] : []} nome={lostObject.title} />
        </div>
        <div style={{ flex: '1 1 55%', marginTop: '1%' }}>
          <LostItemDetails status={lostObject.status} description={lostObject.description} location={lostObject.location} categoy={lostObject.category} lost_date ={lostObject.lostDate} enddate={lostObject.endDate} coordinates={lostObject.coordinates} matchesNumber={matches.length}/>
        </div>
      </div>
      {matches.length !==0 ? <MatchFoundComponent matches={matches} lostObject={lostObject.object_id}/> : null}

    </div>
  );
};

export default LostItemComponent;
