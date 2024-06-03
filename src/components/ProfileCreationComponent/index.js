import styled, { keyframes, css} from 'styled-components';
import React, { useState, useRef, useEffect, useContext } from 'react';
import CustomInputFiles from '../ImageInputComponent/FileInput'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { Avatar , Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Grid from '@mui/material/Grid';
import { AuthContext } from "../AuthContext";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';
import CalendarIcon from '@mui/icons-material/CalendarMonthRounded';
import MailIcon from '@mui/icons-material/MailOutlineRounded';
import PhoneIcon from '@mui/icons-material/PhoneAndroidRounded';
import AddressIcon from '@mui/icons-material/HomeRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import PopupAlert from '../PopUpAlertComponent/index.jsx';

import axios from "axios";
import {PasswordStrength} from '../controllers/index'
import InputF  from '../inputFieldComponent/InputField';
import "../../assets/colors/colors.css"
// TODO remove, this demo shouldn't need to reset the theme.
const colors = css`
  --primary-color: #c6c3c3;
  --second-color: #ffffff;
  --black-color: #000000;
`;


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;`;



const InputSubmit = styled.button`
${colors};
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
    background: var(--white-color);
  }
`;

const InputBox = styled.div`

  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 100%;
  
`;
const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const Title = styled.h2`
  color: var(--black-color);
  opacity: 1;
  text-align: left;
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  color: #3cb684;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  text-align: left !important;
  margin-top: 0px;
`;

const genders = [
    {
      value: 'male',
      label: 'male'
    },
    {
      value: 'female',
      label: 'female'
    },
    {
      value: 'undefined',
      label: 'undefined'
    },3
  ]
const defaultTheme = createTheme();
// Função para formatar a data como "DD-MM-YYYY"


export default function ProfileCreationComponent({setUserWhoFound, options}) {

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
    const [message, setMessage] = useState("");
    const [phone, setPhone] = React.useState('');
    const [showPassword, setShowPassword] = useState(null); // New state for handling error messages
    const [objectCreated, setObjectCreated] = useState("");

    const token = localStorage.getItem("token");
   
   
    const handleSubmit = async (event) => {
    
        event.preventDefault();
       
        try {
          const data1 = new FormData();
          data1.append('first_name', first_name);
          data1.append('last_name', last_name);
          data1.append('email', email);
       
          data1.append('birth', birth);
          data1.append('password', "teste1234");

          data1.append('nic', nic);
          data1.append('nif', nif);
          data1.append('phone', phone);
          data1.append('role', 'User');
          
          data1.append('status', 'active');
          const response = await axios.post("https://10.182.0.39/api/users/signup",
          data1);
          console.log(response.data._id);
          setUserWhoFound(response.data._id)
          setObjectCreated("true");
          setTimeout(() => {
            setObjectCreated("");
        }, 3000);
        } catch (error) {
            console.error("Update failed:", error);
             setObjectCreated("false")
             setTimeout(() => {
              setObjectCreated("");
          }, 3000);
             
            if (error.response && error.response.data) {
              setMessage(error.response.data.error); // Set the error message if present in the error response
            } else {
              setMessage("An unexpected error occurred. Please try again.");
            }
          }
    };


 
    if (objectCreated==="true") return <PopupAlert message={"User created"} />
    if (objectCreated==="false") return <PopupAlert message={"User not created"} />

    return (
      <>
      
      <Title>Personal Information</Title>
      <CategoryTitle>
        You can edit your personal info in the fields that are not locked anytime! Remember to save all changes
        in the end.
      </CategoryTitle>
      
        <Wrapper>
         
        <LocalizationProvider dateAdapter={AdapterDayjs}>

        
        <Form onSubmit={handleSubmit}>
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
          icon={<AddressIcon />} 
          type={'text'} 
          placeholder={'Enter your Address'}  
          id="address"
          required
          onChange={(e) => setAdddress(e.target.value)}
          value={adddress}
          name="Address"
        />
      </InputBox>
    </Grid>
    
    <Grid item xs={12} sm={3}>
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
    <Grid item xs={12} sm={3}>
      <InputBox>
        <InputF 
          icon={<MailIcon />} 
          type={'date'} 
          placeholder={'Enter birthday'}  
          id="birthday"
          required
          onChange={(e) => setBirth(e.target.value)}
          value={birth}
          name="Birthday"
        />
      </InputBox>
    </Grid>
    <Grid item xs={12} sm={3}>
      <InputBox>
        <InputF 
          type={'number'} 
          placeholder={'Enter your NIF'}  
          id="nif"
          required
          onChange={(e) => setNif(e.target.value)}
          value={nif}
          name="Nif"
        />
      </InputBox>
    </Grid>
    <Grid item xs={12} sm={3}>
      <InputBox>
        <InputF 
          type={'text'} 
          placeholder={'Enter your NIC'}  
          id="nic"
          required
          onChange={(e) => setNic(e.target.value)}
          value={nic}
          name="Nic"
        />
      </InputBox>
    </Grid>
   
    
    <Grid item xs={12}>
      <InputBox>
        <InputSubmit type="submit" className="input-submit" value="Register" label="Register">Create user</InputSubmit>
      </InputBox>
    </Grid>
  </Grid>
</Form>


      </LocalizationProvider>
      </Wrapper>
      </>
    );
}