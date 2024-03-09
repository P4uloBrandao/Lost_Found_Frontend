import React from 'react';
import SignUpPage from './pages/SignUpPage';
import Home from './components/home/index';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
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
          <Route element={<ProtectedRoute />}>
            <Route path="/esquadras" element={<Esquadras />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/changePassword" element={<ChangePassword />}  />

          </Route>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </Router>
        </AuthProvider>
      </GlobalStyles>
    </LayoutContainer>
  );
}

export default App;
