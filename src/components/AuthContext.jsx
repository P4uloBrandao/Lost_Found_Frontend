import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider(props) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [isContextReady, setIsContextReady] = useState(false); // Indica se o contexto está pronto
  const [userRole, setUserRole] = useState('');


  const logout = () => {
    setIsLoggedIn(false);
    setAuthUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
  };

  const login = (userData) => {
    console.log("userLogin")
    setAuthUser(userData);
    setToken(userData.token);

    setIsLoggedIn(true);
    console.log(userData.user)
    if (userData.user.role === 'Admin') {
      console.log("aquiaquiaqui")
      setIsAdmin(true);
      setUserRole('Admin')
    }
    if(userData.user.role === 'Police'){
      setUserRole('Police')
    }
    else{
      setUserRole('User')
    }
   console.log('------>',isAdmin, isLoggedIn)
   console.log(token)
  };

  const contextValue = {
    setAuthUser,
    authUser,
    isLoggedIn,
    setIsLoggedIn,
    setIsAdmin,
    isAdmin,
    token,
    setToken,
    logout,
    userRole,
    setUserRole,
    login,
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
  
    const fetchData = async () => {
      try {
        if (storedToken) {
          setIsLoggedIn(true);
          const response = await axios.get(`http://localhost:3000/api/users/profile/${storedToken}`);
          const userProfileData = response.data.currentUser;
  
          setToken(storedToken);
          setAuthUser(userProfileData);
          
          setUserRole(userProfileData.role);
  
          if (userProfileData.role === "Admin") {
            setIsAdmin(true);
          }
        } else {
          setIsLoggedIn(false);
          setUserRole('');
          setIsAdmin(false);
          setAuthUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Lide com erros conforme necessário
      } finally {
        setLoading(false);
        setIsContextReady(true);
      }
    };
  
    fetchData();
  }, [userRole, isAdmin, isLoggedIn]);
  

// Log isAdmin após setIsAdmin(true)
  
  // Aguarde até que o contexto esteja pronto para renderizar qualquer coisa
  if (!isContextReady) {
    return null; // ou um indicador de carregamento, se preferir
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
