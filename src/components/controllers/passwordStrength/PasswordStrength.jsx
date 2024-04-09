import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './style.css';

export const PasswordStrength = ({ text }) => {
  const [strength, setStrength] = useState("");
  const strengthLabels = ["weak", "medium", "medium", "strong"];
  const defaultTheme = createTheme();

  const getStrength = () => {
    let indicator = -1;
    if (/[a-z]/.test(text)) indicator++;
    if (/[A-Z]/.test(text)) indicator++;
    if (/\d/.test(text)) indicator++;
    if (/[^a-zA-Z0-9]/.test(text)) indicator++;
    if (text.length >= 16) indicator++;

    return strengthLabels[indicator];
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className={`bars ${getStrength()}`}>
        <div></div>
      </div>
      <div className='strength'>{getStrength() && `${getStrength()} password`}</div>
    </ThemeProvider>
  );
};
