import React, { useState, useEffect } from 'react';
import { Grid, Box, Container, Typography } from '@mui/material/';
import { motion } from 'framer-motion';
import AccountInformation from './AccountInformation';
import RequestedItems from './RequestedItems';
import ProfileSideBar from './ProfileSideBar';

const UserProfile = () => {
 const [value, setValue] = useState(0);
 const handleChange = (event, newValue) => {
  setValue(newValue);
 };
 return (
  <motion.div
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Container
    maxWidth="xl"
    disableGutters={true}
    sx={{ bgcolor: 'primary.main', height: '85 vh', mt: 2, borderRadius: 2 }}
   >
    <Typography variant="h5">Profile</Typography>
    <Container
     maxWidth="xl"
     disableGutters={true}
     sx={{
      height: '80vh',
      bgcolor: 'rgba(255,255,255,0.1)',
      borderRadius: 2,
      m: 1,
      mt: 2,
      p: 1,
     }}
    >
     <Grid
      container
      sx={{ height: '78vh', p: 2 }}
     >
      <Grid
       item
       xs={2}
      >
       <ProfileSideBar
        handleChange={handleChange}
        value={value}
       />
      </Grid>
      <Grid
       item
       xs={10}
      >
       <Box>
        {value === 0 && <AccountInformation />}
        {value === 1 && <RequestedItems />}
       </Box>
      </Grid>
     </Grid>
    </Container>
   </Container>
  </motion.div>
 );
};

export default UserProfile;
