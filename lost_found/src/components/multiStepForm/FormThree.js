import React, {useContext} from 'react';
import AppContext from './Context';
import './styles.css';
import { GoogleMap, LoadScript, DrawingManager } from '@react-google-maps/api';


const FormThree = () => {
    const { userDetails } = useContext(AppContext);

    const next = () => {
         userDetails.setStep(userDetails.currentPage + 1)
    };
    const back = () => {
        userDetails.setStep(userDetails.currentPage - 1)
   };

   const handleDrawingManagerLoad = drawingManager => {
    // Listen to the drawing manager's overlaycomplete event to get the selected shape
    window.google.maps.event.addListener(drawingManager, 'overlaycomplete', event => {
        if (event.type === 'polygon') {
            userDetails.userDetails.setSelectedLocation(event.overlay.getPath().getArray());
        }
    });
    };

    return (
        <div className="container">
            <p>Selecione a localização do objeto perdido</p>

            <div className="map-container">
                <LoadScript googleMapsApiKey="AIzaSyC6QRYQechnlxkaivlAkIyKhMcB3iGaSZM">
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                        zoom={15}
                        center={{ lat: -34.397, lng: 150.644 }}
                        onClick={e => userDetails.setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                    >
                        <DrawingManager
                            onLoad={handleDrawingManagerLoad}
                            options={{
                                drawingControl: true,
                                drawingControlOptions: {
                                    drawingModes: ['polygon']
                                }
                            }}
                        />
                    </GoogleMap>
                </LoadScript>
            </div>

            <button className="formSubmit" type="button" onClick={back}>Anterior</button>
            <button className="formSubmit" type="button" onClick={next}>Proximo</button>
        </div>
    );
};

export default FormThree;