import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Users from './UserManagement/Users';
import ItemRequests from './ItemRequests/ItemRequests';
import DesignQuotes from './DesignQuotes/DesignQuotes';
import DashBoard from './DashBoard';
import AdminGallery from './AdminGallery/AdminGallery';
const AdminLanding = () => {
 const [value, setValue] = useState(0);

 return (
  <motion.div
   className="itemManagement"
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Box sx={{ bgcolor: 'primary.main', height: '' }}>
    <Grid container>
     <Grid
      item
      xs={2}
     >
      <Box
       sx={{
        bgcolor: 'rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        left: 0,
        justifyContent: 'left ',
        color: 'orange',
        height: '93.5vh',
        p: 2,
       }}
      >
       <Typography
        variant="h5"
        sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         mb: 1,
        }}
       >
        Admin
       </Typography>
       <Button
        onClick={() => setValue(0)}
        sx={{
         my: 1,
         color: value === 0 ? 'orange' : 'rgba(255,255,255,0.6)',
         bgcolor: value === 0 ? 'rgba(0,0,0,0.3)' : 'transparent',
         ':hover': {
          bgcolor: value === 0 ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.2)',
          color: 'orange',
         },
        }}
       >
        <Typography>Dashboard</Typography>
       </Button>
       <Button
        onClick={() => setValue(1)}
        sx={{
         color: value === 1 ? 'orange' : 'rgba(255,255,255,0.6)',
         bgcolor: value === 1 ? 'rgba(0,0,0,0.3)' : 'transparent',
         mb: 1,
         ':hover': {
          bgcolor: value === 1 ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.2)',

          color: 'orange',
         },
        }}
       >
        <Typography>Users</Typography>
       </Button>
       <Button
        onClick={() => setValue(2)}
        sx={{
         color: value === 2 ? 'orange' : 'rgba(255,255,255,0.6)',
         bgcolor: value === 2 ? 'rgba(0,0,0,0.3)' : 'transparent',
         mb: 1,
         ':hover': {
          bgcolor: value === 2 ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.2)',

          color: 'orange',
         },
        }}
       >
        <Typography>Gallery Items</Typography>
       </Button>
       <Button
        onClick={() => setValue(3)}
        sx={{
         color: value === 3 ? 'orange' : 'rgba(255,255,255,0.6)',
         bgcolor: value === 3 ? 'rgba(0,0,0,0.3)' : 'transparent',
         mb: 1,
         ':hover': {
          bgcolor: value === 3 ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.2)',

          color: 'orange',
         },
        }}
       >
        <Typography>Item Requests</Typography>
       </Button>

       <Button
        // href="/admin/users"
        onClick={() => setValue(4)}
        sx={{
         color: value === 4 ? 'orange' : 'rgba(255,255,255,0.6)',
         bgcolor: value === 4 ? 'rgba(0,0,0,0.3)' : 'transparent',
         mb: 1,
         ':hover': {
          bgcolor: value === 4 ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.2)',

          color: 'orange',
         },
        }}
       >
        <Typography>Design Quotes</Typography>
       </Button>
      </Box>
     </Grid>
     <Grid
      item
      xs={10}
      sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
     >
      {value === 0 && <DashBoard setValue={setValue} />}

      {value === 1 && <Users />}
      {value === 2 && <AdminGallery />}
      {value === 3 && <ItemRequests />}
      {value === 4 && <DesignQuotes />}
     </Grid>
    </Grid>
   </Box>
  </motion.div>
 );
};
export default AdminLanding;
