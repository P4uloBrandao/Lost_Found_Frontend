import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth, AuthProvider } from '../AuthContext';
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputF  from '../inputFieldComponent/InputField';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

import styled, { keyframes, css} from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';
import GoogleButton from '../GoogleButtonComponent/index'
import '../../assets/colors/colors.css'
import { hasGrantedAllScopesGoogle } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';


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
  text-align: -webkit-center;
  position: relative;
  height:  100vh;
  background-color: var(--white-color);
  width: 100%; 
   backdrop-filter: blur(25px);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  padding: 7.5em 6.5em;
`;
const LoginHeader = styled.div`

  top: 0rem;
  position: relative;

`;

const LoginHeaderText = styled.span`

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
      background-color:  var( --primary-green-color);
    }
  }

   .check {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #ccc;
    border-radius: 9px;
    background-color: var(--white-color);
    cursor: pointer;
    transition: background-color 0.3s ease;
}
`;
const InputSubmit = styled.button`

width: 9.93306rem;
height: 3.25rem;
background:var( --primary-green-color);
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
  color:var(--white-color);
  transition: 0.3s;

  &:hover {
    background: var(--white-color);
    border: solid 2px var(--primary-green-color);
    color:var(--primary-green-color);
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
  color: var(--primary-green-color);
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
    background-color: var(--primary-green-color);
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
    const [googleId, setGoogleId] = useState(''); // New state for handling error messages

    const {
      setAuthUser,authUser,
      setIsLoggedIn,
      setToken,setIsAdmin,login,isAdmin,setUserRole,token,userRole} = useAuth();


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
    const showUserInformation = async (response) => {
      console.log('Google Response:', response); // Log the entire response
    
      try {
        const userExistValidation = await axios.post("http://localhost:3000/api/users/getUser", { googleId: response.clientId });
    
        if (userExistValidation) {
          console.log("User is valid");
          console.log(userExistValidation);
    
          try {
            const response1 = await axios.post("http://localhost:3000/api/auth/login", { clientId: response.clientId });
    
            localStorage.setItem("token", response1.data.token);
            console.log(response1);
    
            if (response1.data.user.role === 'Admin') {
              setIsAdmin(true);
              setUserRole("Admin");
              navigate("/adminPage");
            } else if (response1.data.user.role === 'Police') {
              setIsAdmin(false);
              navigate("/police");
            }else{
               navigate("/");
            }
    
            login(response1.data);
    
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
          
          setAuthUser(authUser);
          
        }
      } catch (error) {
        console.log(error);
      }
    }


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
          
          localStorage.setItem("token", response.data.token);
          if (response.data.user.role === 'Admin') {
              setIsAdmin(true);
              setUserRole("Admin");
              navigate("/adminPage");
            } else if (response.data.user.role === 'Police') {
              setIsAdmin(false);
              navigate("/police");
            }else{
               navigate("/");
            }
          login(response.data);
          
           
     
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
      setAuthUser(authUser)
     
      
    
  };

    return (
        <Wrapper>
        <LoginBox>
      <LoginHeader>
        <LoginHeaderText>Login</LoginHeaderText>
        
      </LoginHeader>
      <LoginBody>
        
        
     
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
     


<GoogleLogin
    className="google-login-button"
    clientId="535834422242-dfvm3g9s3dv6hpob73povmrmgqbmiuha.apps.googleusercontent.com"
    onSuccess={showUserInformation}
    onFailure={(error) => {
        console.log('Login Failed:', error);
    }}
    cookiePolicy={'single_host_origin'}
    scope={'profile email'} // Requesting 'profile' and 'email' scopes
/>
       

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
    </Wrapper>
             
            
    );
}