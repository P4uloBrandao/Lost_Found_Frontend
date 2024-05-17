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


const MenuOptions = styled.div`
display: ${props => props.isOpen ? 'block' : 'none'};  border-radius: 20px;
  position: absolute;
  top: ${props => props.authUser === null ? '73pt !important' : '121pt !important'}; 
    
    right:${props => props.authUser === null ? '-22pt !important' : '34pt !important'}; 
  background-color: var(--white-color);
  height: ${props => props.authUser === null ? '93pt !important' : '168pt !important'}; 
  padding: 15pt 0pt 15pt 15pt ;
  width : 100vh;
  border: solid 1px black ;

  
  
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
  const { 
    setAuthUser,
    authUser,
    isLoggedIn,
    setIsLoggedIn,logout} = useAuth();
    
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const [selectedOption, setSelectedOption] = useState('Home');
  const options = ['Home','Ojects', 'Police station','Profile'];
  const [hoveredOption, setHoveredOption] = useState(null);

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
  const handleClick = (option) => {
    
    setSelectedOption(option); 

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

  return (
    <nav class="mask">
      <img className="logo" href='/' src={Logo} alt="" />
      {location.pathname !== '/signup' &&location.pathname !== '/login' && (
      <>
      <ul class="list">
        <li><a href="#">Home</a></li>
        <li><a href="#">Auctions</a></li>
        <li><a href="#">I lost something!</a></li>
        
      </ul>
      {authUser ? (
        <div>
          <img onClick={handleMenuItemClick} className={`svgButtons ${isOpen ? 'open' : 'closed'}'imgMenu'`} width='70px' height='70px' src={Teste} alt="" />
        
        </div>
        ) : (
        <p><a href="#">SIGN UP</a></p>
      )}
        
        </>
      )}
         
               
         {isOpen && <MenuOptions className='noborder' isOpen={isOpen} userData={authUser} />}          
            
            <MenuOptions isOpen={isOpen} authUser={authUser} > 
                  {authUser && (
                     <div className='option1'>
                        <div>
                          <img className='imgMenu' width='40px' height='40px' src={authUser.profileImage} alt="" />
                        </div>
                      <div className='infoUser'>
                        <p className='userNameText'>{authUser.first_name} {authUser.last_name}</p>
                        <p className='userEmailText'>{authUser.email}</p>
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

                {authUser &&  <div className='option op3'>
               <div className='optionMenu'>PROFILE<FontAwesomeIcon  className='svgArrow3' icon={faArrowLeft} /></div>
               <div className='subMenu2'>

                <div className=' menuOptions3'>
                  <div  className='option op31 'onClick={redirectToProfile}> <div className='ml-13'>EDIT PROFILE<FontAwesomeIcon className='svgArrow31' icon={faArrowLeft} /></div></div>
                  <div  className='option op32'> <div className='ml-13'>PRIVACY SETTINGS<FontAwesomeIcon className='svgArrow32' icon={faArrowLeft} /></div></div>
                  </div>
                </div>
              </div>}
              {authUser ? (
                  <div className=' option op4' onClick={handleLogout}><div className='optionMenu'>LOGOUT<FontAwesomeIcon className='svgArrow4' icon={faArrowLeft} /></div></div>
                ) : (
                  <div onClick={handleSignUpClick} className=" option op4  sign-in-active"><div className='optionMenu' >SIGN UP<FontAwesomeIcon className='svgArrow4' icon={faArrowLeft} /></div></div>
                )}
              
               </ MenuOptions>  
        
                
</nav>

  );
}

export default Navbar;
