import React, { useEffect, useState } from 'react';
import './LostItemDetails.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOn from '@mui/icons-material/LocationOn';
import mapsIcon from './Map-location.svg'
import { GoogleMap, useLoadScript, Marker,Circle } from '@react-google-maps/api';


const LostItemDetails = ({ status, description, location, category, lost_date, enddate, coordinates, matchesNumber }) => {
  const [dataItem, setDataItem] = useState([status, description, location, category, lost_date, enddate, coordinates,matchesNumber]);
  const [mapCenter, setMapCenter] = useState({ lat: 38.72, lng: -9.14 }); // Initial center (Lisbon)
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [circle, setCircle] = useState(null);
  
  const libraries = ['places']; // Include places library for location search

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDPUTFHLcj71rpOYKfPwigaRF8uiOKDvWo',
    libraries,
  });

  const mapContainerStyle = {
    width: '300px',
    height: '200px',
    alignSelf: 'center',
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
            <span className='status-title'>Status:</span>
            <span className='status-value'>{dataItem[0]}</span>
          </div>
          <div>
            <span className='matches'>{matchesNumber} Matches Found</span>
          </div>
          <div>
            <span className='remove-Item'>Remove Item</span>
          </div>
        </div>
        <div className="lost-item-status">
          <div>
            <span className='status-title'>Category:</span>
            <span className='status-value'>{dataItem[3]}</span>
          </div>
          <div>
            <span className='matches'>Lost Date: {dataItem[4]}</span>
          </div>
          <div>
            <span className='remove-Item'>End Date: {dataItem[5]}</span>
          </div>
        </div>
      </div>

      <div className="lost-item-location">
        <div className='location-data'>
          <span className='location-title'>Location</span>
          <div className='location-value'>
            <span className='location-icon'><LocationOn /></span>
            <span className='location-value-data'>{dataItem[2]}</span>
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
        title={dataItem[2]}
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

      <div className="lost-item-description">
        <span className='description-title'>Description:</span>
        <p className='description-value'>{dataItem[1]}</p>
      </div>
    </div>
  );
};

export default LostItemDetails;