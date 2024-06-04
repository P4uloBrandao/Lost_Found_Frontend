import React, { useState, useEffect } from 'react';
import LostItemPicture from '../../matchItemsComponents/LostPictureComponent/LostItemPictures';
import axios from "axios";
import imageSrc from './Image.svg'; 
import './style.css';
import AuctionComponent from './AuctionDetailsComponent';


const AuctionInfoComponent = () => {
  const [lostObject, setLostObject] = useState(null);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 
  return (
    <div className="lost-item-container" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'start', marginTop: '20px', gap: '40px' }}>
        <div style={{ flex: '0 0 40%', padding: '0' }}>
          <LostItemPicture images={[imageSrc]} nome={'Wallet'} />
        </div>
        <div style={{ flex: '1 1 55%', marginTop: '1%' }}>
         <AuctionComponent/>
        </div>
      </div>
      <div className="lost-item-description"  style={{width: '100%', marginTop:'30px', padding:'20px'}}>
          <span className='description-title'>Description:</span>
          <p className='description-value'>Black Mont Blanc leather wallet exudes elegance with its sleek design and iconic emblem. Crafted for durability and style, it offers practical organization for essentials.</p>
      </div>
    
    </div>
  );
};

export default AuctionInfoComponent;
