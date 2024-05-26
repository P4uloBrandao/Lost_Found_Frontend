import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./components/AuthContext.jsx";

import Layout from './components/Layout/Layout'; // Importa o Layout

import SignUpPage from './pages/SignUpPage';
import Home from './pages/home/index';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePageTest.jsx';
import AddLostObjectComponent from './components/AddLostObjectComponent/index';
import LostObjectCatalogPage from './pages/lostObjectCatalogPage.jsx';
import RegisterLostObjectPage from './pages/RegisterLostObjectPage.jsx'; 
import MatchObjectCatalogPage from './pages/matchObjectCatalogPage.jsx'; 
import AdminPage from './pages/AdminPage.jsx'; 

import AdminRoute from './components/routeComponent/adminRoute/index.jsx';
import PublicRoute from './components/routeComponent/publicRoute/index.jsx';
import PrivateRoute from './components/routeComponent/privateRoute/index.jsx';

import './index.css';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  overflow-y: auto;
  overflow-x: hidden;
`;

function App() {
  return (
    <AppContainer>
      <AuthProvider> {/* Envolve seus componentes com o AuthProvider */}
        <GoogleOAuthProvider clientId="535834422242-dfvm3g9s3dv6hpob73povmrmgqbmiuha.apps.googleusercontent.com">
          <Router>
            <Routes>
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
              <Route path="*" element={
                <Layout>
                  <Routes>
                    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                    <Route path="/AdminPage" element={<AdminRoute><AdminPage /></AdminRoute>} />
                    <Route path="/addFoundObject" element={<PrivateRoute><AddLostObjectComponent /></PrivateRoute>} />
                    <Route path="/matchObjects" element={<PrivateRoute><MatchObjectCatalogPage /></PrivateRoute>} />
                    <Route path="/addLostObject" element={<PrivateRoute><RegisterLostObjectPage /></PrivateRoute>} />
                    <Route path="/myLostObjects" element={<PrivateRoute><LostObjectCatalogPage /></PrivateRoute>} />
                    <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </Router>
        </GoogleOAuthProvider>
      </AuthProvider>
    </AppContainer>
  );
}

export default App;
