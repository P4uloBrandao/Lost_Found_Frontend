import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import PlaceComponent from "./place";
import axios from "axios";
import  { useState } from "react";

const defaultTheme = createTheme();

function Esquadra() {
    const [esquadras, setEsquadras] = React.useState([]);
    const [station, setSelectedEsquadra] = React.useState('');
    const [newEsquadra, setNewEsquadra] = React.useState('');
    const [newEsquadraAddress, setNewEsquadraAddress] = React.useState('');
    const [newEsquadraPostalCode, setNewEsquadraPostalCode] = React.useState('');
    const [newEsquadraPhoneNumber, setNewEsquadraPhoneNumber] = React.useState('');
    const [showNewEsquadraFields, setShowNewEsquadraFields] = React.useState(false);
    const [first_name, setFirst_name] = React.useState('');
    const [last_name, setLast_name] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");



    const toggleNewEsquadraFields = () => {
        setShowNewEsquadraFields(!showNewEsquadraFields);
    };

    // Função para buscar as esquadras do banco de dados (substitua com sua lógica de consulta MongoDB)
    // USAR AXIOS
    const fetchEsquadrasFromDatabase = () => {
        // Simulação de esquadras existentes
        const esquadrasFromDB = ['Esquadra 1', 'Esquadra 2', 'Esquadra 3'];
        setEsquadras(esquadrasFromDB);
    };

    // Ao montar o componente, buscar as esquadras do banco de dados
    React.useEffect(() => {
        fetchEsquadrasFromDatabase();
    }, []);

    const handleNewEsquadraRegistration = () => {
        // Aqui você deve adicionar a lógica para registrar a nova esquadra no banco de dados MongoDB
        // Substitua este exemplo com sua lógica real de registro
        console.log("Nova esquadra registrada:");
        console.log({
            newEsquadra,
            newEsquadraAddress,
            newEsquadraPostalCode,
            newEsquadraPhoneNumber
        });
        // Após o registro, adicionamos a nova esquadra à lista de esquadras
        setEsquadras([...esquadras, newEsquadra]);
        setSelectedEsquadra(newEsquadra);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            first_name: data.get('firstName'),
            last_name: data.get('lastName'),
            password: data.get('password'),
            station: station,
        });

        try {
            const response = await axios.post("http://localhost:3000/api/police/police-officers",
            {   first_name,
                last_name,
                password,
                station: "65fb1de629c52b172fe02f42",
                phone,
                email,
            });
               console.log(response)
          } catch (error) {
            console.error("Police registration failed:", error);


            if (error.response && error.response.data) {
              setMessage(error.response.data.error); // Set the error message if present in the error response
            } else {
              setMessage("An unexpected error occurred. Please try again.");
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
                        Sign up | PoliceAcc
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(e) => setFirst_name(e.target.value)}

                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(e) => setLast_name(e.target.value)}

                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    onChange={(e) => setEmail(e.target.value)}

                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={(e) => setPhone(e.target.value)}
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone-number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Select Esquadra"
                                    fullWidth
                                    value={station}
                                    onChange={(e) => setSelectedEsquadra(e.target.value)}
                                >
                                    {esquadras.map((esquadra) => (
                                        <MenuItem key={esquadra} value={esquadra}>
                                            {esquadra}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} container justifyContent="flex-end">
                                <Link component="button" variant="body2" onClick={toggleNewEsquadraFields}>
                                    Can't find your station? Register it
                                </Link>
                            </Grid>
                            {showNewEsquadraFields && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="esquadra"
                                            name="newEsquadra"
                                            required
                                            fullWidth
                                            id="newEsquadra"
                                            label="Police Station ID "
                                            value={newEsquadra}
                                            onChange={(e) => setNewEsquadra(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PlaceComponent 
                                        value={newEsquadraAddress}
                                        onChange={(e) => setNewEsquadraAddress(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="postal-code"
                                            name="newEsquadraPostalCode"
                                            required
                                            fullWidth
                                            id="newEsquadraPostalCode"
                                            label="Postal Code"
                                            value={newEsquadraPostalCode}
                                            onChange={(e) => setNewEsquadraPostalCode(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="phone-number"
                                            name="newEsquadraPhoneNumber"
                                            required
                                            fullWidth
                                            id="newEsquadraPhoneNumber"
                                            label="Phone Number"
                                            value={newEsquadraPhoneNumber}
                                            onChange={(e) => setNewEsquadraPhoneNumber(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            onClick={() => {
                                                handleNewEsquadraRegistration();
                                                toggleNewEsquadraFields();
                                            }}
                                        >
                                            Register Station
                                        </Button>
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth 
                                    onChange={(e) => setPassword(e.target.value)}

                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
    
    export default Esquadra;
    
