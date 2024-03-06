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
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';
import axios from "axios";
import {PasswordStrength} from '../controllers/index'
import InputF  from '../inputFieldComponent/InputField';
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
    const [date, setDate] = React.useState('');
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
        data1.append('birth', date);
        data1.append('gender', gender);
        data1.append('nic', nic);
        data1.append('nif', nif);
        data1.append('phone', phone);
        
            
        for (const pair of data1.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        try {
            const response = await axios.post("http://localhost:3000/api/users/signup",
            {first_name,
                last_name,
                email,
                adddress,
                password,
                date,
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
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    autoFocus
                                    value={first_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                    value={last_name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                 <PasswordStrength placeholder="password" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                            <InputF 
                                icon={showPassword ? <LockIconOpen /> : <LockIcon />}
                                
                                placeholder={'Enter your Password'}  
                                id="email"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                name=" Repeat Password"
                                setShowPassword={toggleShowPassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    value={phone}
                                    fullWidth
                                    name="phone"
                                    label="Phone"
                                    type="text"
                                    id="phone"
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
                                onChange={(e) => setAdddress(e.target.value)}
                                    value={adddress}
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