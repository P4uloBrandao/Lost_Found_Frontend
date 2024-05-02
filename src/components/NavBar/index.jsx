import React, { useState, useContext, useEffect,useRef  } from 'react';
import Logo from "../../assets/logo/logo.png"
import teste from "../../assets/teste.png"
import styled , { keyframes } from 'styled-components';
import './style.css';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Toggle } from "../darkmode/index";
import { useLocation } from 'react-router-dom';


const MenuOptions = styled.div`
display: ${props => props.isOpen ? 'block' : 'none'};  border-radius: 20px;
  /* border: solid 1px black; */
  position: relative;
  top: 52pt;
  width: 167pt;
  left: -191pt;
  background-color: white;
  height: ${props => props.userData === null ? '93pt !important' : '168pt !important'}; 
  padding: 15pt;
  
`;
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const handleMenuItemClick = () => {
    console.log(isOpen)
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
          const response = await axios.get(`http://34.125.56.18/api/users/profile/${token}`);
          const userProfileData = response.data.currentUser;
          setUserData(userProfileData);
          setLoading(false);
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
        {location.pathname !== '/signup' &&location.pathname !== '/login' && (
        <div className='buttonsSide'>
          <Toggle/>
          { !userData && ( // Condição para ocultar botões na página de login
            <div onClick={handleSignInClick} className='signInItem'>SIGN IN</div>
          )}
          
            <div className='menuItem' onClick={handleMenuItemClick}>
              <div className='menuItemText'>MENU <i class="fas fa-angle-down"></i></div> 
              
            </div> 
            <MenuOptions isOpen={isOpen} userData={userData} > 
               
               
                  
                  {userData && (
                     <div className='option1'>
                        <div>
                          <img className='imgMenu' width='40px' height='40px' src={teste} alt="" />
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
                    <div  className=' op11'> <div className='align11' >REGISTER LOST<FontAwesomeIcon className='svgArrow11' icon={faArrowLeft} /></div></div>
                    <div  className=' op12'> <div className='align11'>MY LOST<FontAwesomeIcon className='svgArrow12' icon={faArrowLeft} /></div></div>
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
                  <div  className='option op31 '> <div className='ml-13'>EDIT PROFILE<FontAwesomeIcon className='svgArrow31' icon={faArrowLeft} /></div></div>
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
        )}
      </nav>
    </div>
  );
}

export default Navbar;
