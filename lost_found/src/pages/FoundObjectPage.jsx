import React from 'react'
import photo from '../assets/background/bg-photo.jpg'
import styled, { keyframes } from 'styled-components';
import FoundObjectForm from '../components/FoundObjectsFormsComponent/FoundObjectForm';
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
  height: 100vh; /* Set the desired height */
  animation: ${fadeIn} 1s ease-in; /* You can add animations if needed */
`;

export default function FoundObjectPage() {
  return (   
    <Background><FoundObjectForm/></Background>
  )
}

