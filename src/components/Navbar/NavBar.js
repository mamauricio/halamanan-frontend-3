import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ handleLogout }) => {
  const handleHome = () => {
    // useNavigate``;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            onClick={handleHome}
            sx={{ flexGrow: 1, cursor: 'pointer' }}
          >
            {/* <NavLink to="/home"> */} Halamanan
          </Typography>
          <Box>
            <NavLink to="/home" underline="none">
              Home
            </NavLink>
            <NavLink to="/designs" underline="none">
              Designs
            </NavLink>
            <NavLink to="/gallery" underline="none">
              Gallery
            </NavLink>
            <NavLink to="/about" underline="none">
              About
            </NavLink>
            <NavLink to="/profile" underline="none">
              Profile
            </NavLink>
            <NavLink to="/login" underline="none" onClick={handleLogout}>
              Logout
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
