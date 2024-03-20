import React, { useEffect, useRef, useState } from 'react';
import Logo from "../../assets/logo/logo.png"
import Avatar from '@mui/material/Avatar';
import styled , { keyframes } from 'styled-components';

// Styled components
const Header = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  width: min(100%, 1440px);
  background-color: transparent;
  padding: 12px 6px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 75px;
  padding: 12px;
  position: relative;
`;

const HeaderLogo = styled.div`
  display: flex;
  scale: 0.7;
  align-items: center;
  gap: 8px;

  img {
    
    position: relative;
  }
`;

const StyledAvatar = styled(Avatar)`
  width: min-content;
  align-self: center;
`;

const HeaderNav = styled.div`
  width: min(95%, 320px);
  height: 100%;
  position: relative;
`;
const slideFromTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;
const StyledUL = styled.ul`
  display: ${props => (props.menuOpen ? 'flex' : 'none')};
  transition: opacity 0.3s ease; /* Animação de desaparecimento */
  animation: ${slideFromTop} 0.3s ease; /* Animação de deslizamento */
  height: ${props => (props.menuOpen ? 'auto' : '0')};
  width: 219px;
  background-color: white;
  list-style: none;
  
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  position: absolute;
  padding: 20px 24px;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  right: 0;

  &.top-menu {
    top: 20px;
    position: relative;
    left: 80px;
  }

  &.bottom-menu {
    bottom: 0;
    gap: 20px;
    margin-top: 24px;
  }
`;

const StyledLI = styled.li`
  width: 90%;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 14px;
  border-radius: 6px;

 
  & i{
    font-size: 1.25rem;
}

  &:hover{
      background-color: #393737;
      cursor: pointer;
      color: #fff;
  }
`;

const StyledA = styled.a`
  min-height: 100%;
  width: 100%;
  text-decoration: none;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--main-text-color);
`;
const ThemeChange = styled.div`
  svg {
    fill: #22272F;
  }
`;
const HeaderNavBtns = styled.div`

display: flex;
    float: right;
    gap: 20px;

`;
const SignBtn = styled.button`
  display: flex;
  border: black 1px solid;
  padding: 12px 14px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-radius: 24px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background-color: white;
  color: var(--main-text-color);
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }
`;
const SvgMenu = styled.svg`

  display: flex;

`;
const MenuBtn = styled.button`
display: flex;
padding: 12px 14px;
justify-content: space-between;
align-items: center;
gap: 8px;
border-radius: 24px;
/* font-size: 12px; */
/* font-style: normal; */
/* font-weight: 400; */
/* line-height: 24px; */
letter-spacing: 0.5px;
text-transform: uppercase;
background-color: #000000c2;
color: white;
cursor: pointer;


  &:hover {
    background-color: rgb(81, 78, 78);
    /* Corrected syntax: concatenate selectors directly */
    ${SvgMenu} path {
      stroke: black;
    }
  }
`;

const UserNavInfo = styled.div`

  display: flex;

`;
const NavUserName = styled.div`
  font-size: 12px;
  margin-left: 15px;
  `;

const NavUserAvatar  = styled.div`
  width: min-content;
  align-self: center;
`;
function Navbar() {
  const themeChangeBtnRef = useRef(null);
  const menuBtnRef = useRef(null);
  const menuIconRef = useRef(null);
  const menuIconPathRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const themeChangeBtn = themeChangeBtnRef.current;
    const menuIcon = menuIconRef.current;
    const menuIconPath = menuIconPathRef.current;
    
  }, []);

  const handleMenuBtnClick = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen)
  };

  return (
    <Header className="header">
      <HeaderLogo className="header-logo">
        <img src={Logo} alt="logo Bid Finder" />
      </HeaderLogo>
      <HeaderNav className="header-nav">
      <HeaderNavBtns className="header-nav__btns">
          <ThemeChange className="theme-change" ref={themeChangeBtnRef}>
            
          </ThemeChange>
          <SignBtn className="main-btn">
            <span>Sign Up</span>
            <SvgMenu xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M7 0.999969L11 5.00003M11 5.00003L7 9.00003M11 5.00003H1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </SvgMenu>
          </SignBtn>
          <MenuBtn className="menu-btn" onClick={handleMenuBtnClick} ref={menuBtnRef}>
            <span>Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="white">
                <path d="M1.30275 9.28441C0.583262 9.28441 0 8.70114 0 7.98165V7.98165C0 7.26216 0.583262 6.6789 1.30275 6.6789H6.68709V1.31291C6.68709 0.587812 7.2749 0 8 0V0C8.7251 0 9.31291 0.58781 9.31291 1.31291V6.6789H14.6972C15.4167 6.6789 16 7.26216 16 7.98165V7.98165C16 8.70114 15.4167 9.28441 14.6972 9.28441H9.31291V14.6871C9.31291 15.4122 8.7251 16 8 16V16C7.2749 16 6.68709 15.4122 6.68709 14.6871V9.28441H1.30275Z"  transform="scale(0.85)" stroke='#393737' fill="white"/>
              </svg>
          </MenuBtn>
        </HeaderNavBtns>
        <StyledUL className={`header-nav__menu top-menu ${menuOpen ? 'open' : ''}`} menuOpen={menuOpen}>
          <StyledLI className="active">
            <UserNavInfo className='user'>
              <NavUserAvatar className='col user-avatar'>
                <StyledAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </NavUserAvatar>
              <NavUserName className='col user-info'>
                <div className='row' ><p>Goncalo Domingues</p></div>
                <div className='row' ><p>grcdomingues@gmail.com</p></div>
              </NavUserName>
            </UserNavInfo>
          </StyledLI>
          <StyledLI className="active">
            <StyledA href="/">
              <span>LOST</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                <ellipse cx="4.1469" cy="4" rx="3.86565" ry="4" fill="#001431"/>
              </svg>
            </StyledA>
          </StyledLI>
          <StyledLI>
            <StyledA href="/">
              <span>AUCTIONS</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="#001431">
                <path d="M7 0.999969L11 5.00003M11 5.00003L7 9.00003M11 5.00003H1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#001431"/>
              </svg>
            </StyledA>
          </StyledLI>
          <StyledLI>
            <StyledA href="/profile">
              <span>PROFILE</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="#001431">
                <path d="M7 0.999969L11 5.00003M11 5.00003L7 9.00003M11 5.00003H1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#001431"/>
              </svg>
            </StyledA>
          </StyledLI>
          <StyledLI>
            <StyledA href="/">
              <span>logout</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="#001431">
                <path d="M7 0.999969L11 5.00003M11 5.00003L7 9.00003M11 5.00003H1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#001431"/>
              </svg>
            </StyledA>
          </StyledLI>
        </StyledUL>
      </HeaderNav>
    </Header>
  );
}

export default Navbar;
