import React, { useContext } from "react";
import SignUpPage from './pages/SignUpPage';
import Home from './pages/home/index';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePageTest.jsx';
import styled from 'styled-components';
import Esquadras from './components/esquadra/index'
import DeleteProfile from './components/deleteProfile/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
// import  AuthContext  from './components/AuthContext'
import ProfileSettings from './components/profileSettings/index'
// import ProfileMenu from './components/profileMenu/index'
import {Cloudinary} from "@cloudinary/url-gen";
import AddLostObjectComponent from './components/AddLostObjectComponent/index'
import Navbar from './components/NavBarTest/index.jsx'
import PolicePage from './pages/PolicePage.jsx';
import LostObjectCatalogPage from './pages/lostObjectCatalogPage.jsx';
import RegisterLostObjectPage from'./pages/RegisterLostObjectPage.jsx'; 
import MatchObjectCatalogPage from'./pages/matchObjectCatalogPage.jsx'; 
import AdminPage from'./pages/AdminPage.jsx'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
// import AddLostObjectCatalogPage from'./pages/AddLostObjectCatalogPage.jsx'; 
import { AuthProvider } from "./components/AuthContext.jsx";
// import  { AdminRoute, PublicRoute } from './components/protectedRoutes.jsx'
import AdminRoute from './components/routeComponent/adminRoute/index.jsx'

import PoliceRoute from './components/routeComponent/PoliceRoute/index.jsx'

import PublicRoute from './components/routeComponent/publicRoute/index.jsx'
import PrivateRoute from './components/routeComponent/privateRoute/index.jsx'
import Footer from './components/FooterComponent/index.jsx'
import'./assets/colors/colors.css'
const AppContainer = styled.div`
    
    background-color: var(--white-color);
    transition: background 0.2s linear;
    overflow-y: auto;
    overflow-x: hidden;
    `
function App() {
  // const { role } = useContext(AuthContext); // Use o contexto de autenticação para acessar o papel do usuário

    return (
      <AppContainer>
      <AuthProvider> {/* Envolve seus componentes com o AuthProvider */}
        <GoogleOAuthProvider clientId = "535834422242-dfvm3g9s3dv6hpob73povmrmgqbmiuha.apps.googleusercontent.com">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/police" element={<PoliceRoute><PolicePage/></PoliceRoute> }/>

              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute> }/>
              <Route path="/AdminPage" element={<AdminRoute><AdminPage /></AdminRoute>} />
              <Route path="/addFoundObject" element={<PrivateRoute><AddLostObjectComponent /></PrivateRoute>} />
              <Route path="/matchObjects" element={<PrivateRoute><MatchObjectCatalogPage /></PrivateRoute>} />
              <Route path="/addLostObject" element={<PrivateRoute><RegisterLostObjectPage /></PrivateRoute>} />
              <Route path="/myLostObjects" element={<PrivateRoute><LostObjectCatalogPage /></PrivateRoute>} />
              
              <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
            </Routes>
          <Footer></Footer>
          </Router>
          {/* <Footer/> */}
        </GoogleOAuthProvider>

      </AuthProvider>
      </AppContainer>
    );
  }
  
  export default App;