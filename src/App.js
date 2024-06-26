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
import SelectedAuctionPage from "./pages/SelectedAuctionPage.jsx";
import RegisterLostObjectPage from'./pages/RegisterLostObjectPage.jsx'; 
import MatchObjectCatalogPage from'./pages/matchObjectCatalogPage.jsx'; 
import AdminPage from'./pages/AdminPage.jsx'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
// import AddLostObjectCatalogPage from'./pages/AddLostObjectCatalogPage.jsx'; 
import { AuthProvider } from "./components/AuthContext.jsx";
// import  { AdminRoute, PublicRoute } from './components/protectedRoutes.jsx'
import AdminRoute from './components/routeComponent/adminRoute/index.jsx'

import PoliceRoute from './components/routeComponent/PoliceRoute/index.jsx'
import ForgetPasswordPage from './pages/ForgetPasswordPage.jsx'
import LostObjectCatalogPage from "./pages/lostObjectCatalogPage.jsx";
import ForgetPasswordPageEmail from './pages/ForgetPasswordPageEmail.jsx'
import PublicRoute from './components/routeComponent/publicRoute/index.jsx'
import PrivateRoute from './components/routeComponent/privateRoute/index.jsx'
import Footer from './components/FooterComponent/index.jsx'
import'./assets/colors/colors.css'
import AuctionsPage from "./pages/AuctionsPage";

import Policies from './pages/PoliciesPage.jsx'
import TermsConditions from './pages/TermsConditionsPage.jsx'
const AppContainer = styled.div`
    
    background-color: var(--white-color);
    transition: background 0.2s linear;
   
    `

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0 0 0;
    padding-top: 103px;
    margin: 0 0 0 0;
    width: 100%;
    height: 100%;
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
            <ContentContainer>
              <Routes>
                <Route path="/police" element={<PoliceRoute><PolicePage/></PoliceRoute> }/>

                <Route path="/profile/:option" element={<PrivateRoute><ProfilePage /></PrivateRoute> }/>
                <Route path="/AdminPage" element={<AdminRoute><AdminPage /></AdminRoute>} />
                <Route path="/addFoundObject" element={<PrivateRoute><AddLostObjectComponent isFoundObjectPage={true} /></PrivateRoute>} />
              
                <Route path="/addLostObject" element={<PrivateRoute><RegisterLostObjectPage /></PrivateRoute>} />
                <Route path="/myLostObjects" element={<PrivateRoute><LostObjectCatalogPage /></PrivateRoute>} />
                
                <Route path="/auctions" element={<PublicRoute><AuctionsPage /></PublicRoute>} />

                <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
              
                <Route path="/resetPassword/:token" element={<PublicRoute><ForgetPasswordPage /></PublicRoute>} />
                <Route path="/forgetPasswordRedirect" element={<PublicRoute><ForgetPasswordPageEmail /></PublicRoute>} />

                <Route path="/policies" element={<PublicRoute><Policies /></PublicRoute>} />
                <Route path="/terms-conditions" element={<PublicRoute><TermsConditions /></PublicRoute>} />

              </Routes>
              <Footer></Footer>
            </ContentContainer>
          </Router>
          {/* <Footer/> */}
        </GoogleOAuthProvider>

      </AuthProvider>
      </AppContainer>
    );
  }
  
  export default App;