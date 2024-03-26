import React, { useState, useContext, useEffect } from 'react';
import Logo from "../../assets/logo/logo.png"
import styled , { keyframes } from 'styled-components';
import './style.css';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const navigate = useNavigate();
  const { logout, auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/users/profile/${token}`);
          const userProfileData = response.data.currentUser;
          setUserData(userProfileData);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSignInClick = () => {
    navigate('/login');
  };
  const handleSignUpClick = () => {
    navigate('/signup');
  };
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <nav id="navbar">
        <div className='logoItem'>
          <img src={Logo} alt="" />
        </div>

        <div className='buttonsSide'>
        {userData ? null : (
              <div onClick={handleSignInClick} className='signInItem'>SIGN IN</div>
            )}
          <ul>
            <li className='menuItem'>
              <a className='menuItemText'>MENU</a>  <i class="fas fa-angle-down"></i>
              <ul className='menuOptions'>
                
                <div className='option1'>
                  <div><img width='40px' height='40px' src={Logo} alt="" /></div>
                  {userData && (
                    <div>
                      <p>{userData.first_name} {userData.last_name}</p>
                      <p>{userData.email}</p>
                    </div>
                  )}
                </div>
                <li className='option op1'>
                 <div> <a href="#">LOST</a> <FontAwesomeIcon className='svgArrow1' icon={faArrowLeft} /></div>
                  <ul className='menuOptions1'>
                    <li  className='option op11'> <div><a href="#">REGISTER LOST </a><FontAwesomeIcon className='svgArrow11' icon={faArrowLeft} /></div></li>
                    <li  className='option op12'> <div><a href="#">MY LOST</a><FontAwesomeIcon className='svgArrow12' icon={faArrowLeft} /></div></li>
                  </ul>
                </li>
                <li className='option op2'>
                 <div> <a href="#">AUCTIONS</a><FontAwesomeIcon className='svgArrow2' icon={faArrowLeft} /></div>
                  <ul className='menuOptions2'>
                    <li className='option op21'> <div><a href="#">BROWSE AUCTIONS </a><FontAwesomeIcon className='svgArrow21' icon={faArrowLeft} /></div></li>
                    <li  className='option op22'> <div><a href="#">MY AUCTIONS </a><FontAwesomeIcon className='svgArrow22' icon={faArrowLeft} /></div></li>
                  </ul>
                </li>

                {userData &&  <li className='option op3'>
               <div> <a >PROFILE</a><FontAwesomeIcon  className='svgArrow3' icon={faArrowLeft} /></div>
                <ul className='profileNavItem menuOptions3'>
                  <li  className='option op31 '> <div><a href="/profile">EDIT PROFILE</a><FontAwesomeIcon className='svgArrow31' icon={faArrowLeft} /></div></li>
                  <li  className='option op32'> <div><a href="#">PRIVACY SETTINGS</a><FontAwesomeIcon className='svgArrow32' icon={faArrowLeft} /></div></li>
                 
                </ul>
              </li>}
              {userData ? (
  <li className='option op4' onClick={handleLogout}><div><a> LOGOUT</a> <FontAwesomeIcon className='svgArrow4' icon={faArrowLeft} /></div></li>
) : (
  <li onClick={handleSignUpClick} className="sign-in-active">SIGN UP</li>
)}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
