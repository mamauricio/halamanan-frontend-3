import React, { useState, useEffect, Suspense } from 'react';
import GardenCarousel from './Carousel/GardenCarousel';
import { Container, Box, Grid, Fade } from '@mui/material';
const UserDesigns = React.lazy(() =>
 import('../Design/UserDesigns/UserDesigns')
);

const Home = () => {
 const [initialize, setInitialize] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
   setInitialize(true);
  }, 100);
 }, []);

 return (
  <Fade in={initialize}>
   <Box
    className="mainBackground"
    sx={{
     position: 'absolute',
     left: '50%',
     top: '50%',
     transform: 'translate(-50%,-50%)',
     height: '100%',
     width: '100%',
     bgcolor: 'primary.main',
     justifyContent: 'center',
     zIndex: -1,
    }}
   ></Box>
  </Fade>
 );
};

export default Home;
