import React, { useEffect, useState } from 'react';
import './LostItemDetails.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOn from '@mui/icons-material/LocationOn';
import mapsIcon from './Map-location.svg'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const LostItemDetails = ({status,description,location,categoy,lost_date,enddate, coordinates }) => {
  const [dataItem, setDataItem]=useState([status,description,location,categoy,lost_date,enddate,coordinates])
  const [mapCenter, setMapCenter] = useState({ lat: 38.72, lng: -9.14 }); // Initial center (Lisbon)
  const libraries = ['places']; // Include places library for location search
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = React.useState('');

  const [lng, setLng] = React.useState('');
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
      const latPart = parts[0].trim();
      const lngPart = parts[1].trim();

      const lat = parseFloat(latPart.split(':')[1].trim());
      const lng = parseFloat(lngPart.split(':')[1].trim());
      setLat(lat.toString());
      setLng(lng.toString());
      
      setMapCenter({ lat:lat.toString(), lng:lng.toString() });
    };

    if (coordinates) {
      extractLatLng(coordinates);
    }
  }, [coordinates]);
  
  
  return (
    <div className="lost-item-details">
      <div className="first_row">
      <div className="lost-item-status">
        <div>
          <span className='status-title'>Status:</span>
          <span className='status-value'>{dataItem[0]}</span>
        </div>
        <div>
          <span className='matches'>10 Matches Found</span>
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
          <span className='matches'>Lost Date:{dataItem[4]}</span>
        </div>
        <div>
            <span className='remove-Item'>End Date: {dataItem[4]}</span>
        </div>
      </div>
      </div>


      <div className="lost-item-location">
        <div className='location-data'>
          <span className='location-title'>Location</span>
          <div className='location-value'>
            <span className='location-icon'><LocationOn/></span>
            <span className='location-value-data'>{dataItem[2]}</span>
          </div>
          <span className='get-coordinates'>Get GPS coordinates</span>
        </div>
        <div className='location-image'>
          {/* <img src={mapsIcon} alt="maps" /> */}
          <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={mapCenter}
    >
      
        <Marker
          position={{ lat: lat.toString(), lng: lng.toString() }}
          title={location.address}
        />
      
    </GoogleMap>
        </div>
      
      </div>


        <div className="lost-item-description">
          <span className='description-title'>Description:</span>
          <p className='description-value'>{dataItem[1]}</p>
        </div>

      



      {/* Lost item location */}
   
  </div>
  );
};

export default LostItemDetails;
