import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import InputF  from '../inputFieldComponent/InputField';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

import styled, { keyframes, css} from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';

import GoogleButton from '../GoogleButtonComponent/index'
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

const LoginBox = styled.div`
${colors};
text-align: -webkit-center;
  position: relative;
  height: 375px;
    width: 330px;
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
  margin-bottom: 14px;
`;

const InputSubmit = styled.button`
${colors}  
width: 50%;
    height: 40px;
  background: #ffffff;
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
    const { setToken, setAuth } = useContext(AuthContext);

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
    const setLoginGoogle = () => {
      
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
        const response = await axios.post("http://localhost:3000/api/auth/login", {email,password});
    
        // Process the response as needed
          console.log(response.data);
          
           localStorage.setItem("token", response.data.token);
           setToken(response.data.token);

           navigate("/home");
     
        } catch (error) {
          console.error("Authentication failed:", error);
           setToken(null);
           localStorage.removeItem("token");
          if (error.response && error.response.data) {
              // Log the specific server-side error message
              console.error("Server-side error:", error.response.data.error);
              setErrorMessage(error.response.data.error); // Set the error message if present in the error response
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
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}

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
        id="password"
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
            <RegisterLink href="#">Forgot password</RegisterLink>
          </div>
        </RememberForgot>
        <>
          <InputSubmit type="submit" className="input-submit" value="Login" label="Login">Login</InputSubmit>
        </>
        <InputBox>
        <GoogleButton
        placeholder={'Continue with Google'}  
        id="googleButtonLogin"
        
        onClick={(e) => setLoginGoogle(e.target.value)}
        
        name="googleButtonLogin"/>
        </InputBox>
        <Register>
          <span>
            Don't have an account?  
            <RegisterLink href="./signup">Register</RegisterLink>
          </span>
        </Register>
      </form>
    </LoginBox>
    </Wrapper>
             
            
    );
}