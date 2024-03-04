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
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputF  from '../inputFieldComponent/InputField';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
// TODO remove, this demo shouldn't need to reset the theme.
import styled, { keyframes, css} from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';
const colors = css`
  --primary-color: #c6c3c3;
  --second-color: #ffffff;
  --black-color: #000000;
`;
const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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

const LoginBox = styled.div`
${colors}
  position: relative;
  width: 450px;
  backdrop-filter: blur(25px);
  border: 2px solid var(--primary-color);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 7.5em 2.5em 4em 2.5em;
  color: var(--second-color);
`;
const LoginHeader = styled.div`
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

const LoginHeaderText = styled.span`
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

const InputField = styled.input`
${colors}  
width: 96%;
  height: 55px;
  font-size: 16px;
  background: transparent;
  color: var(--second-color);
  padding-inline: 20px 0px;
  border: 2px solid var(--primary-color);
  border-radius: 30px;
  outline: none;
`;

const Label = styled.label`
  position: absolute;
  top: -28px;
  left: 20px;
  transition: 0.2s;
`;

const Icon = styled.i`
  position: absolute;
  top: 18px;
  right: 25px;
  font-size: 20px;
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
`;

const InputSubmit = styled.button`
${colors}  
width: 100%;
  height: 50px;
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
`;

const MediaQueryWrapper = styled.div`
  @media only screen and (max-width: 564px) {
    padding: 20px;
  }
`;

const MediaQueryLoginBox = styled.div`
  @media only screen and (max-width: 564px) {
    padding: 7.5em 1.5em 4em 1.5em;
  }
`;


export default function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
    // const { setToken } = useContext(AuthContext);
    const defaultTheme = createTheme();
    const [showPassword, setShowPassword] = useState(null); // New state for handling error messages

    const navigate = useNavigate();
    const toggleShowPassword = () => {
      setShowPassword((prevShowPassword) => {
        const newShowPassword = !prevShowPassword;
        console.log('New showPassword state:', newShowPassword);
        return newShowPassword;
      });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('email', email);
        data.append('password', password);

        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        try {
            const response = await axios.post("http://localhost:3001/api/auth/login", {
              email,
              password,
            });

            // setToken(response.data.token);
            // localStorage.setItem("token", response.data.token);
            navigate("/home");
          } catch (error) {
            console.error("Authentication failed:", error);
            // setToken(null);
            // localStorage.removeItem("token");
            if (error.response && error.response.data) {
              setErrorMessage(error.response.data); // Set the error message if present in the error response
            } else {
              setErrorMessage("An unexpected error occurred. Please try again.");
            }
          }
    };

    return (
        <Wrapper>
        <LoginBox>
      <LoginHeader>
        <LoginHeaderText>Login</LoginHeaderText>
      </LoginHeader>
      <form onSubmit={handleSubmit} >
        <InputBox>
        <InputF 
        icon={<PersonOutlineRoundedIcon />} 
        type={'text'} 
        placeholder={'Enter your Email'}  
        id="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="Email"/>
          
          
        
        </InputBox>
        <InputBox>
        <InputF 
        icon={showPassword ? <LockIconOpen /> : <LockIcon />}
        
        placeholder={'Enter your Password'}  
        id="email"
        required
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        value={password}
        name="Password"
        setShowPassword={toggleShowPassword}
        />
        </InputBox>
        <RememberForgot>
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label >Remember me</label>
          </div>
          <div className="forgot">
            <a href="#">Forgot password</a>
          </div>
        </RememberForgot>
        <InputBox>
          <InputSubmit type="submit" className="input-submit" value="Login" />
        </InputBox>
        <Register>
          <span>
            Don't have an account?
            <RegisterLink href="#">Register</RegisterLink>
          </span>
        </Register>
      </form>
    </LoginBox>
    </Wrapper>
             /* <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                    <Grid 
            item
            xs={false}
            sm={4}
            md={8}
            sx={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'left',
            }}
            />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, textAlign: '-webkit-center' }}>

                        <TextField
                        margin="normal"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        sx={{ width: '70%', alignContent : 'center' }} // Use sx for styling and pass an object
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            sx={{ width: '70%', alignContent : 'center' }} // Use sx for styling and pass an object

                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            value={password}
                            label="Password"
                            type="password"
                            
                            id="password"
                            autoComplete="current-password"
                        />
                        
                        
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/changePassword" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                </Grid>
            </Grid> */
            
    );
}