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
            onClick={handleAvatarClick} 
            color="inherit"
            >
            <Avatar src="/avatar.jpg" alt="Avatar" sx={{ width: 32, height: 32, border: isAvatarClicked ? '2px solid black' : 'none' }} />
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
                >
                  <ProfileInfo>
                    <div className="infos">
                      <h2 style={{'margin': '0', 'font-weight': '700'}}>Paulo</h2>
                      <p>pricardo2102@gmail.com</p>
                    </div>
                    <Avatar>A</Avatar>
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
