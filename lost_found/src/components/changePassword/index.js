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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ChangePassword() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
    // const { setToken } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleChange = (value) => console.log(value);
    const token = localStorage.getItem("token");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const config = {
            headers: {
              Authorization: `${token}` // Assuming you have the token variable
            },
            body:{
                email: `${email}`,
                password: `${password}`,
                newPassword: `${newPassword}`,
            }
          };
        
    
        try {
            const response = await axios.put("http://localhost:3000/api/users/update",config);
            setErrorMessage(response.data.message);
    
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
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
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
                       Change Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                        />
                        <PasswordStrength placeholder="password" onChange={handleChange} />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e) => setNewPassword(e.target.value)}
                            name="newPassword"
                            value={newPassword}
                            label="newPassword"
                            type="text"
                            id="newPassword"
                            
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update Password
                        </Button>
                        <Grid container>
                            
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"I remember my password"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}