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
import NavMobile from '../NavBarMobile/index.jsx';

const MenuOptions = styled.div`
display: ${props => props.isOpen ? 'block' : 'none'};  border-radius: 20px;
  position: absolute;
  top: ${props => props.authUser === null ? '70pt !important' : '68pt !important'}; 
    
    right:${props => props.authUser === null ? '-22pt !important' : '38pt !important'}; 
  background-color: var(--white-color);
  padding: 15pt 0pt 15pt 15pt ;
  width : auto;
 maring : 0 auto;

  font-size: smaller;
  border: solid 1px black ;

  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.9)'};
 
    @media (max-width: 1000px) {
        transform:scale(0.9);
        top: 58pt !important;
        right: 8pt !important;
        }
    @media (max-width: 720px) {
        transform: scale(0.8);
        top: 43pt !important;
        right: -6pt !important;
        }

    @media (max-width: 450px) {
        transform: scale(0.7);
        top: 43pt !important;
        right: -6pt !important;
        }        
    @media (max-width: 380px) {
        transform: scale(0.6);
        top: 19pt !important;
        right: -27pt !important;
        }
        
}
  }
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
const MenuPages = styled.div`
width: -webkit-fill-available;
max-width: 622pt;
margin: auto;
display: flex;
flex-direction: row;
background-color: white;
border-radius: 20px;
overflow: hidden;
position: relative;
height: 8vh;


`;
const LogoDiv = styled.div`
position: absolute;


`;
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthUser, authUser, isLoggedIn, setIsLoggedIn, logout, userRole } = useAuth();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const menuRef = useRef();
  const [selectedOption, setSelectedOption] = useState('Home');
  const [hoveredOption, setHoveredOption] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleMenuItemClick = () => {
    setIsOpen(!isOpen);
   if (isOpen) {
      setOpenMenu(null);
    }
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
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    
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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Verifica se há uma diferença de pelo menos 150px entre a posição anterior e a atual
      if (Math.abs(currentScrollY - prevScrollY) >= 150) {
        setIsOpen(false);
        // Atualiza a posição anterior de rolagem
        setPrevScrollY(currentScrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setAuthUser(null);
    setIsOpen(!isOpen);
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
    setIsOpen(!isOpen)
    navigate('/profile/profile');
  };

  const redirectToLostObjects = () => {
    setIsOpen(!isOpen);
    navigate('/profile/myLostObjects');
  };

  const registerLost = () => {
    setIsOpen(!isOpen);
    navigate('/addLostObject');
  };

  const handlerAdminPage = () => {
    setIsOpen(!isOpen);
    navigate('/adminPage');
  };

  const handleMouseEnter = (option) => {
    setHoveredOption(option);
  };
  const toggleMenu = (menu) => {
    if (menu === 'profile') {
      setIsOpen(!isOpen);
      setOpenMenu(null); // Close any submenu when the main menu is toggled
    } else {
      setOpenMenu(openMenu === menu ? null : menu);
    }
  };
  const handleMouseLeave = () => {
    setHoveredOption(null);
  };
  const redirectToAuction = () => {
    navigate('/auctions');
  };
  const redirectToPolice = () => {
    navigate('/police');
  };
  if (loading) {
    return <div>Carregando...</div>;
  }

  const options = [
    { label: 'Home', path: '/' },

    { label: userRole !== "Police" ? 'Lost' : '', path: '/profile/myLostObjects' },
    { label: userRole === "Police" ? 'New found object' : '', path: '/police' },

    { label: userRole !== "Police" ? 'Auctions' : '', path: '/auctions' },
    { label: userRole !== "Police" ? 'I lost something!' : '', path: '/addLostObject' },
    { label: userRole === "Admin" ? 'Admin settings' : '', path: '/adminPage' }
  ].filter(option => option.label);

  return (
    <nav>
       <img onClick={handleHomeClick} className="logo" src={Logo} alt="Logo" />
      
      { (
        location.pathname !== '/signup' && location.pathname !== '/login' && (
          <>
          {!isSmallScreen && (
            <MenuPages>
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
            </MenuPages>)}
            {authUser ? (
              <div style={{ margin: 'auto' }}>
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
        )
      )}

      {isOpen && authUser && <div className='noborder' isOpen={isOpen} userData={authUser} />}
      <MenuOptions isOpen={isOpen} userData={authUser}>
        {authUser && (
          <div className='option1'>
          <div>
            {!!profilePhoto && <img className='imgMenu' width='40px' height='40px' src={profilePhoto} alt="" />}
            {!profilePhoto && <img className='imgMenu' width='40px' height='40px' src="https://res.cloudinary.com/dkyu0tmfx/image/upload/v1715205192/profileImages/profile_1_i39bhb.png" alt="" />}
          </div>
          <div className='infoUser'>
      {userData && (
        <>
          <p className='userNameText'>{userData.first_name} {userData.last_name}</p>
          <p className='userEmailText'>{userData.email}</p>
        </>
      )}
    </div>
        </div>
        )}
        {isSmallScreen && userRole!=="Police" && (
         <> <div className='option op2'onClick={redirectToAuction}>
          <div className='optionMenu' > AUCTIONS<FontAwesomeIcon className='svgArrow2' icon={faArrowLeft} /></div>
         
        </div>
        
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
      </>
      )}
         
        {authUser && (
          <div className='option op3'>
            <div onClick={redirectToProfile} className='optionMenu'>PROFILE<FontAwesomeIcon className='svgArrow3' icon={faArrowLeft} /></div>
          </div>
         
        )}
         {isSmallScreen &&authUser && userRole==="Admin" && (
            <div className='option op3'>
              <div onClick={redirectToProfile} className='optionMenu'>ADMIN SETTINGS<FontAwesomeIcon className='svgArrow3' icon={faArrowLeft} /></div>
            </div>
          )}
          {isSmallScreen && authUser && userRole==="Police" && (
          <div className='option op5'onClick={redirectToPolice}>
          <div className='optionMenu' > NEW FOUND OBJECT<FontAwesomeIcon className='svgArrow5' icon={faArrowLeft} /></div>
         
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