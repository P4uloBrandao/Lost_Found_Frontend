import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom"; 

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Home() {
    const { token, loading } = useContext(AuthContext);
    if (loading) {
      return null;
    }
  
    if (!token) {
      return <Navigate to="/login" replace />;
    }
  
    return <></>;
  }
  
  export default Home;