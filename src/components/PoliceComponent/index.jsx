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
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import PhoneIcon from '@mui/icons-material/PhoneAndroidRounded';
import MailIcon from '@mui/icons-material/MailOutlineRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import '../../assets/colors/colors.css'
import DropdownInput from "../dropdownInputComponent";
import AddressIcon from '@mui/icons-material/HomeRounded';

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: max-content;  
`;

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




export default function PoliceComponent() {
  const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [adddress, setAdddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [checkPassword, setCheckPassword] = React.useState('');
    const [birth, setBirth] = React.useState('');
    const [nic, setNic] = React.useState('');
    const [nif, setNif] = React.useState('');
    const [option, setOption] = useState("");
    const [phone, setPhone] = React.useState('');
    const [errorMessage, setErrorMessage]= useState("")
    const [stations, setStations] = React.useState('');
    const [activeButton, setActiveButton] = useState(null);
    const [category, setCategory] = React.useState('');
    const [stationName, setStationName] = React.useState('');
    const [stationId, setStationId] = React.useState('');
    const [stationNumber, setStationNumber] = React.useState('');
    const [station, setStation] = React.useState('');
    const [showPassword, setShowPassword] = useState(null); // New state for handling error messages
    const [showPassword2, setShowPassword2] = useState(null); // New state for handling error messages
    const [policeId, setPoliceId] = useState(''); // New state for handling error messages
    const [adddressError, setAdddressError ] = useState(null);
    const [zipCode, setZipCode ] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const [passwordError, setPasswordError ] = useState(null);
    const [checkPasswordError, setCheckPasswordError ] = useState(null);
function setNameOfStation(station){
  console.log(station)
  setStation(station)
}
const toggleShowPassword = () => {
  setShowPassword((prevShowPassword) => {
    const newShowPassword = !prevShowPassword;
    return newShowPassword;
  });
};
const toggleShowPassword2 = () => {
  setShowPassword2((prevShowPassword) => {
    const newShowPassword = !prevShowPassword;
    return newShowPassword;
  });
};
useEffect(() => {
    const fetchStations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/police/police-stations');
            setStations(response.data);
            setIsLoading(false);
            console.log(stations)
        } catch (error) {
            console.error('Failed to fetch stations', error);
            setError(true);
            setIsLoading(false);
        }
    };

    fetchStations();
}, []);

if (isLoading) {
    return <div>Carregando...</div>;
}

if (error) {
    return <div>Erro ao carregar as estações de polícia.</div>;
}
function  getStationID(name,stations){
    const foundItem = stations.find(item => item.name === name);
    return foundItem ? foundItem._id : null;

}
    const handleCreateSubmit = async (event) => {
        event.preventDefault();
       
        try {
            const response = await axios.post(`http://localhost:3000/api/police/police-officers`,{
              "firstName" :first_name,
              "lastName":last_name,
              "phone":phone,
              "email":email,
              
              "station" : getStationID(station,stations),
              "password": password,
              "police_id" : policeId,
              "role": "Police",
            });
           
            
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
    // const handleDeleteSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await axios.delete(`http://localhost:3000/api/police/police-stations/${stationId}`);
            
    //     } catch (error) {
    //         console.error( error);
    
    //         if (error.response && error.response.data) {
    //             setErrorMessage(error.response.data); // Set the error message if present in the error response
    //         } else {
    //             setErrorMessage("An unexpected error occurred. Please try again.");
    //         }
    //     }
    //      window.location.reload();
    // };
    
    const handleDropdownChange = (selectedOptionName) => {
      setStation(selectedOptionName)
      // Faça o que for necessário com o nome da opção selecionada
    };
    return (<Container>
      <Title>Add Police Officer</Title>
      
      
      
        
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <InputBox>
        <InputF 
          icon={<PersonOutlineRoundedIcon />} 
          type={'text'} 
          placeholder={'Enter your first name'}  
          id="first_name"
          required
          onChange={(e) => setFirstName(e.target.value)}
          name="First Name"
          value={first_name}
        />
      </InputBox>
    </Grid>
    <Grid item xs={12} sm={6}>
      <InputBox>
        <InputF 
          icon={<PersonOutlineRoundedIcon />} 
          type={'text'} 
          placeholder={'Enter your last name'}  
          id="last_name"
          required
          onChange={(e) => setLastName(e.target.value)}
          name="Last Name"
          value={last_name}
        />
      </InputBox>
    </Grid>
    <Grid item xs={12} sm={6}>
      <InputBox>
        <InputF 
          icon={<MailIcon />} 
          type={'text'} 
          placeholder={'Enter your Email'}  
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="Email"
        />
      </InputBox>
      </Grid>
    <Grid item xs={12} sm={6}>
      <InputBox>
        <InputF 
          icon={<PhoneIcon />} 
          type={'number'} 
          placeholder={'Enter your phone number'}  
          id="phone"
          required
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          name="Phone"
        />
      </InputBox>
      </Grid>
    <Grid item xs={12} sm={6}>
      <InputBox>
        <InputF 
          type={'number'} 
          placeholder={'Enter your NIF'}  
          id="nif"
          required
          onChange={(e) => setNif(e.target.value)}
          value={nif}
          name="NIF"
        />
      </InputBox>
      </Grid>
    <Grid item xs={12} sm={6}>
      <InputBox>
        <DropdownInput 
          
          placeholder={'Choose your station'}  
          id="station"
          required
          onClick = {(e) => setNameOfStation(e.target.value)}
          value={station}
          onChange={handleDropdownChange}
          name="Station"
          options={stations}
         
        />
      </InputBox>
      </Grid><Grid item xs={12} sm={3}>
      <InputBox>
        <InputF 
          
          placeholder={'****-***'}  
          id="zipcode"
          required
          onChange={(e) => setZipCode(e.target.value)}
          
          name="Zip Code"
         
        />
      </InputBox>
      </Grid>
      <Grid item xs={12} sm={3}>
      <InputBox>
        <InputF 
          
          placeholder={'Write your Policer ID'}  
          id="station"
          required
          onChange={(e) => setPoliceId(e.target.value)}
          
          name="Police ID"
         
        />
      </InputBox>
      </Grid>
      <Grid item xs={12} sm={6}>

      <InputBox>
              <InputF 
              icon={<AddressIcon />} 
              type={'text'} 
              placeholder={'Enter your Address'}  
              id="address"
              required
              onChange={(e) => setAdddress(e.target.value)}
              value={adddress}
              errorValidation={adddressError}
              errorMessage={'Endereço inválido'}
              name="Address"/>
                
                
              
         </InputBox>
         </Grid>
    <Grid item xs={12} sm={6}>

    <InputBox>

    <InputF
        icon={showPassword ? <LockIconOpen /> : <LockIcon />}

        placeholder={'Password'}
        id="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        value={password}
        name="Password"
        setShowPassword={toggleShowPassword}
        errorMessage={'Senha inválida'}
        errorValidation={passwordError}
                />
            </InputBox>
           <PasswordStrength text={password} />
           </Grid>
    <Grid item xs={12} sm={6}>

           <InputBox>
        <InputF 
        icon={showPassword2 ? <LockIconOpen /> : <LockIcon />}
        
        placeholder={'Repeat your Password'}  
        id="CheckPassword"
        required
        onChange={(e) => setCheckPassword(e.target.value)}
        type={showPassword2 ? 'text' : 'password'}
        value={checkPassword}
        name="CheckPassword"
        setShowPassword={toggleShowPassword2}
        errorMessage={'Senhas não correspondem'}
        errorValidation={checkPasswordError}
        />
        </InputBox>
        </Grid>
    <Grid item xs={12}>
      <InputBox>
        <InputSubmit onClick={handleCreateSubmit} className="input-submit" value="Register" label="Register">Save Canges</InputSubmit>
      </InputBox>
    </Grid>

  </Grid>


     
        </Container>
    );
}