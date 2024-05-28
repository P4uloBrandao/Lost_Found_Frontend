import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color:white;
`;

const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 20px;
  color: #3498db;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 10px;
  background-color: #ddd;
  margin-top: 20px;
  border-radius: 5px;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: #3498db;
  border-radius: 5px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const LoadingSpinner = () => {
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulated asynchronous loading process
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 20 : 100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Change loading message based on progress
    if (progress < 40) {
      setLoadingMessage("Preparing...");
    } else if (progress < 80) {
      setLoadingMessage("Almost there...");
    } else {
      setLoadingMessage("Finishing up...");
    }
  }, [progress]);

  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{loadingMessage}</LoadingText>
      <ProgressBar>
        <Progress progress={progress} />
      </ProgressBar>
    </LoadingContainer>
  );
};

export default LoadingSpinner;
