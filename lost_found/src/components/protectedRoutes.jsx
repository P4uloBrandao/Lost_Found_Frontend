import { Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { auth, is2FAVerified } = AuthProvider();

  if (!auth) {
    return <Navigate to="/login" />;
  }
  if (!is2FAVerified) {
    return <Navigate to="/verify-2fa" />;
  }

  return children;
};

export default ProtectedRoute;