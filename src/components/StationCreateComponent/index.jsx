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
import SearchInput from "../SearchInputFieldComponent/index";
import { InputSubmit, Container,InputBox ,Title,Form,CategoryTitle,CategorySection, Wrapper } from '../../assets/StylePopularComponent/style';



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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchStations = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/police/police-stations');
          setStations(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Failed to fetch stations', error);
          // Handle errors as necessary
        } finally {
          setLoading(false); // Set loading to false after the data is fetched or if an error occurs
        }
      };
  
      fetchStations();
    }, []);
    const handleCreateSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL+`/api/police/police-stations`,{
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
        //  window.location.reload();
    }
    const handleDeleteSubmit = async (event) => {

      event.preventDefault();
        try {
            const response = await axios.delete(process.env.REACT_APP_API_URL+`/api/police/police-stations/${stationId}`);
            
            
        } catch (error) {
            console.error( error);
    
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message if present in the error response
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
        //  window.location.reload();
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
      const handleDropdownChange = (selectedOptionName) => {
        setStationId(selectedOptionName)
        // Faça o que for necessário com o nome da opção selecionada
      };
      function  getStationID(name,stations){
        const foundItem = stations.find(item => item.name === name);
        return foundItem ? foundItem._id : null;
    
    }
    if (loadError) return <div className="contain">Error loading maps</div>;
    if (!isLoaded) return <div className="contain">Loading maps</div>;
    if (loading) {
      return <div>Loading...</div>; // Show a loading message or spinner while data is being fetched
    }
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
            </Container>

        <Container>
            <Title>Delete Station</Title>
            <CategoryTitle> Choose station to delete  </CategoryTitle>
            <InputBox>
            <SearchInput 
                
                placeholder={'Choose your station'}  
                id="station"
                required
                onClick = {(e) => setStationName(e.target.value)}
                value={station}
                onChange={handleDropdownChange}
                name="Station"
                options={stations}
              
              /> 
            </InputBox>
       
        <InputSubmit type="submit" onClick={handleDeleteSubmit}>
            Delete
        </InputSubmit>
        </Container>
            
        </>
    );
}