import React from 'react'
import photo from '../assets/background/bg-photo.jpg'
import styled, { keyframes } from 'styled-components';
import ProfileSettings from '../components/profileSettings/index';
import DeleteProfile from '../components/deleteProfile/index'
import Layout from '../components/Layout/Layout';
import ChangePassword from '../components/changePassword';
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Background = styled.div`
  background-color: url(${photo});
  background-size: cover; /* or "contain" depending on your preference */
  background-position: center;
  height: 100vh; /* Set the desired height */
  animation: ${fadeIn} 1s ease-in; /* You can add animations if needed */
`;

export default function ProfilePage() {
  return ( 
   
  <Background>
                <ProfileSettings />
                <DeleteProfile />
                <ChangePassword />
  </Background>
 
  )
}

