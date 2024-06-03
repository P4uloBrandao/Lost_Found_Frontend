import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth, AuthProvider } from '../AuthContext';
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputF  from '../inputFieldComponent/InputField';
import Grid from '@mui/material/Grid';

import "../../assets/colors/colors.css"

import styled, { keyframes, css} from 'styled-components';



const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    display:grid 
  }
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 100%;
`;

const InputSubmit = styled.button`
width: 100%;
  height: 40px;
  background: #c6c3c3;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--white-color);
  }
`;

const Title = styled.h2`
  color: var(--black-color);
  opacity: 1;
  text-align: left;
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  color: #3cb684;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  text-align: left !important;
  margin-top: 0px;
`;

const DeleteProfile = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const { logout }= useAuth();
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
        const response = await axios.delete(`https://10.182.0.39/api/users/delete/${token}`);
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
      
      <>
          <Title>Delete Account</Title>
          <CategoryTitle>
            Deleting your account will remove all your data from our databases. This cannot be undone.
          </CategoryTitle>

<Wrapper>
          <Grid container xs={12}>
          <Grid xs={12}>
          <InputBox>
            <InputF
              type="text"
              placeholder="Type DELETE"
              id="deleteConfirmation"
              required
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              name="DELETE"
              value={deleteConfirmation}
            />
          </InputBox>
          <InputSubmit type="submit" onClick={handleDeleteProfile}>
            Delete
          </InputSubmit>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
</Grid>
</Grid>
</Wrapper>
</>
       
    );
  };
  
  export default DeleteProfile;
             
