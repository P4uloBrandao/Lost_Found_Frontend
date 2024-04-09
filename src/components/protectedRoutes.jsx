import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  
  const storedToken = localStorage.getItem("token");
  let auth = false;
  if (storedToken) {
    auth = true
    
    
  } else {
    auth = false
  }
  if (!auth) {
    return <Navigate to="/login" />;
  }
  

  return <>{children}</>; // Ensure that children are rendered here
};

export default ProtectedRoute;
