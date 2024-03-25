import React from 'react';
import SignUpPage from './pages/SignUpPage';
import Home from './components/home/index';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './components/changePassword/index';
import Navbar from './components/navbarComponent/index';
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
import NavbarTest from './components/NavBar/index'

const LayoutContainer = styled.div`
  /* Add any layout-related styles here */
  background-color:#ede8e8;

`;

const GlobalStyles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  background-color:#ede8e8;
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
          
          {/* <Navbar /> */}
          <Routes>
          <Route path="/navbar" element={<NavbarTest />} /> 

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileSettings />
                <DeleteProfile />
                
              </ProtectedRoute>
            }
          />
          <Route
            path="/lostObjects"
            element={
                <LostObjects />
                
                
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
              <Route
            path="/deleteProfile"
            element={
              <ProtectedRoute>
                <DeleteProfile />
              </ProtectedRoute>
            }
          />  
          <Route
            path="/changePassword"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
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