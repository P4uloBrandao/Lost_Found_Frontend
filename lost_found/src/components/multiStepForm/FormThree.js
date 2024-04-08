import React, { useContext, useState, useEffect } from 'react';
import AppContext from './Context';
import './styles.css';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places']; // Include places library for location search

const FormThree = () => {
  const { userDetails } = useContext(AppContext);
  const [mapCenter, setMapCenter] = useState({ lat: 38.72, lng: -9.14 }); // Initial center (Lisbon)


  const next = () => {
    userDetails.setStep(userDetails.currentPage + 1);
  };
  const back = () => {
    userDetails.setStep(userDetails.currentPage - 1);
  };

  const mapContainerStyle = {
    width: '50vw',
    height: '50vh',
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC6QRYQechnlxkaivlAkIyKhMcB3iGaSZM',
    libraries,
  });

  const handleMapClick = (event) => {
    userDetails.setLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  if (loadError) return <div className="contain">Error loading maps</div>;
  if (!isLoaded) return <div className="contain">Loading maps</div>;

  return (
    <div className="contain">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={mapCenter}
        onClick={handleMapClick}
      >
        {userDetails.location && <Marker position={userDetails.location} />}
      </GoogleMap>
      {/* Display selected location coordinates (optional) */}
      {userDetails.location && (
        <p>
          Selected Location: {`lat: ${userDetails.location.lat}, lng: ${userDetails.location.lng}`}
        </p>
      )}
      <button className="formSubmit" type="button" onClick={back}>
        Anterior
      </button>
      <button
        className="formSubmit"
        type="button"
        onClick={() => {
          // Update user details with selected location in context
          userDetails.setLocation(userDetails.location);
          next();
        }}
        disabled={!userDetails.location}
      >
        Próximo
      </button>
    </div>
  );
};

export default FormThree;
