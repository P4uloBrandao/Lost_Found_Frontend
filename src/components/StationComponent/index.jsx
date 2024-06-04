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
import { InputSubmit, Container,CategoryTitle,InputBox, CategorySection,Title } from '../../assets/StylePopularComponent/style';
import SearchInput from "../SearchInputFieldComponent/index";
import DropdownInput from "../dropdownInputComponent/index";




const CategoryButton = styled.button`
  width: 174px;
  height: 66px;
  padding: 16px 24px;
  border-radius: 33px;
  border: 1px solid var(--primary-green-color);
  background-color: ${props => props.isSelected ? 'var(--primary-green-color)' : 'var(--white-color)'};
  color: ${props => props.isSelected ? 'var(--white-color)' : 'var(--black-color)'};
  cursor: pointer;
  &:hover {
    background-color: var(--primary-green-color);
    color: var(--white-color);
  }
  font-size: 1rem;
  opacity: 1;
`;

export default function StationComponent() {
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
    const [isLoading, setIsLoading] = useState(true);
    const [placeholderSearch, setPlaceholder] = useState(true);

    useEffect(() => {
        const fetchStations = async () => {
          try {
            const response = await axios.get('https://bidfinderbackend.ddns.net/api/police/police-stations');
            setStations(response.data);
            console.log(response.data)
            setIsLoading(false);
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
            const response = await axios.put(`https://bidfinderbackend.ddns.net/api/police/police-officers/${getStationID(stationName,stations)}`);
            console.log(response.data);
            
        } catch (error) {
            console.error( error);
    
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message if present in the error response
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
        //  window.location.reload();
    }
    const handleDropdownChange = (selectedOptionName) => {
      setStationName(selectedOptionName)
      // Faça o que for necessário com o nome da opção selecionada
    };
    function  getStationID(id,stations){
      const foundItem = stations.find(item => item._id === id);
      return foundItem ? foundItem._id : null;
    }
    const handleStationClick = (station) => {
      setStationId(station);
      };
    const stationsArray = Object.entries(stations);
    if (isLoading) {
      return <div>Carregando...</div>;
    }
  
    return (<>
        <Container>
        <Title>Change your station</Title>
            <CategoryTitle> Choose new station  </CategoryTitle>
            <InputBox>
            
            {/* <DropdownInput 
                
                placeholder={'Choose your station'}  
                id="station"
                required
                onClick = {(e) => setStationName(e.target.value)}
                value={station}
                onChange={handleDropdownChange}
                name="Station"
                options={stations}
              
              /> */}
           
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
        
          <InputSubmit type="submit" onClick={handleCreateSubmit}>
              Update station
            </InputSubmit>
            </Container>
           
            
        </>
    );
}