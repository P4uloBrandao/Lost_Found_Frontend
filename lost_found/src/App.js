import React from 'react';
import Signup from './components/signUp/index';
import Home from './components/home/index';
import LoginPage from './pages/LoginPage';
import ProfileSettings from './components/profileSettings/index';
import ChangePassword from './components/changePassword/index';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/profileSettings" element={<ProfileSettings />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
