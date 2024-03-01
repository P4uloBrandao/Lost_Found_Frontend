import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log("logged in")
    setLoading(false); 
    setAuthenticated(true)
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};