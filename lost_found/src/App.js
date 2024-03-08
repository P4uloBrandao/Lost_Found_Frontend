import React from 'react';
import Signup from './components/signUp/index';
import Home from './components/home/index';
import LoginPage from './pages/LoginPage';
import ProfileSettings from './components/profileSettings/index';
import ChangePassword from './components/changePassword/index';
import Navbar from './components/navbarComponent/index'
import styled from 'styled-components';
import Esquadras from './components/esquadra/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider }  from './components/AuthContext'
import ProtectedRoute from './components/protectedRoutes'
const LayoutContainer = styled.div`
  /* Add any layout-related styles here */
`;

const GlobalStyles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

  /* Add any global styles or overrides here */
`;

function App() {
  return (
    <LayoutContainer>
      

      <GlobalStyles>
      <AuthProvider>
        <Navbar />
        <Router>
          <Routes>
          <Route path="/esquadras" element={<ProtectedRoute><Esquadras /></ProtectedRoute>} />
            <Route path="/" element={<Home />} />
            <Route path="/profileSettings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/changePassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
            
          </Routes>
        </Router>
        </AuthProvider>
      </GlobalStyles>
    </LayoutContainer>
  );
}

export default App;
