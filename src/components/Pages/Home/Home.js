import React, { useState, useEffect, Suspense } from 'react';
import GardenCarousel from './Carousel/GardenCarousel';
import { Container, Box, Grid, Fade } from '@mui/material';
// import UserDesigns from '../Design/UserDesigns/UserDesigns';
const UserDesigns = React.lazy(() =>
 import('../Design/UserDesigns/UserDesigns')
);

// const Admin = React.lazy(() => import('./Admin.js'));

const Home = () => {
 const [openMain, setOpenMain] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
   setOpenMain(true);
  }, 100);
 }, []);

 return (
  <Fade in={openMain}>
   <Container
    maxWidth={'xl'}
    disableGutters={true}
    sx={{ bgcolor: 'background.default', borderRadius: 2 }}
   >
    <Grid
     container
     className="mainContainer"
     sx={{ backgroundColor: 'background.default', mt: 2, borderRadius: 2 }}
    >
     <Grid
      item
      xs={8}
      className="middleContainer"
     >
      <Box
       className="carousel"
       sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 10,
        justifyContent: 'center',
        borderRadius: 2,
       }}
      >
       <GardenCarousel />
      </Box>
     </Grid>

     <Grid
      item
      xs={4}
     >
      <Suspense fallback={<div>Loading</div>}>
       <UserDesigns renderAtHome />
      </Suspense>
     </Grid>
    </Grid>
   </Container>
  </Fade>
 );
};

export default Home;
