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
      Halamanan - Admin
     </Typography>
     <Box>
      <NavLink
       to="/admin/dashboard"
       underline="none"
      >
       Dashboard
      </NavLink>

      <NavLink
       to="/admin/users"
       underline="none"
      >
       User Management
      </NavLink>
      <NavLink
       to="/admin/items"
       underline="none"
      >
       Item Management
      </NavLink>
      <NavLink
       to="/admin/design-quotes"
       underline="none"
      >
       Design Quotes
      </NavLink>

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
