import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ handleLogout, isGuest }) => {
 return (
  <Box sx={{ flexGrow: 1 }}>
   <AppBar position="static">
    <Toolbar>
     <Typography
      variant="h6"
      component="div"
      sx={{ flexGrow: 1, fontFamily: 'Sans Serif' }}
     >
      Halamanan
     </Typography>
     <Box>
      {isGuest && (
       <NavLink
        to="/login"
        underline="none"
       >
        {' '}
        Login{' '}
       </NavLink>
      )}
      {/* //   : 
      
    //   (


    //    //  <LoginPage />
    //    <NavLink
    //     to="/home"
    //     underline="none"
    //    >
    //     Home
    //    </NavLink>
    //   )} */}

      {!isGuest && (
       <NavLink
        to="/designs"
        underline="none"
       >
        Designs
       </NavLink>
      )}
      <NavLink
       to="/gallery"
       underline="none"
      >
       Gallery
      </NavLink>
      <NavLink
       to="/about"
       underline="none"
      >
       How To Use
      </NavLink>
      {!isGuest && (
       <NavLink
        to="/profile"
        underline="none"
       >
        Profile
       </NavLink>
      )}
      {!isGuest && (
       <NavLink
        to="/login"
        // underline="none"
        onClick={handleLogout}
       >
        Logout
       </NavLink>
      )}

      {isGuest && (
       //    <NavLink
       //     className="no-decoration"
       //     to="/login"
       //    >
       <NavLink to="/login">
        <Button
         variant="contained"
         //  onClick={() => handleJoin()}
         sx={{
          bgcolor: 'orange',
          height: '40px',
          color: 'primary.main',
          ':hover': { bgcolor: 'white', color: 'primary.main' },
         }}
        >
         Sign Up
        </Button>
       </NavLink>
      )}
     </Box>
    </Toolbar>
   </AppBar>
  </Box>
 );
};

export default NavBar;
