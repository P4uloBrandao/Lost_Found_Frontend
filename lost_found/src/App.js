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
      <Navbar />
      <GlobalStyles>
        <Router>
          <Routes>
          <Route path="/esquadras" element={<Esquadras />} />

            <Route path="/profileSettings" element={<ProfileSettings />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/changePassword" element={<ChangePassword />} />
          </Routes>
        </Router>
      </GlobalStyles>
    </LayoutContainer>
  );
}

export default App;
