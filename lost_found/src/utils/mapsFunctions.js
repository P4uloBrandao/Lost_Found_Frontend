import React from 'react';
import { GoogleMap, LoadScript, DrawingManager } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '100vh',
    width: '100%'
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734
  };

  const handlePolygonComplete = (polygon) => {
    const coordinates = polygon.getPath().getArray().map(coord => `${coord.lat()},${coord.lng()}`);
    const locationString = coordinates.join(';'); 
    console.log('Polygon coordinates:', locationString);
  };
  
  const handleMarkerComplete = (marker) => {
    const { lat, lng } = marker.getPosition().toJSON();
    const locationString = `${lat},${lng}`;
    console.log('Marker coordinates:', locationString);
  };
  return (
    <LoadScript
      googleMapsApiKey="SUA_CHAVE_DA_API_DO_GOOGLE_MAPS"
      libraries={['drawing']}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        <DrawingManager
          onPolygonComplete={handlePolygonComplete}
          onMarkerComplete={handleMarkerComplete}
          drawingControlOptions={{
            drawingModes: ['polygon', 'marker'],
            position: google.maps.ControlPosition.TOP_CENTER,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
