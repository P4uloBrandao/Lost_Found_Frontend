import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './style.css';
import { useAuth } from '../../AuthContext';
import LocationOn from '@mui/icons-material/LocationOn';
import mapsIcon from './Map-location.svg';
import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, isBefore } from 'date-fns';
import { GoogleMap, useLoadScript, Marker,Circle } from '@react-google-maps/api';

// Configurar a conexão WebSocket
const socket = io('http://localhost:5000'); 

const AuctionComponent = ({ auction }) => {

  const [bidValue, setBidValue] = useState('');
  const [highestBid, setHighestBid] = useState(auction.highestBid);
  const [date] = useState(new Date(auction.endDate));
  const [coordinates, setCoordinates] = useState(auction.coordinates);

  const { authUser, token } = useAuth();
  const formattedDate = format(date, 'dd MMM yyyy HH:mm:ss z');

  const libraries = ['places']; // Include places library for location search
  const [mapCenter, setMapCenter] = useState({ lat: 38.72, lng: -9.14 }); // Initial center (Lisbon)
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [circle, setCircle] = useState(null);
 


  const mapContainerStyle = {
    width: '300px',
    height: '200px',
    alignSelf: 'center',
  };
   const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDPUTFHLcj71rpOYKfPwigaRF8uiOKDvWo',
    libraries,
  });
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

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(timer);
  }, [date]);

  useEffect(() => {
    // Entrar na sala do leilão
    socket.emit('joinAuction', auction._id);

    // Ouvir eventos de novos lances
    socket.on('newBid', (data) => {
      if (data.auctionId === auction._id) {
        // Atualizar o lance mais alto
        setHighestBid(data.bidValue);
      }
    });

    // Ouvir eventos de novos lances máximos
    socket.on('newMaxBid', (data) => {
      if (data.auctionId === auction._id) {
        // Atualizar o lance máximo
        setHighestBid(data.maxBid);
      }
    });

    // Limpar a conexão do WebSocket ao desmontar o componente
    return () => {
      socket.emit('leaveAuction', auction._id);
      socket.off('newBid');
      socket.off('newMaxBid');
    };
  }, [auction._id]);

  const handleBidChange = (event) => {
    setBidValue(event.target.value);
  };




  const placeBid = async () => {
    if (parseFloat(bidValue) > auction.price) {
      try {
        const response = await axios.post(process.env.REACT_APP_API_URL+`/api/auction/makeBid`, {
          value: bidValue,
          auction: auction._id,
          bidder: authUser._id, 
         
        });
          console.log(response);
        if (response.status === 200) {
          setBidValue('');
        }
      } catch (error) {
        console.error('Failed to place bid:', error);
      }
    }
  };
  useEffect(() => {
    const extractLatLng = (data) => {
      const parts = data.split(',');
      const latPart = parts[0].trim().split(':')[1].trim();
      const lngPart = parts[1].trim().split(':')[1].trim();

      const templat = parseFloat(latPart);
      const templng = parseFloat(lngPart);

      if (!isNaN(templat) && !isNaN(templng)) {
        setLat(templat);
        setLng(templng);
        setMapCenter({ lat: templat, lng: templng });
        setCircle({
          center: { lat: templat, lng: templng },
          radius: 500 // Define o raio do círculo em metros
        });
      }
    };

    if (coordinates) {
      extractLatLng(coordinates);
    }
    
  }, [coordinates]);
  function openGoogleMaps() {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
}
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;


  return (
    <div className="lost-item-details">
      <div className="first_row">
        <div className="lost-item-status">
          <div>
            <span className='status-title'>Highest:</span>
            <span className='status-value'>{highestBid} EUR</span>
          </div>
          <div>
            <span className='matches'>{highestBid}</span>
          </div>
          <div>
            <span className='remove-Item'>Minimum bid allowed: {auction.price} EUR</span>
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
            <span className='location-value-data'>{auction.location}</span>
          </div>
          <span className='get-coordinates'onClick={openGoogleMaps}>Get GPS coordinates</span>
        </div>
        <div className='location-image'>
        <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={18}
      center={mapCenter}
    >
      <Marker
        position={{ lat: lat, lng: lng }}
        title={auction.title}
      />
      {circle && (
        <Circle 
          center={circle.center} 
          radius={circle.radius} 
          options={{ 
            fillColor: 'rgba(255,0,0,0.2)', 
            strokeColor: 'rgba(255,0,0,1)' 
          }} 
        />
      )}
    </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default AuctionComponent;
