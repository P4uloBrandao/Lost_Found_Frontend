import React from 'react';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/home/index';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './components/changePassword/index';
import styled from 'styled-components';
import Esquadras from './components/esquadra/index'
import DeleteProfile from './components/deleteProfile/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import { AuthProvider }  from './components/AuthContext'
import ProtectedRoute from './components/protectedRoutes'
import ProfileSettings from './components/profileSettings/index'
import {Cloudinary} from "@cloudinary/url-gen";
import LostObjects from './components/lostObjForm/index'
import Navbar from './components/NavBar/index.jsx'
import SignUp from './components/SignUpTest/index.js';
import LostObjectCatalogPage from './pages/lostObjectCatalogPage.jsx';
import RegisterLostObjectPage from'./pages/RegisterLostObjectPage.jsx'; 
import MatchObjectCatalogPage from'./pages/matchObjectCatalogPage.jsx'; 

const LayoutContainer = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');


`;

const GlobalStyles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  /* Add any global styles or overrides here */
`;

function App() {

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloud_name: 'dkyu0tmfx',
            api_key: '371956514244332',
            api_secret: '***************************'
        }
    });

  return (
    <LayoutContainer>
      <GlobalStyles>
      <AuthProvider >
        
        <Router>
          
          <Navbar />
          <Routes>
          

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              
              </ProtectedRoute>
            }
          />
          
        
          <Route
            path="/esquadras"
            element={
              <ProtectedRoute>
                <Esquadras />
              </ProtectedRoute>
            }
          />              
              <Route path="/matchObjects" element={<MatchObjectCatalogPage />} />
              <Route path="/addLostObject" element={<RegisterLostObjectPage />} />
              <Route path="/myLostObjects" element={<LostObjectCatalogPage />} />
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