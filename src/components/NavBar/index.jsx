import React, { useState, useContext, useEffect,useRef  } from 'react';
import Logo from "../../assets/logo/logo.png"
import teste from "../../assets/teste.png"
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


const MenuOptions = styled.div`
display: ${props => props.isOpen ? 'block' : 'none'};  border-radius: 20px;
  position: relative;
  top: ${props => props.userData === null ? '90pt !important' : '121pt !important'}; 
    
    left:${props => props.userData === null ? '-15pt !important' : '-7pt !important'}; 
  background-color: var(--white-color);
  height: ${props => props.userData === null ? '93pt !important' : '168pt !important'}; 
  padding: 15pt 0pt 15pt 15pt ;
  width : 15em;
  border: solid 1px black ;

    
  
`;
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    setAuthUser,
    authUser,
    isLoggedIn,
    setIsLoggedIn,logout} = useAuth();
    
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const menuRef = useRef();

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

  function getProfileData(id) {

  }

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
                  setProfilePhoto(response.data.image)
                  setUserData(userProfileData);
                  setLoading(false);
                })
                .catch((error) => {
                  console.log("Failed to fetch user profile:", error);
                  setLoading(false);
                  setUserData(null);
                });
          } else {
            setUserData(userProfileData);
            setAuthUser(userProfileData)
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
    logout()
    setIsLoggedIn(false)
    setAuthUser(null)
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
  

  const redirectToProfile = () => {
    navigate('/profile'); 
  };

  const redirectToLostObjects = () => {
    navigate('/myLostObjects'); 
  };
  const registerLost = () => {
    navigate('/addLostObject'); 
  };
  return (
    <div>
      <nav id="navbar">
        <div className='logoItem'>
          <img src={Logo} alt="Brand logo" />
        </div>
        {location.pathname !== '/signup' &&location.pathname !== '/login' && (
        <div className='buttonsSide'>
          <Toggle/>
          { !userData && ( // Condição para ocultar botões na página de login
            <div onClick={handleSignInClick} className='signInItem'>SIGN IN <FontAwesomeIcon className='svgButtons' icon={faArrowRight} /></div>
          )}
          
            <div className='menuItem' onClick={handleMenuItemClick}>
            <div className='menuItemText'>
        MENU
        <FontAwesomeIcon
          className={`svgButtons ${isOpen ? 'open' : 'closed'}`}
          icon={isOpen ? faMinus : faPlus}
        />
      </div>
      {isOpen && <MenuOptions className='noborder' isOpen={isOpen} userData={userData} />}          
            
            <MenuOptions isOpen={isOpen} userData={userData} > 
               
               
                  
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
                
                <div className='option op1'>
                 <div className='optionMenu'> LOST <FontAwesomeIcon className='svgArrow1' icon={faArrowLeft} /></div>
                  <div className='subMenu1'>
                    <div className='menuOptions1'>
                    <div  className=' op11' onClick={registerLost}> <div className='align11' >REGISTER LOST<FontAwesomeIcon className='svgArrow11' icon={faArrowLeft} /></div></div>
                    <div  className=' op12'onClick={redirectToLostObjects} > <div className='align11'>MY LOST<FontAwesomeIcon className='svgArrow12' icon={faArrowLeft} /></div></div>
                  </div></div>
                  
                </div>
                <div className='option op2'>
                 <div className='optionMenu'> AUCTIONS<FontAwesomeIcon className='svgArrow2' icon={faArrowLeft} /></div>
                 <div className='subMenu2'>
                  <div className='menuOptions2'>
                    <div className='option op21'> <div className='ml-13'>BROWSE AUCTIONS <FontAwesomeIcon className='svgArrow21' icon={faArrowLeft} /></div></div>
                    <div  className='option op22'> <div className='ml-13'>MY AUCTIONS <FontAwesomeIcon className='svgArrow22' icon={faArrowLeft} /></div></div>
                  </div>
                  </div>
                </div>

                {userData &&  <div className='option op3'>
               <div className='optionMenu'>PROFILE<FontAwesomeIcon  className='svgArrow3' icon={faArrowLeft} /></div>
               <div className='subMenu2'>

                <div className=' menuOptions3'>
                  <div  className='option op31 'onClick={redirectToProfile}> <div className='ml-13'>EDIT PROFILE<FontAwesomeIcon className='svgArrow31' icon={faArrowLeft} /></div></div>
                  <div  className='option op32'> <div className='ml-13'>PRIVACY SETTINGS<FontAwesomeIcon className='svgArrow32' icon={faArrowLeft} /></div></div>
                  </div>
                </div>
              </div>}
              {userData ? (
  <div className=' option op4' onClick={handleLogout}><div className='optionMenu'>LOGOUT<FontAwesomeIcon className='svgArrow4' icon={faArrowLeft} /></div></div>
) : (
  <div onClick={handleSignUpClick} className=" option op4  sign-in-active"><div className='optionMenu' >SIGN UP<FontAwesomeIcon className='svgArrow4' icon={faArrowLeft} /></div></div>
)}
              
               </ MenuOptions>
               
            </div> 
          
        </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
