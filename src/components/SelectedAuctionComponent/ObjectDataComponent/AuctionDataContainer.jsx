import React, { useState, useEffect } from 'react';
import LostItemPicture from '../../matchItemsComponents/LostPictureComponent/LostItemPictures';
import axios from "axios";
import imageSrc from './Image.svg'; 
import { useLocation } from 'react-router-dom';
import './style.css';
import AuctionComponent from './AuctionDetailsComponent';
import LoadingSpinner from '../../LoadingPage/LoadingSpinner';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { Box } from '@mui/material';

 
const AuctionInfoComponent = ({itemid}) => {



  const [topBids, setTopBids] = useState([]);
  const [currentBidder, setCurrentBidder]= useState(null);

  useEffect(() => {
    // Função assíncrona para carregar as top 10 bids
    const fetchTopBids = async () => {
      try {
        // Substitua 'SEU_ENDPOINT_PARA_TOP_BIDS' pelo endpoint correto da sua API
        const response = await axios.get(process.env.REACT_APP_API_URL+`/api/auctions/{itemid.id}/bids/`);
        const data1=response.data
        setTopBids(data1); // Supondo que sua API retorna um array de top 10 bids
        
      } catch (error) {
        console.error('Erro ao buscar top bids:', error);
      }
    };

    fetchTopBids();
  }, [itemid.id]); // Use itemid.id como dependência para recarregar as top bids quando itemid mudar

  const location = useLocation();

  function hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = Math.imul(hash, 31) + str.charCodeAt(i) | 0;
    }
    return hash;
  }

  return (
    <div className="lost-item-container" style={{ display: 'flex',marginLeft: '5%',flexDirection: 'column', width: '90%',marginBottom:'90px' }}>
      <div style={{ display: 'flex', alignItems: 'start', marginTop: '20px', gap: '40px' }}>
        <div style={{ flex: '0 0 40%', padding: '0' }}>
          <LostItemPicture images={itemid.objectImage || []} nome={itemid.foundObjectTitle || ''} />
        </div>
        <div style={{ flex: '1 1 55%', marginTop: '1%' }}>
          <AuctionComponent auction={itemid} />
        </div>
      </div>
      <div className="lost-item-description" style={{ width: '100%', marginTop: '30px', padding: '20px' }}>
        <span className='description-title'>Description:</span>
        <p className='description-value'>{itemid.description}</p>
      </div>
      {/* Container para as top 10 bids */}
      <div className="lost-item-description" style={{ width: '100%', marginTop: '30px', padding: '20px' }}>
      <span className='description-title'>Top 10 Bids:</span>
      {itemid.bids.length!== 0? (
        <ul className='top-bids-list'>
          {itemid.bids.slice(0, 10).reverse().map((bid, index) => {
            const bidderHash = hash(bid.bidder);
            const bidderColor = `hsl(${bidderHash % 360}, 50%, 50%)`;
            return (
              <li key={index} className='top-bid-item'>
                <span className='rank'>{index + 1}{'º'}</span>
                <Box sx={{ color: bidderColor }}>
                  <PersonOutlineRoundedIcon />
                </Box>
                <span className='bid-value'>{bid.value} EUR</span>
               
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
    </div>
  );
};

export default AuctionInfoComponent;
