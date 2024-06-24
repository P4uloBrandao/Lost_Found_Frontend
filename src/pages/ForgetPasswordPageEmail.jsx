import { InputSubmit, Container,InputBox ,Title,Form, Wrapper,SubCategoryTitle,CategoryTitle } from '../assets/StylePopularComponent/style';
import * as React from 'react';

import Grid from '@mui/material/Grid';
import MailIcon from '@mui/icons-material/MailOutlineRounded';

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




export default function ForgetPasswordPageEmail() {
    const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
    // const { setToken } = useContext(AuthContext);
    const [email, setEmail] = useState(null); // New state for handling error messages

    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL+"/api/auth/forgetPasswordRedirect",
                {
                    "email": email,
                }
            );
            setErrorMessage(response.data.message);
           
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
        <Title>Forget Password</Title>
        <CategoryTitle>
          Please enter  your email to reset your password
        </CategoryTitle>
       
        <Wrapper> 
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <InputBox>
                    <InputF 
                    icon={<MailIcon />} 
                    type={'text'} 
                    placeholder={'Enter your Email'}  
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}

                    errorMessage={'Email inválido'}
                   
                    name="Email"/>
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