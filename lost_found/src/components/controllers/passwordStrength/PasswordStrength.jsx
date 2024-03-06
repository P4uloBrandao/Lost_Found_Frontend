import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './style.css';

export const PasswordStrength = ({ placeholder, onChange }) => {
  const [strength, setStrength] = useState("");
  const strengthLabels = ["weak", "medium", "medium", "strong"];
  const defaultTheme = createTheme();

  const getStrength = (password) => {
    let indicator = -1;
    if (/[a-z]/.test(password)) indicator++;
    if (/[A-Z]/.test(password)) indicator++;
    if (/\d/.test(password)) indicator++;
    if (/[^a-zA-Z0-9]/.test(password)) indicator++;
    if (password.length >= 16) indicator++;

    return strengthLabels[indicator];
  };

  const handleChange = (e) => {
    setStrength(getStrength(e.target.value));
    onChange(e.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <TextField
        className='control'
        type="text"
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <div className={`bars ${strength}`}>
        <div></div>
      </div>
      <div className='strength'>{strength && `${strength} password`}</div>
    </ThemeProvider>
  );
};
