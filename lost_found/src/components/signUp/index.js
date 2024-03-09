import * as React from 'react';
import  { useState } from "react";
import styled, { keyframes, css} from 'styled-components';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { Avatar , Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Grid from '@mui/material/Grid';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';
import CalendarIcon from '@mui/icons-material/CalendarMonthRounded';
import MailIcon from '@mui/icons-material/MailOutlineRounded';
import PhoneIcon from '@mui/icons-material/PhoneAndroidRounded';
import AddressIcon from '@mui/icons-material/HomeRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';

import axios from "axios";
import {PasswordStrength} from '../controllers/index'
import InputF  from '../inputFieldComponent/InputField';
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
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  background-image : url("../../assets/background/bg-photo.jpg")
`;
const FormBox = styled.div`
${colors}
  position: relative;
  max-width: 450px;
  width: 65%;
    backdrop-filter: blur(25px);
  border: 2px solid var(--primary-color);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 7.5em 3em 3em 2.5em;
  color: var(--second-color);
`;
const FormHeader = styled.div`
  ${colors} 
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  width: 140px;
  height: 70px;
  border-radius: 0 0 20px 20px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    width: 30px;
    height: 30px;
    background: transparent;
  }

  &:before {
    left: -30px;
    border-top-right-radius: 50%;
    box-shadow: 15px 0 0 0 var(--primary-color);
  }

  &:after {
    right: -30px;
    border-top-left-radius: 50%;
    box-shadow: -15px 0 0 0 var(--primary-color);
  }
`;
const InputSubmit = styled.button`
${colors}  
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
const Register = styled.div`
  text-align: center;
`;

const RegisterLink = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: var(--second-color);
  &:hover {
    text-decoration: underline;
`;
const FormHeaderText = styled.span`
${colors}
font-size: 30px;
  color: var(--black-color);
`;
const InputBox = styled.div`

  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  
`;
const Form = styled.form`
  display: grid;
  gap: 20px;
`;
const Formbox = styled.div`
borderRadius: '10px',
marginTop: 8,
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
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


export default function SignUp() {
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

    const formatDate = (inputDate) => {
        const dateObject = new Date(inputDate);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${day}-${month}-${year}`;
      };
    const handleChange = (value) => console.log(value);

    const toggleShowPassword = () => {
      setShowPassword((prevShowPassword) => {
        const newShowPassword = !prevShowPassword;
        console.log('New showPassword state:', newShowPassword);
        return newShowPassword;
      });
    };

    const handleSubmit = async (event) => {
    
        event.preventDefault();
        const data1 = new FormData();
        data1.append('first_name', first_name);
        data1.append('last_name', last_name);
        data1.append('email', email);
        data1.append('adddress', adddress);
        data1.append('password', password);
        data1.append('birth', birth);
        data1.append('gender', gender);
        data1.append('nic', nic);
        data1.append('nif', nif);
        data1.append('phone', phone);
        
            
        for (const pair of data1.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        try {
            const response = await axios.post("http://localhost:3000/api/users/signup",
            {   first_name,
                last_name,
                email,
                adddress,
                password,
                birth,
                gender,
                phone,
                nic,
                nif

            });
            
            console.log(response.data)
          } catch (error) {
            console.error("Registration failed:", error);
             
             
            if (error.response && error.response.data) {
              setMessage(error.response.data.error); // Set the error message if present in the error response
            } else {
              setMessage("An unexpected error occurred. Please try again.");
            }
          }
    };

    return (
        <Wrapper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

        <FormBox>
      <FormHeader>
        <FormHeaderText>Sign Up</FormHeaderText>
      </FormHeader>
        
      <Form  onSubmit={handleSubmit} >
        <Grid  spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputBox >
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
        <Grid item xs={12} >
        <InputBox>
        <InputF 
        icon={<MailIcon />} 
        type={'text'} 
        placeholder={'Enter your Email'}  
        id="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="Email"/>
        </InputBox>
        </Grid>
        <Grid item xs={12}>
           <PasswordStrength placeholder="password" onChange={handleChange} />
             </Grid>
        <Grid item xs={12}>
        <InputBox>
        <InputF 
        icon={showPassword ? <LockIconOpen /> : <LockIcon />}
        
        placeholder={'Repeat your Password'}  
        id="email"
        required
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        value={password}
        name="Password"
        setShowPassword={toggleShowPassword}
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
        name="Phone"/>
          
        </InputBox>
        </Grid>
        <Grid item xs={12} sm={6}>
        <InputBox>
        <InputF 
        icon={<MailIcon />} 
        type={'date'} 
        placeholder={'Enter birthday'}  
        id="birthday"
        required
        onChange={(e) => setBirth(e.target.value)}
        value={birth}
        name="Birthday"/>

 
        </InputBox>
        </Grid>
        <Grid item xs={12} >
            <InputBox>
        <InputF 
        icon={<AddressIcon />} 
        type={'text'} 
        placeholder={'Enter your Address'}  
        id="address"
        required
        onChange={(e) => setAdddress(e.target.value)}
        value={adddress}
        name="Address"/>
          
          
        
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
        name="Nif"/>
          
          
        
        </InputBox>
        </Grid>
        <Grid item xs={12} sm={6}>
        <InputBox>
        <InputF 
        type={'number'} 
        placeholder={'Enter your NIC'}  
        id="nic"
        required
        onChange={(e) => setNic(e.target.value)}
        value={nic}
        name="Nic"/>
          
        
        </InputBox>
        </Grid>


        <InputBox>
          <InputSubmit type="submit" className="input-submit" value="Register" label="Register">Submit</InputSubmit>
        </InputBox>
        <Register>
          <span>
            
            <RegisterLink href="./login">  I already have an account.  </RegisterLink>
          </span>
        </Register>
        </Grid>
      </Form>
      </FormBox>
      </LocalizationProvider>
      </Wrapper>

    );
}