import React, { useEffect, useState } from 'react';
import { Navigate, redirect } from 'react-router-dom';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

const InvalidURL = () => {
 const [open, setOpen] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
   redirect('/home');
   setOpen(true);
  }, 300);

  return () => {
   clearTimeout(timer);
  };
 }, []);

 return (
  <Box
   sx={{
    display: 'flex',
    position: 'absolute',
    color: 'white',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
   }}
  >
   <Fade in={open}>
    <Box sx={{ color: 'white', fontSize: '30px' }}>
     Forbidden, but feel free to explore.
    </Box>
   </Fade>
  </Box>
 );
};

export default InvalidURL;
