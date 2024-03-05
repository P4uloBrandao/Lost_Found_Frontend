import * as React from 'react';
import  { useState } from "react";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axios from "axios";
import {PasswordStrength} from '../controllers/index'

// TODO remove, this demo shouldn't need to reset the theme.
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
    },
  ]
const defaultTheme = createTheme();
// Função para formatar a data como "DD-MM-YYYY"


export default function SignUp() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [checkPassword, setCheckPassword] = React.useState('');
    const [date, setDate] = React.useState('');
    const [nic, setNic] = React.useState('');
    const [nif, setNif] = React.useState('');
    const [message, setMessage] = useState("");
    const formatDate = (inputDate) => {
        const dateObject = new Date(inputDate);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${day}-${month}-${year}`;
      };
    const handleChange = (value) => console.log(value);


    const handleSubmit = async (event) => {
    
        event.preventDefault();
        const data = new FormData();
        data.append('firstName', firstName);
        data.append('lastName', lastName);
        data.append('email', email);
        data.append('gender', gender);
        data.append('address', address);
        data.append('password', password);
        data.append('checkPassword', checkPassword);
        data.append('date', formatDate(date));
        data.append('nic', nic);
        data.append('nif', nif);
        // Print all FormData entries
        for (const pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        try {
            const response = await axios.post("http://localhost:3000/api/users/signup",
             data 
            );
            
            setMessage(response.data.message);
          } catch (error) {
            console.error("Registration failed:", error.response.data.error);
            setMessage(error.response.data.error);
          }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container  component="main" maxWidth="xs"  background-color= '#ededf9'>
                <CssBaseline />
                <Box
                    sx={{
                        
                        borderRadius: '10px',
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box className='cada' component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(e) => setFirstName(e.target.value)}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                 <PasswordStrength placeholder="password" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => setCheckPassword(e.target.value)}
                                    required
                                    value={checkPassword}
                                    fullWidth
                                    name="checkPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="checkPassword"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                onChange={(e) => setGender(e.target.value)}
                                id="gender"
                                name="gender"
                                select
                                label="Your Gender"
                                value={gender}
                                helperText="Please select your category "
                                >
                                {genders.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                            <DatePicker  
                                selected={date}
                                onChange={(date) => {
  const formattedDate = formatDate(date);
  setDate(formattedDate);
}}
                                id="date"
                                name="date"
                                label="Birthday"
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                    required
                                    fullWidth
                                    name="address"
                                    label="Your Street address"
                                    type="text"
                                    id="address"
                                    autoComplete="Address.."
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                onChange={(e) => setNif(e.target.value)}
                                    value={nif}
                                    required
                                    fullWidthS
                                    name="NIF"
                                    label="Your NIF"
                                    type="text"
                                    id="nif"
                                    autoComplete="Adress.."
                                />
                            </Grid><Grid item xs={6}>
                                <TextField
                                    onChange={(e) => setNic(e.target.value)}
                                    value={nic}
                                    required
                                    fullWidth
                                    name="NICS"
                                    label="Your NIC"
                                    type="text"
                                    id="nic"
                                    autoComplete="Adress.."
                                />
                            </Grid>
                        </Grid>
                        {message && <div style={{ color: "red" }}>{message}</div>}

                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                
            </Container>
            </LocalizationProvider>
        </ThemeProvider>
    );
}