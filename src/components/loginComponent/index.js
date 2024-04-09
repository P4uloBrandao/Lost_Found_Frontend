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
import LoginImage from '../../assets/background/loginImage.svg'; 
import GoogleButton from '../GoogleButtonComponent/index'
const colors = css`
  --primary-color: #3CB684;
  --second-color: #ffffff;
  --black-color: #000000;
`;


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  min-height: 100vh;
  
   img {
    position: absolute;
    z-index: 100;
    right: 0px;
    bottom: 0px;
    transform: scale(1);
}
  
`;

const LoginBox = styled.div`
${colors};
  text-align: -webkit-center;
  position: relative;
  height: 61.5vh;
  background-color: white;
  width: 30%;  backdrop-filter: blur(25px);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  padding: 7.5em 6.5em;
`;
const LoginHeader = styled.div`

  top: 0rem;
  position: relative;

`;

const LoginHeaderText = styled.span`
${colors}

  color: var(--black-color);
  text-align: center;
  font-family: Roboto;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
const RememberBox = styled.div`
  display: flex;
  align-items: center;
  user-select: none;

  label {
    font-size: 16px;
    color: #333;
    margin-left: 8px;
    cursor: pointer;
  }

  input {
    opacity: 0;
    visibility: hidden;
    position: absolute;

    &:checked + .check {
      background-color:  var(--primary-color);
    }
  }

   .check {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #ccc;
    border-radius: 9px;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
`;
const InputSubmit = styled.button`
${colors}  

width: 9.93306rem;
height: 3.25rem;
  background:var(--primary-color);
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.11);
  transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
  text-align: center;
  font-family: Roboto;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 135.5%;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  color:var(--second-color);
  transition: 0.3s;

  &:hover {
    background: var(--second-color);
    border: solid 2px var(--primary-color);
    color:var(--primary-color);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.30), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }
`;

const Register = styled.div`
  text-align: center;
`;
const LoginBody = styled.div`
  position:relative;
  top:1rem;
`;

const RegisterLink = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: var(--primary-color);
  cursor:pointer;
  margin-right: 11px;
  &:hover {
    text-decoration: underline;
`;

const HrDivison = styled.div`
  display: flex;
  align-items: center;
  color: #000000;
  margin: 20px 0;

  hr {
    flex: 1;
    border: none;
    height: 1.33pt;
    background-color: #3cb684;
    margin: 0 10px;
}

  p {
    margin: 0;
  }
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
    const {login } = useContext(AuthContext);
    const defaultTheme = createTheme();
    const [showPassword, setShowPassword] = useState(null); // New state for handling error messages
    
      const [checked, setChecked] = useState(false);
    
      const handleCheckboxClick = () => {
        setChecked(!checked);
      };
    
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
           const userData = {
            username: 'GONcalo',
            userEmail: 'joao@example.com', // Substitua isso pelo e-mail real do usuário
          };
          login(userData);
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
      <LoginBody>
        
        
     
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
      <GoogleButton
        placeholder={'Continue with Google'}  
        id="googleButtonLogin"
        
        onClick={(e) => setLoginGoogle(e.target.value)}
        
        name="googleButtonLogin"/>
        <HrDivison ><hr /> <p> OR</p> <hr /></HrDivison>
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
           <RememberBox>
            <input id="one" type="checkbox"/>
            <span className="check" onClick={handleCheckboxClick}></span>
            <label for="one">Remember me</label>
          </RememberBox>
          <div className="forgot">
            <RegisterLink href="#"  style={{ left: '10px' }}>Forgot password?</RegisterLink>
          </div>
        </RememberForgot>
        <>
          <InputSubmit type="submit" className="input-submit" value="Login" label="Login">Login</InputSubmit>
        </>
        <InputBox>
        
        </InputBox>
        <Register>
          <span>
            Don't have an account?  
            <RegisterLink href="./signup"> Register</RegisterLink>
          </span>
        </Register>
      </form>
      </LoginBody>
    </LoginBox>
    <img src={LoginImage} alt="" />
    </Wrapper>
             
            
    );
}