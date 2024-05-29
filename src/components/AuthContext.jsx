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
  const [authUser, setAuthUser] = useState('');
  const [isContextReady, setIsContextReady] = useState(false); // Indica se o contexto está pronto
  const [userRole, setUserRole] = useState('');
  const [policeId, setPoliceId] = useState('');


  const logout = () => {
    setIsLoggedIn(false);
    setAuthUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    window.location.reload();
  };

  const login = (userData) => {
    setAuthUser(userData);
    setToken(userData.token);

    setIsLoggedIn(true);
    if (userData.user.role === 'Admin') {
      setIsAdmin(true);
      setUserRole('Admin')
    }
    if(userData.user.role === 'Police'){
      setUserRole('Police')
    }
    else{
      setUserRole('User')
    }
     window.location.reload();
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
          else if (userProfileData.role === "Police") {
            const getPoliceUser = async () => {
              try {
                const response = await axios.get(`http://localhost:3000/api/police/police-officers/users/${authUser._id}`);
                setPoliceId(response.data._id);
                console.log(response.data._id)
               
                setLoading(false); // Definir o estado de carregamento como falso quando o fetch estiver concluído
              } catch (error) {
                console.error('Failed to fetch categories', error);
                // Lide com erros conforme necessário
              }
            }
            getPoliceUser();
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
    if (authUser === ''){

    fetchData();
    }
  }, [userRole, isAdmin, isLoggedIn,authUser, policeId]);


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
