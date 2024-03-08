import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [auth, setAuth] = useState(false); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false); 
    setAuth(true)
  }, []);

  const logout = () => {
    // Limpar o token e realizar outras ações de logout
    setToken(null);
    setAuth(false)
    // Limpar o token armazenado localmente
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, loading, logout, auth}}>
      {children}
    </AuthContext.Provider>
  );
};