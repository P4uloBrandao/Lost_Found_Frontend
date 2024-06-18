import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "../../assets/colors/colors.css";
import './style.css';

const MenuOptions = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  border-radius: 20px;
  top: ${props => props.userData === null ? '52pt' : '52pt'};
  position: fixed;
  right: ${props => props.userData === null ? '-15pt' : '0pt'};
  background-color: var(--white-color);
  height: ${props => props.userData === null ? '93pt' : '168pt'};
  padding: 15pt 0pt 15pt 15pt;
  width: 31vh;
  transform:scale(0.9);
  border: solid 1px black;
  z-index: 10;
`;

function Navbar() {
  const navigate = useNavigate();
  const { setAuthUser, authUser, isLoggedIn, setIsLoggedIn, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/users/profile/${token}`);
          const userProfileData = response.data.currentUser;
          if (userProfileData.profileImage) {
            axios.get(`http://localhost:3000/api/users/profileImage/${userProfileData.profileImage}`)
              .then((response) => {
                setProfilePhoto(response.data.image);
                setUserData(userProfileData);
                setAuthUser(userProfileData);
                setLoading(false);
              })
              .catch((error) => {
                console.log("Failed to fetch user profile:", error);
                setLoading(false);
                setUserData(null);
              });
          } else {
            setUserData(userProfileData);
            setAuthUser(userProfileData);
            setLoading(false);
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setLoading(false);
          setUserData(null);
        }
      };
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setAuthUser(null);
    navigate('/login');
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const toggleMenu = (menu) => {
    if (menu === 'profile') {
      setIsOpen(!isOpen);
      setOpenMenu(null); // Close any submenu when the main menu is toggled
    } else {
      setOpenMenu(openMenu === menu ? null : menu);
    }
  };

  const redirectToProfile = () => {
    navigate('/profile');
  };
  const redirectToAuction = () => {
    navigate('/auctions');
  };

  const redirectToLostObjects = () => {
    navigate('/myLostObjects');
  };

  const registerLost = () => {
    navigate('/addLostObject');
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {authUser ? (
        <div style={{ margin: 'auto' }}>
          {profilePhoto ? (
            <img
              onClick={() => toggleMenu('profile')}
              className={`svgButtons ${isOpen ? 'open' : 'closed'}`}
              borderRadius="25px"
              width='45px'
              height='45px'
              src={profilePhoto}
              alt="Profile"
            />
          ) : (
            <img
              onClick={() => toggleMenu('profile')}
              className={`svgButtons ${isOpen ? 'open' : 'closed'}`}
              width='45px'
              height='45px'
              src="https://res.cloudinary.com/dkyu0tmfx/image/upload/v1715205192/profileImages/profile_1_i39bhb.png"
              alt="Default Profile"
            />
          )}
          <MenuOptions isOpen={isOpen} userData={userData}>
        {userData && (
          <div className='option1'>
            <div>
              {!!profilePhoto && <img className='imgMenu' width='40px' height='40px' src={profilePhoto} alt="" />}
              {!profilePhoto && <img className='imgMenu' width='40px' height='40px' src="https://res.cloudinary.com/dkyu0tmfx/image/upload/v1715205192/profileImages/profile_1_i39bhb.png" alt="" />}
            </div>
            <div className='infoUser'>
              <p className='userNameText'>{userData.first_name} {userData.last_name}</p>
              <p className='userEmailText'>{userData.email}</p>
            </div>
          </div>
        )}
        <div className='option op1' onClick={() => toggleMenu('lost')}>
          <div className='optionMenu'> LOST <FontAwesomeIcon className='svgArrow1' icon={faArrowLeft} /></div>
          <div className='menuOptions1' style={{ display: openMenu === 'lost' ? 'block' : 'none' }}>
            <div className='op11' onClick={registerLost}>
              <div className='align11'> LOST SOMETHING<FontAwesomeIcon className='svgArrow11' icon={faArrowLeft} /></div>
            </div>
            <div className='op12' onClick={redirectToLostObjects}>
              <div className='align11'>MY LOST<FontAwesomeIcon className='svgArrow12' icon={faArrowLeft} /></div>
            </div>
          </div>
        </div>
        <div className='option op2'onClick={() => toggleMenu('auctions')}>
          <div className='optionMenu' onClick={redirectToAuction}> AUCTIONS<FontAwesomeIcon className='svgArrow2' icon={faArrowLeft} /></div>
         
        </div>
        {userData && (
          <div className='option op3' onClick={() => toggleMenu('profileOptions')}>
            <div className='optionMenu'>PROFILE<FontAwesomeIcon className='svgArrow3' icon={faArrowLeft} /></div>
            <div className='menuOptions3' style={{ display: openMenu === 'profileOptions' ? 'block' : 'none' }}>
              <div className='option op31' onClick={redirectToProfile}>
                <div className='ml-13'>EDIT PROFILE<FontAwesomeIcon className='svgArrow31' icon={faArrowLeft} /></div>
              </div>
              <div className='option op32'>
                <div className='ml-13'>PRIVACY SETTINGS<FontAwesomeIcon className='svgArrow32' icon={faArrowLeft} /></div>
              </div>
            </div>
          </div>
        )}
        {userData ? (
          <div className='option op4' onClick={handleLogout}>
            <div className='optionMenu'>LOGOUT<FontAwesomeIcon className='svgArrow4' icon={faArrowLeft} /></div>
          </div>
        ) : (
          <div onClick={handleSignUpClick} className="option op4 sign-in-active">
            <div className='optionMenu'>SIGN UP<FontAwesomeIcon className='svgArrow4' icon={faArrowLeft} /></div>
          </div>
        )}
      </MenuOptions>
        </div>
      ) : (
        <p>
          <a style={{ marginRight: "5pt" }} onClick={handleSignUpClick}>SIGN UP</a>|
          <a style={{ marginLeft: "5pt", marginRight: "15pt" }} onClick={handleSignInClick}>SIGN IN</a>
        </p>
      )}
      
    </>
  );
}

export default Navbar;
