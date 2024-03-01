import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from "@mui/material/MenuItem";

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

export default function SignUp() {
    const [firstName, setfirstName] = React.useState('');
    const [lastName, setlastName] = React.useState('');
    const [email, seEmail] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [adress, setAdress] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [checkPassword, setcheckPassword] = React.useState('');
    const [date, setDate] = React.useState('');
    const [nic, setNic] = React.useState('');
    const [nif, setNif] = React.useState('');






    const handleChangeGender = (event) => {
        setGender(event.target.value);
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
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
                                <TextField
                                    required
                                    value={password}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={checkPassword}
                                    fullWidth
                                    name="checkPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="checkPassword"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                id="gender"
                                name="gender"
                                select
                                label="Last Name"
                                value={gender}
                                onChange={handleChangeGender}
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
                            value={date}
                                id="date"
                                name="date"
                                label="Birthday"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={adress}
                                    required
                                    fullWidth
                                    name="adress"
                                    label="Your adress"
                                    type="text"
                                    id="adress"
                                    autoComplete="Adress.."
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    value={nif}
                                    required
                                    fullWidth
                                    name="Nif"
                                    label="Your Nif"
                                    type="text"
                                    id="nif"
                                    autoComplete="Adress.."
                                />
                            </Grid><Grid item xs={6}>
                                <TextField
                                    value={nic}
                                    required
                                    fullWidth
                                    name="nic"
                                    label="Your Nic"
                                    type="text"
                                    id="nic"
                                    autoComplete="Adress.."
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
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}