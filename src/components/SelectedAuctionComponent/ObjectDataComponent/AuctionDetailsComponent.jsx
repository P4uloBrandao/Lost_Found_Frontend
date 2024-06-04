import React, { useState } from 'react';
import './style.css';
import LocationOn from '@mui/icons-material/LocationOn';
import mapsIcon from './Map-location.svg';

import InputF from '../../inputFieldComponent/InputField';

const AuctionComponent = () => {
  const [bidValue, setBidValue] = useState('');
  const [highestBid, setHighestBid] = useState('No bids');

  const handleBidChange = (event) => {
    setBidValue(event.target.value);
  };

  const placeBid = () => {
    if (parseFloat(bidValue) > 6) {
      setHighestBid(bidValue);
      setBidValue('');
    }
  };

  return (
    <div className="lost-item-details">
    <div className="first_row">
    <div className="lost-item-status">
      <div>
        <span className='status-title'>Highest:</span>
        <span className='status-value'>300 EUR</span>
      </div>
      <div>
        <span className='matches'>No Bids</span>
      </div>
      <div>
          <span className='remove-Item'>Minimium bid a allowed: 6 EUR</span>
      </div>
    </div>
    <div className="lost-item-status">
      <div>
        <span className='status-title'>Ends in:</span>
      </div>
      <div>
        <span className='matches'>9 Days</span>
      </div>
      <div>
          <span className='remove-Item'>30 Mar 2024 at 19:00 CET</span>
      </div>
    </div>
    </div>



    <div class="value-select">
        <span>Bid</span>
        <input type="number" id="bid-value" min="1"  placeholder="Select Bid Value"/>
        <button className='button-bid' type="button">Place a Bid</button>
    </div>



    <div className="lost-item-location">
      <div className='location-data'>
        <span className='location-title'>Location</span>
        <div className='location-value'>
          <span className='location-icon'><LocationOn/></span>
          <span className='location-value-data'>Rua fernando magalhaes</span>
        </div>
        <span className='get-coordinates'>Get GPS coordinates</span>
      </div>
      <div className='location-image'>
        <img src={mapsIcon} alt="maps" />
      </div>
    
    </div>


    {/* Lost item location */}
 
</div>
  );
};



export default AuctionComponent;
