import React, { useState, useContext, useEffect,useRef  } from 'react';
import Logo from "../../assets/logo/logo.png"

import Teste from "../../assets/teste.png"
import styled , { keyframes } from 'styled-components';
import './style.css';
import { useAuth } from '../AuthContext';

import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faPlus, faMinus  } from '@fortawesome/free-solid-svg-icons'
import { Toggle } from "../darkmode/index";
import { useLocation } from 'react-router-dom';
import "../../assets/colors/colors.css"
import { left } from '@cloudinary/url-gen/qualifiers/textAlignment';


const MenuOptions = styled.div`
display: ${props => props.isOpen ? 'block' : 'none'};  border-radius: 20px;
  position: absolute;
  top: ${props => props.authUser === null ? '70pt !important' : '68pt !important'}; 
    
    right:${props => props.authUser === null ? '-22pt !important' : '38pt !important'}; 
  background-color: var(--white-color);
  height: ${props => props.authUser === null ? '93pt !important' : '102pt !important'}; 
  padding: 15pt 0pt 15pt 15pt ;
  width : auto;
 
  font-size: smaller;
  border: solid 1px black ;

  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.9)'};
  
`;

const MenuItem = styled.div`
  flex: 1;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
background-color:var(--white-color);
  display: flex;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

const SelectedBar = styled.div`

  position: absolute;
  /* bottom: 0; */
  margin: 0 3em border-radius: 20px;
  height: 8px;
  top: 24pt;
  background: linear-gradient(90deg, #039baf, #f7db61);
  transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
`;
const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 47pt;
  flex-direction: row; 
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  height: 6vh;
  margin: 0.3em 4em  0em 4em;
  width : 100%;

`;
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthUser, authUser, isLoggedIn, setIsLoggedIn, logout, userRole } = useAuth();

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const [selectedOption, setSelectedOption] = useState('Home');
  const [hoveredOption, setHoveredOption] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleMenuItemClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDocumentClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/users/profile/${token}`);
          const userProfileData = response.data.currentUser;
          if (!!userProfileData.profileImage) {
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

  const handleHomeClick = () => {
    navigate('/');
  };

  const redirectToProfile = () => {
    navigate('/profile');
  };

  const redirectToLostObjects = () => {
    navigate('/myLostObjects');
  };

  const registerLost = () => {
    navigate('/addLostObject');
  };

  const handlerAdminPage = () => {
    navigate('/adminPage');
  };

  const handleMouseEnter = (option) => {
    setHoveredOption(option);
  };

  const handleMouseLeave = () => {
    setHoveredOption(null);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  const options = [
    { label: 'Home', path: '/' },
    { label: userRole !== "Police" ? 'Lost' : 'New found object', path: '/myLostObjects' },
    { label: userRole !== "Police" ? 'Auctions' : '', path: '/auctions' },
    { label: userRole !== "Police" ? 'I lost something!' : '', path: '/addLostObject' },
    { label: userRole === "Admin" ? 'Admin settings' : '', path: '/adminPage' }
  ].filter(option => option.label);

  return (
    <nav>
      <img onClick={handleHomeClick} className="logo" src={Logo} alt="Logo" />
      {location.pathname !== '/signup' && location.pathname !== '/login' && (
        <>
          <ul className="list">
            {options.map((option) => (
              <li
                key={option.label}
                className={location.pathname === option.path ? 'active' : ''}
                onMouseEnter={() => handleMouseEnter(option.label)}
                onMouseLeave={handleMouseLeave}
              >
                <a onClick={() => navigate(option.path)}>{option.label}</a>
              </li>
            ))}
          </ul>
          {authUser ? (
            <div>
              {profilePhoto ? (
                <img onClick={handleMenuItemClick} className={`svgButtons ${isOpen ? 'open' : 'closed'}`} width='45px' height='45px' src={profilePhoto} alt="Profile" />
              ) : (
                <img onClick={handleMenuItemClick} className={`svgButtons ${isOpen ? 'open' : 'closed'}`} width='45px' height='45px' src="https://res.cloudinary.com/dkyu0tmfx/image/upload/v1715205192/profileImages/profile_1_i39bhb.png" alt="Default Profile" />
              )}
            </div>
          ) : (
            <p>
              <a style={{ marginRight: "5pt" }} onClick={handleSignUpClick}>SIGN UP</a>|
              <a style={{ marginLeft: "5pt", marginRight: "15pt" }} onClick={handleSignInClick}>SIGN IN</a>
            </p>
          )}
        </>
      )}

      {isOpen && authUser && <div className='noborder' isOpen={isOpen} userData={authUser} />}
      <MenuOptions isOpen={isOpen} userData={authUser}>
        {authUser && (
          <div className='option1'>
            <div className='infoUser'>
              <p className='userNameText'>{authUser.first_name} {authUser.last_name}</p>
              <p className='userEmailText'>{authUser.email}</p>
            </div>
          </div>
        )}
        {authUser && (
          <div className='option op3'>
            <div onClick={redirectToProfile} className='optionMenu'>PROFILE<FontAwesomeIcon className='svgArrow3' icon={faArrowLeft} /></div>
          </div>
        )}
        {authUser ? (
          <div className='option op4' onClick={handleLogout}>
            <div className='optionMenu'>LOGOUT<FontAwesomeIcon className='svgArrow4' icon={faArrowLeft} /></div>
          </div>
        ) : (
          <div onClick={handleSignUpClick} className="option op4 sign-in-active">
            <div className='optionMenu'>SIGN UP<FontAwesomeIcon className='svgArrow4' icon={faArrowLeft} /></div>
          </div>
        )}
      </MenuOptions>
    </nav>
  );
}

export default Navbar;