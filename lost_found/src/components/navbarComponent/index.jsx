import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, ListSubheader, ListItemIcon, ListItemText, Popover, ListItem, List, createTheme, ThemeProvider } from '@mui/material';
import { AccountCircle, Brightness4, Brightness7, ExpandMore, Refresh } from '@mui/icons-material';
import { AuthContext } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import styled from "styled-components";

const Navbar = () => {
  const [submenuAnchorLost, setSubmenuAnchorLost] = useState(null);
  const [submenuAnchorAuctions, setSubmenuAnchorAuctions] = useState(null);
  const [submenuAnchorProfile, setSubmenuAnchorProfile] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); 
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    
    
  };
  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? 'dark' : 'light',
    },
    typography: {
        fontFamily: 'Segoe UI, sans-serif',
      },
  });

  const handleAvatarClick = (event) => {
    setIsAvatarClicked(true);
    setAnchorEl(event.currentTarget); // Set anchorEl
  };

  const handleAvatarClose = () => {
    setIsAvatarClicked(false);
  };

  const handleSubmenuLostClick = (event) => {
    setSubmenuAnchorLost(event.currentTarget);
  };

  const handleSubmenuAuctionsClick = (event) => {
    setSubmenuAnchorAuctions(event.currentTarget);
  };

  const handleSubmenuProfileClick = (event) => {
    setSubmenuAnchorProfile(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorLost(null);
    setSubmenuAnchorAuctions(null);
    setSubmenuAnchorProfile(null);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  const SvgMenu = styled.svg`

  display: flex;

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
  const ProfileInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    .infos {
      display: flex;
      flex-direction: column;
      align-items: start;
    }
    p {
        margin: 0;
    }
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
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color={isDarkTheme ? "transparent" : "transparent"}  style={{boxShadow: 'none'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="toggle theme"
              onClick={handleThemeToggle}
              color="inherit"
            >
              {isDarkTheme ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            >
            <SignBtn className="main-btn">
            <span>Sign Up</span>
            <SvgMenu xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M7 0.999969L11 5.00003M11 5.00003L7 9.00003M11 5.00003H1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </SvgMenu>
          </SignBtn>    
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAvatarClick} 
            color="inherit"
            >
            <MenuBtn className="menu-btn">MENU
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="white">
                <path d="M1.30275 9.28441C0.583262 9.28441 0 8.70114 0 7.98165V7.98165C0 7.26216 0.583262 6.6789 1.30275 6.6789H6.68709V1.31291C6.68709 0.587812 7.2749 0 8 0V0C8.7251 0 9.31291 0.58781 9.31291 1.31291V6.6789H14.6972C15.4167 6.6789 16 7.26216 16 7.98165V7.98165C16 8.70114 15.4167 9.28441 14.6972 9.28441H9.31291V14.6871C9.31291 15.4122 8.7251 16 8 16V16C7.2749 16 6.68709 15.4122 6.68709 14.6871V9.28441H1.30275Z"  transform="scale(0.85)" stroke='#393737' fill="white"/>
              </svg>
          </MenuBtn>     
          </IconButton>
            <Popover
              id="menu-appbar"
              open={isAvatarClicked}
              anchorEl={anchorEl}
              onClose={handleAvatarClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{ 
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{ '& .MuiPaper-root': { boxShadow: 'none' } }}
            >
              <List sx={{ width: 'auto' }}>

                <ListItem
                ><Avatar>A</Avatar>
                  <ProfileInfo>
                    <div className="infos">
                      <h2 style={{'margin': '0', 'font-weight': '700'}}>Paulo</h2>
                      <p>pricardo2102@gmail.com</p>
                    </div>
                    
                  </ProfileInfo>
                </ListItem>
                <ListItem
                  button
                  onMouseEnter={() => setHoveredOption('lost')}
                  onMouseLeave={() => setHoveredOption(null)}
                  onClick={handleSubmenuLostClick}
                  sx={{
                    backgroundColor: hoveredOption === 'lost' ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    '&:hover .MuiListItemIcon-root': {
                      visibility: 'visible',
                    },
                  }}
                >
                  <ListItemText primary="Lost" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                <ellipse cx="4.1469" cy="4" rx="3.86565" ry="4" fill="#001431"/>
              </svg>
                  <ExpandMore style={{ visibility: hoveredOption === 'lost' ? 'visible' : 'hidden' }} />
                </ListItem>
                <Menu
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  id="submenu-lost"
                  anchorEl={submenuAnchorLost}
                  open={Boolean(submenuAnchorLost)}
                  onClose={handleSubmenuClose}
                  sx={{ '& .MuiPaper-root': { boxShadow: 'none' } }}
                >
                  <MenuItem onClick={handleSubmenuClose}>Register Lost Object</MenuItem>
                  <MenuItem onClick={handleSubmenuClose}>Browse Found Objects</MenuItem>
                  <MenuItem onClick={handleSubmenuClose}>My Lost Objects</MenuItem>
                </Menu>

                <ListItem
                  button
                  onMouseEnter={() => setHoveredOption('auctions')}
                  onMouseLeave={() => setHoveredOption(null)}
                  onClick={handleSubmenuAuctionsClick}
                  sx={{
                    backgroundColor: hoveredOption === 'auctions' ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    '&:hover .MuiListItemIcon-root': {
                      visibility: 'visible',
                    },
                  }}
                >
                  <ListItemText primary="Auctions" />
                  <ExpandMore style={{ visibility: hoveredOption === 'auctions' ? 'visible' : 'hidden' }} />
                </ListItem>
                <Menu
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  id="submenu-auctions"
                  anchorEl={submenuAnchorAuctions}
                  open={Boolean(submenuAnchorAuctions)}
                  onClose={handleSubmenuClose}
                  sx={{ '& .MuiPaper-root': { boxShadow: 'none' } }}
                >
                  <MenuItem onClick={handleSubmenuClose}>My Auctions</MenuItem>
                  <MenuItem onClick={handleSubmenuClose}>Browse Auctions</MenuItem>
                  <MenuItem onClick={handleSubmenuClose}>?????</MenuItem>
                </Menu>

                <ListItem
                  button
                  onMouseEnter={() => setHoveredOption('profile')}
                  onMouseLeave={() => setHoveredOption(null)}
                  onClick={handleSubmenuProfileClick}
                  sx={{
                    backgroundColor: hoveredOption === 'profile' ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    '&:hover .MuiListItemIcon-root': {
                      visibility: 'visible',
                    },
                  }}
                >
                  <ListItemText primary="Profile settings" />
                  <ExpandMore style={{ visibility: hoveredOption === 'profile' ? 'visible' : 'hidden' }} />
                </ListItem>
                <Menu
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  id="submenu-profile"
                  anchorEl={submenuAnchorProfile}
                  open={Boolean(submenuAnchorProfile)}
                  onClose={handleSubmenuClose}
                  sx={{ '& .MuiPaper-root': { boxShadow: 'none' } }}
                >
                  <MenuItem onClick={handleSubmenuClose}>Edit Profile</MenuItem>
                  <MenuItem onClick={handleSubmenuClose}>Change Password</MenuItem>
                  <MenuItem onClick={handleSubmenuClose}>Privacy Settings</MenuItem>
                </Menu>

                <ListItem
                  button
                  onClick={handleAvatarClose}
                  sx={{
                    '&:hover .MuiListItemIcon-root': {
                      visibility: 'visible',
                    },
                  }}
                >
                  <ListItemText primary="Logout" onClick={handleLogout} />
                </ListItem>
              </List>
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
