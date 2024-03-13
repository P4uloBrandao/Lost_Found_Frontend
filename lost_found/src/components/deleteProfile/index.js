import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputF  from '../inputFieldComponent/InputField';



import styled, { keyframes, css} from 'styled-components';

const colors = css`
  --primary-color: #c6c3c3;
  --second-color: #ffffff;
  --black-color: #000000;
`;


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: #00798e;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image : url("../../assets/background/bg-photo.jpg")
`;

const LoginBox = styled.div`
${colors};
text-align: -webkit-center;
  position: relative;
  height: 155px;
    width: 330px;
  backdrop-filter: blur(25px);
  border: 2px solid var(--primary-color);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 7.5em 2.5em 4em 2.5em;
  color: var(--second-color);
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
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
  width: 240px;
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

const Text = styled.span`
${colors}
--primary-color: #c6c3c3;
    --second-color: #ffffff;
    --black-color: #000000;
    font-size: 15px;
    top: -20pt;
    color: var(--black-color);
    /* padding-bottom: 97px; */
    position: relative;
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

const RegisterLink = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: var(--second-color);
  &:hover {
    text-decoration: underline;
`;


const DeleteProfile = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
            logout();
            
            
          };
    const handleDeleteProfile = async () => {
      // Validate the delete confirmation
      if (deleteConfirmation !== 'DELETE') {
        setErrorMessage('Invalid delete confirmation. Please type DELETE to confirm.');
        return;
      }
  
      try {
        const token = localStorage.getItem("token");
        console.log(token)
        // Make an API call to delete the user profile
        const response = await axios.delete('http://localhost:3000/api/users/delete', {
            headers: {
            Authorization: `${token}`,
            },
        });
        console.log(response.data); // Log the response from the server
        handleLogout()
        // Handle success, e.g., redirect to login or show a success message
      } catch (error) {
        console.error('Delete profile failed:', error);
  
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.error); // Set the error message if present in the error response
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      }
    };
  
    return (
      <Wrapper>
        <LoginBox>
          <LoginHeader>
            <LoginHeaderText>Delete Account</LoginHeaderText>
          </LoginHeader>
          <Text>
            Deleting your account will remove all your data from our databases. This cannot be undone.
          </Text>
          <InputBox>
            <InputF
              type="text"
              placeholder="To confirm this, type DELETE"
              id="deleteConfirmation"
              required
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              name="To confirm this, type DELETE"
              value={deleteConfirmation}
            />
          </InputBox>
          <InputSubmit type="submit" onClick={handleDeleteProfile}>
            Delete
          </InputSubmit>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        </LoginBox>
      </Wrapper>
    );
  };
  
  export default DeleteProfile;
             
