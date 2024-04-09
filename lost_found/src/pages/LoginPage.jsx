import React from 'react'
import Login from '../components/loginComponent/index'
import photo from '../assets/background/bg-photo.jpg'
import styled, { keyframes } from 'styled-components';


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Background = styled.div`
  background-color: #f9fbe4;
  /* Set the desired height */
  animation: ${fadeIn} 1s ease-in; /* You can add animations if needed */
`;
const LoginContainer = styled.div`
 
`;
export default function LoginPage() {
  return (
    
    <Background><LoginContainer><Login/></LoginContainer></Background>
  )
}

