import React from 'react'
import Login from '../components/loginComponent/index'
import photo from '../assets/background/bg-photo.jpg'
import styled, { keyframes } from 'styled-components';
import SignUp from "../components/SignUpTest";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Background = styled.div`
  background-image: url(${photo});
  background-size: cover; /* or "contain" depending on your preference */
  background-position: center;
  height: 100%; /* Set the desired height */
  animation: ${fadeIn} 1s ease-in; /* You can add animations if needed */
`;

export default function SignUpPage() {
  return (
    
    <Background><SignUp/></Background>
  )
}

