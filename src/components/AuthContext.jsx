// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(); // Initialize to false initially
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);



  const login = (userData) => {
    
    setUserName(userData.userName);
    setUserEmail({userEmail : userData.userEmail})
      console.log(userData.userName, userData.userEmail); // Use userData diretamente
    else{

    console.log(userName, userEmail)
    setAuth(true);
    
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

    } 

    setLoading(false);
  }, []);

  const logout = () => {
    setToken(null);
    setAuth(false);
    localStorage.removeItem("token");
    
  };
  // Ensure setAuth is part of the context value
  

  const contextValue = { token, setToken, loading, logout, auth, setAuth, login,userEmail,userName };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
