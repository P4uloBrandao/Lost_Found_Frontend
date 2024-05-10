import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {PasswordStrength} from '../controllers/index'
import InputF  from '../inputFieldComponent/InputField';
import styled from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';
import "../../assets/colors/colors.css"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const Container = styled.div`
  width: 180vh;
 
  margin: 5em 0;
  
  border-radius: 20px 20px 20px 20px; 
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  justify-content: flex-start; 
  box-sizing: border-box;
  border: 1px solid #D3D3D3; 
  background-color: white; 
  padding: 40px; 
`;

const InputSubmit = styled.button`

width: 100%;
  height: 40px;
  background: #c6c3c3;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--second-color);
  }
`;
const Title = styled.h2`
  font-size: 1.5rem;
  color: var(--black-color); 
  opacity: 1;
  margin-bottom: 40px; 
`;
const CategoryTitle = styled.h2`
color: #3CB684;
display :flex;
font-family: 'Roboto', sans-serif;
font-size: 24px;
font-weight: 400;
line-height: 27px;
text-align: left;

margin-top: 0px;
`;
const CategorySection = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); 
  grid-gap: 10px; 
  justify-content: center; 
  margin-bottom: 20px;
`;
const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: -webkit-fill-available;
`;
const CategoryButton = styled.button`
  width: 174px;
  height: 66px;
  padding: 16px 24px;
  border-radius: 33px;
  border: 1px solid #3CB684;
  background-color: ${props => props.isSelected ? '#3CB684' : 'white'};
  color: ${props => props.isSelected ? 'white' : 'black'};
  cursor: pointer;
  &:hover {
    background-color: #3CB684;
    color: white;
  }
  font-size: 1rem;
  opacity: 1;
`;

export default function SationComponent() {
  const [location, setObjLoc] = React.useState('');

  const [mapCenter, setMapCenter] = useState({ lat: 38.72, lng: -9.14 }); // Initial center (Lisbon)
  const libraries = ['places']; // Include places library for location search
    const [errorMessage, setErrorMessage]= useState("")
    const [stations, setStations] = React.useState('');
    const [activeButton, setActiveButton] = useState(null);
    const [category, setCategory] = React.useState('');
    const [stationName, setStationName] = React.useState('');
    const [stationId, setStationId] = React.useState('');
    const [stationNumber, setStationNumber] = React.useState('');
    const [station, setStation] = React.useState('');

    useEffect(() => {
        const fetchStations = async () => {
          try {
            const response = await axios.get('http://35.219.162.80/api/police/police-stations');
            setStations(response.data);
            console.log(response.data)
    
          } catch (error) {
            console.error('Failed to fetch stations', error);
            // Lide com erros conforme necessário
          }
        };
    
        fetchStations();
      }, []);
    const handleCreateSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://35.219.162.80/api/police/police-stations`,{
              "name": stationName,
              "address": location,
              "zip_code" : "0000-00",
              "phone_number": stationNumber,

            });
           
            
        } catch (error) {
            console.error( error);
    
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message if present in the error response
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
         window.location.reload();
    }
    const handleDeleteSubmit = async (event) => {
      console.log("stationId")
        event.preventDefault();
        try {
            const response = await axios.delete(`http://35.219.162.80/api/police/police-stations/${stationId}`);
            
            console.log(stationId)
        } catch (error) {
            console.error( error);
    
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message if present in the error response
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
         window.location.reload();
    };
    const handleStationClick = (station) => {
      setStationId(station);
      };
    const stationsArray = Object.entries(stations);
    const mapContainerStyle = {
      width: '50vw',
      height: '50vh',
        alignSelf: 'center',
    };
  
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: 'AIzaSyC6QRYQechnlxkaivlAkIyKhMcB3iGaSZM',
      libraries,
    });
  
      const handleMapClick = async (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setObjLoc({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  
        try {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC6QRYQechnlxkaivlAkIyKhMcB3iGaSZM`);
          const address = response.data.results[0].formatted_address;
          console.log('Address:', address);
          setObjLoc(address);
  
          // Faça o que você precisa com o endereço, como definir o estado
          // ou exibir em algum lugar na sua aplicação
        } catch (error) {
          console.error('Failed to fetch address:', error);
          // Lide com erros conforme necessário
        }
      };
  
    if (loadError) return <div className="contain">Error loading maps</div>;
    if (!isLoaded) return <div className="contain">Loading maps</div>;
    return (<>
        <Container>
        <Title>Add Station</Title>
            <CategoryTitle> New station to create </CategoryTitle>
            
              <InputBox>
              <InputF 
              type={'text'} 
              placeholder={'Insert new station id'}  
              id="station"
              required
              onChange={(e) => setStationName(e.target.value)}
              value={stationName}
              
              errorMessage={'invalid'}
              name="station"/>
      
       
              </InputBox>
              <InputBox>
              <InputF 
                type={'number'} 
                placeholder={'Enter station phone number'}  
                id="StationNumber"
                required
                onChange={(e) => setStationNumber(e.target.value)}
                value={stationNumber}
                name="StationNumber"
              />
            </InputBox>
        <CategoryTitle>Insert the location.</CategoryTitle>
      <InputBox>
        <InputF 
        type={'text'} 
        placeholder={'Insert location'}  
        id="location"
        required
        onChange={(e) => setObjLoc(e.target.value)}
        value={location}
        
        errorMessage={'invalid'}
        name="Location"/>

 
        </InputBox>
        <InputBox>
        <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={mapCenter}
        onClick={handleMapClick}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
      </InputBox>
          <InputSubmit type="submit" onClick={handleCreateSubmit}>
              Create
            </InputSubmit>
        
            <Title>Delete Station</Title>
        <CategoryTitle> Choose station to delete  </CategoryTitle>
        
          <InputBox>
          <CategorySection>
      {stationsArray.map(([key, value], index) => (
        <CategoryButton
          key={index}
          isSelected={stationId === value._id}
          onClick={() => handleStationClick(value._id)}
          active={activeButton === value._id}
        >
          {value.name}
        </CategoryButton>
      ))}
       
      </CategorySection>
      
        </InputBox>
        <InputSubmit type="submit" onClick={handleDeleteSubmit}>
            Delete
        </InputSubmit>
        </Container>
            
        </>
    );
}