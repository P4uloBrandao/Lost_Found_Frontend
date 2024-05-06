import * as React from 'react';
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
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {PasswordStrength} from '../controllers/index'
import InputF  from '../inputFieldComponent/InputField';
import styled from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';
import "../../assets/colors/colors.css"

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const InputBox = styled.div`

  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  
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
export default function ChangePassword() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
    // const { setToken } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(null); // New state for handling error messages
    const [showPassword2, setShowPassword2] = useState(null); // New state for handling error messages

    const navigate = useNavigate();
    const handleChange = (value) => console.log(value);
    const token = localStorage.getItem("token");

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
            const response = await axios.put("http://localhost:3000/api/users/updatePass",{token,newPassword,password});
            setErrorMessage(response.data.message);
            setEmail('');
            setPassword('');
            setNewPassword('');
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
       
            <Grid container >
                
                <Grid item xs={6}>
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
                />
            </InputBox>
           <PasswordStrength text={password} />
           </Grid>  
           <Grid item xs={6}>
             <InputBox>
                <InputF
                    icon={showPassword ? <LockIconOpen /> : <LockIcon />}

                    placeholder={'Password'}
                    id="newPassword"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    name="newPassword"
                    setShowPassword={toggleShowPassword}
                />
            </InputBox>
               </Grid>         
                        
               <Grid item xs={12}>
      <InputBox>
        <InputSubmit type="submit" onClick={handleSubmit} className="input-submit" value="Register" label="Register">Save Changes</InputSubmit>
      </InputBox>
    </Grid>
            </Grid>
        
    );
}