import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

const AdminNavBar = ({ handleLogout }) => {
 return (
  <Box sx={{ flexGrow: 1 }}>
   <AppBar position="static">
    <Toolbar>
     <Typography
      variant="h6"
      component="div"
      sx={{ flexGrow: 1, cursor: 'pointer' }}
     >
      Halamanan
     </Typography>
     <Box>
      <NavLink
       to="/login"
       underline="none"
       onClick={handleLogout}
      >
       Logout
      </NavLink>
     </Box>
    </Toolbar>
   </AppBar>
  </Box>
 );
};

export default AdminNavBar;
