import React from 'react';
import { Box, Typography } from '@mui/material';

const ProfileSideBar = ({ handleChange, value }) => {
 return (
  <Box
   component="nav"
   sx={{
    color: 'primary.main',
    borderRight: 1,
    borderColor: 'divider',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
   }}
  >
   <Box
    onClick={(event) => handleChange(event, 0)}
    sx={{
     py: 2,
     px: 2,
     mr: 2,
     borderRadius: 2,
     cursor: 'pointer',
     color: value === 0 ? 'orange' : 'rgba(255,255,255,0.7)',
     borderBottom: '2px',
     borderColor: 'divider',
     bgcolor: value === 0 ? 'primary.main' : 'transparent',
    }}
   >
    <Typography>Information</Typography>
   </Box>
   <Box
    onClick={(event) => handleChange(event, 1)}
    sx={{
     py: 2,
     px: 2,
     mr: 2,
     borderRadius: 2,

     color: value === 1 ? 'orange' : 'rgba(255,255,255,0.7)',
     bgcolor: value === 1 ? 'primary.main' : 'transparent',
     cursor: 'pointer',
    }}
   >
    <Typography>Requested Items</Typography>
   </Box>
  </Box>
 );
};

export default ProfileSideBar;
