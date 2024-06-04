import React, { useState, useEffect } from 'react';
import './style.css';
import LocationOn from '@mui/icons-material/LocationOn';
import mapsIcon from './Map-location.svg';
import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, isBefore } from 'date-fns';

const AuctionComponent = ({ auction, object }) => {
  const [bidValue, setBidValue] = useState('');
  const [highestBid, setHighestBid] = useState('No bids');
  const [date] = useState(new Date(auction.endDate));

  const formattedDate = format(date, 'dd MMM yyyy HH:mm:ss z');

  const calculateTimeLeft = () => {
    const now = new Date();

    if (isBefore(date, now)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = differenceInDays(date, now);
    const hours = differenceInHours(date, now) % 24;
    const minutes = differenceInMinutes(date, now) % 60;
    const seconds = differenceInSeconds(date, now) % 60;

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

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
            <span className='matches'>{highestBid}</span>
          </div>
          <div>
            <span className='remove-Item'>Minimum bid allowed:{object.price} EUR</span>
          </div>
        </div>
        <div className="lost-item-status">
          <div>
            <span className='status-title'>Ends in:</span>
          </div>
          <div>
            <span className='matches'>{`${timeLeft.days} Days ${timeLeft.hours} Hours ${timeLeft.minutes} Minutes ${timeLeft.seconds} Seconds`}</span>
          </div>
          <div>
            <span className='remove-Item'>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="value-select">
        <span>Bid</span>
        <input type="number" id="bid-value" min="1" value={bidValue} onChange={handleBidChange} placeholder="Select Bid Value" />
        <button className='button-bid' type="button" onClick={placeBid}>Place a Bid</button>
      </div>

      <div className="lost-item-location">
        <div className='location-data'>
          <span className='location-title'>Location</span>
          <div className='location-value'>
            <span className='location-icon'><LocationOn /></span>
            <span className='location-value-data'>{object.location}</span>
          </div>
          <span className='get-coordinates'>Get GPS coordinates</span>
        </div>
        <div className='location-image'>
          <img src={mapsIcon} alt="maps" />
        </div>
      </div>
    </div>
  );
};

export default AuctionComponent;
