import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';

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

import '../../assets/colors/colors.css'
import SearchInput from "../SearchInputFieldComponent";
import AddressIcon from '@mui/icons-material/HomeRounded';
import { InputSubmit, Container,InputBox ,Title,Form, Wrapper } from '../../assets/StylePopularComponent/style';
import Loader from '../LoadingComponent/index';
import { useAuth } from '../AuthContext';
import {
    checkIfEmailExists,
    isValidPhoneNumber,
    validateEmail, validateNif, validateNic
} from "../../utils/inputValidations";



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


const ErrorMessage= styled.p `
  color: #ad0000;
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  padding-right: 15px;
  margin-top: 5px;
  text-align: end;
  width: 100%;
  `





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
    const { setAuthUser, authUser, isLoggedIn, setIsLoggedIn, logout, userRole } = useAuth();


    // Validations
    const [firstNameError, setFirstNameError ] = useState(false);
    const [lastNameError, setLastNameError ] = useState(false);
    const [emailError, setEmailError ] = useState(false);
    const [addressError, setAddressError ] = useState(false);
    const [passwordError, setPasswordError ] = useState(false);
    const [checkPasswordError, setCheckPasswordError ] = useState(false);
    const [nifError, setNifError ] = useState(false);
    const [phoneError, setPhoneError ] = useState(false);
    const [nicError, setNicError ] = useState(null);
    const [policeIdError, setPoliceIdError] = useState('');
    const [stationError, setStationError] = React.useState('');

    const validationSetter= [ setFirstNameError, setLastNameError, setEmailError, setAddressError, setPasswordError, setCheckPasswordError, setNifError, setPhoneError, setNicError, setPoliceIdError, setStationError]

    const clearErrors = () => {
        for (let i = 0; i < validationSetter.length; i++) {
            validationSetter[i](false);
        }
    }

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
        } catch (error) {
            console.error('Failed to fetch stations', error);
            setError(true);
            setIsLoading(false);
        }
    };

    fetchStations();
}, []);

if (isLoading) {
    return <Loader/>;
}

if (error) {
    return <div>Erro ao carregar as estações de polícia.</div>;
}
function  getStationID(name,stations){
    const foundItem = stations.find(item => item.name === name);
    return foundItem ? foundItem._id : null;

}

async function validateForm() {

    let isValid= true;
    const emailExists = await checkIfEmailExists(email);

    if (email==='' || !validateEmail(email) || emailExists['exist'] ) {
        setEmailError(true);
        isValid = false;
    }

    if (first_name === '') {
        setFirstNameError(true);
        isValid = false;
    }

    if (last_name === '') {
        setLastNameError(true);
        isValid = false;
    }

    if (password==='') {
        setPasswordError(true);
        isValid = false;
    }

    if (checkPassword === '' || checkPassword !== password) {
        setCheckPasswordError(true);
        isValid = false;
    }

    if (adddress==='') {
        setAddressError(true);
        isValid = false;
    }

    if (!isValidPhoneNumber(phone) ) {
        setPhoneError(true);
        isValid = false;
    }

    if (!validateNif(nif) ) {
        setNifError(true);
        isValid = false;
    }

    if (!validateNic(nic) ) {
        setNicError(true);
        isValid = false;
    }
    if (!station) {
        setStationError(true);
        isValid = false;
    }

    if (policeId==='') {
        setPoliceIdError(true);
        isValid = false;
    }

    return isValid;
}
    const handleCreateSubmit = async (event) => {
        clearErrors();
        event.preventDefault();
       
        try {

            const isValid = await validateForm();
            if (!isValid) {
                return;
            }
            const response = await axios.post(process.env.REACT_APP_API_URL+`/api/police/police-officers`,{
              "firstName" :first_name,
              "lastName":last_name,
              "phone":phone,
              "email":email,
              "nif":nif,
              "nic":nic,
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
          // window.location.reload();
    }
    // const handleDeleteSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await axios.delete(process.env.REACT_APP_API_URL+`/api/police/police-stations/${stationId}`);
            
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
          errorValidation={firstNameError}
          errorMessage={'First Name is required'}
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
            errorValidation={lastNameError}
            errorMessage={'Last Name is required'}
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
            errorValidation={emailError}
            errorMessage={'Email is invalid or already exists'}
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
            errorValidation={phoneError}
            errorMessage={'Phone number is invalid'}
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
            errorValidation={nifError}
            errorMessage={'NIF is invalid'}
        />
      </InputBox>
      </Grid>
    <Grid item xs={12} sm={6}>
      <InputBox>
        <SearchInput 
          
          placeholder={'Choose your station'}  
          id="station"
          required
          onClick = {(e) => setNameOfStation(e.target.value)}
          onChange={handleDropdownChange}
          name="Station"
          options={stations}
          field_name="id"
        />
      </InputBox>

        {stationError && <ErrorMessage>Station is required</ErrorMessage>}
      </Grid><Grid item xs={12} sm={3}>
      <InputBox>
        <InputF 
          placeholder={'Enter your Nic'} 
          id="nic"
          required
          onChange={(e) => setNic(e.target.value)}
          value={nic}
          name="NIC"
          errorValidation={nicError}
          errorMessage={'Nic is invalid'}
         
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
            errorValidation={policeIdError}
            errorMessage={'Police ID is invalid'}
         
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
              name="Address"
              />
                
                
              
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