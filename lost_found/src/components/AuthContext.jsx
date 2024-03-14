// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(); // Initialize to false initially

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
    <Link to="" refresh="true"></Link>
  };

  // Ensure setAuth is part of the context value
  const contextValue = { token, setToken, loading, logout, auth, setAuth };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
