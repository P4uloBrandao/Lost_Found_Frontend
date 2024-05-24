import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../assets/colors/colors.css';

const PopAlertContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: -40px;
  margin-top: 10pt;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--primary-green-color);
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  &.visible {
    opacity: 1;
    visibility: visible;
  }
`;

const PopAlert = ({ message, duration = 2500, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Set visible to true once the component mounts
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <PopAlertContainer className={visible ? 'visible' : ''}>
      {message}
    </PopAlertContainer>
  );
};

export default PopAlert;
