import { InputSubmit, Container,InputBox ,Title,Form, Wrapper,SubCategoryTitle,CategoryTitle } from '../assets/StylePopularComponent/style';
import * as React from 'react';

import Grid from '@mui/material/Grid';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth, AuthProvider } from '../components/AuthContext';
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {PasswordStrength} from '../components/controllers/index'
import InputF  from '../components/inputFieldComponent/InputField'; 
import styled from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';
import "../assets/colors/colors.css"    

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const PrimaryContainer = styled.div`
  margin: 0.1em 7em;
  text-align: -webkit-center;
  place-content: center;
`;
const PasswordStrengthWrapper = styled.div`
  margin-top: 20px; 
`;




export default function ChangePassword() {
    const [password, setPassword] = React.useState('');
    const [confirmedPassword, setConfirmedPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
    // const { setToken } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(null); // New state for handling error messages
    const [showPassword2, setShowPassword2] = useState(null); // New state for handling error messages

    const navigate = useNavigate();
    const handleChange = (value) => console.log(value);
    function getTokenFromCurrentURL() {
        const url = window.location.href;
        const prefix = "forgetPassword/";
        const startIndex = url.indexOf(prefix) + prefix.length;
        const token = url.substring(startIndex);
        return token;
      }
      
      
    const token = getTokenFromCurrentURL();    

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => {
          const newShowPassword = !prevShowPassword;
          console.log('New showPassword state:', newShowPassword);
          return newShowPassword;
        });
      };
      const toggleShowPassword2 = () => {
        setShowPassword2((prevShowPassword) => {
          const newShowPassword = !prevShowPassword;
          console.log('New showPassword state:', newShowPassword);
          return newShowPassword;
        });
      };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(process.env.REACT_APP_API_URL+"/api/auth/forgetPassword/",
                {
                    "token": token,
                    "password": password
                }
            );
            setErrorMessage(response.data.message);
            setPassword('');
            setConfirmedPassword('');
            // Show success message
            alert(response.data.message);
    
        } catch (error) {
            console.error("Password update failed:", error);
    
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message if present in the error response
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
      <PrimaryContainer>
     
        <Container> 
        <Title>Change Password</Title>
        <CategoryTitle>
          Please enter  new password and press “Save Changes” to make sure nothing is lost!
        </CategoryTitle>
       
        <Wrapper> 
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputBox>
                      <InputF
                          icon={showPassword ? <LockIconOpen /> : <LockIcon />}
                          placeholder={'New Password'}
                          id="Password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          name="New Password"
                          setShowPassword={toggleShowPassword}
                      />
                  <PasswordStrengthWrapper>
                    <PasswordStrength text={password} />
                  </PasswordStrengthWrapper>
                  </InputBox>
                  
           </Grid>  
           <Grid item xs={12} sm={6}>
             <InputBox>
                <InputF
                    icon={showPassword ? <LockIconOpen /> : <LockIcon />}

                    placeholder={'Confirme Password'}
                    id="confirmedPassword"
                    required
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    value={confirmedPassword}
                    name="Confirmed Password"
                    setShowPassword={toggleShowPassword}
                />
            </InputBox>
              </Grid>              
              <Grid item xs={12} >
                <InputBox>
                  <InputSubmit type="submit" onClick={handleSubmit} className="input-submit" value="Register" label="Register">Save Changes</InputSubmit>
                </InputBox>
              </Grid>
      </Grid>  
      </Wrapper>  
     </Container>
          
     </PrimaryContainer>
     );
}