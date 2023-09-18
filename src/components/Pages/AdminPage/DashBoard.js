import React, { useState, useRef, useEffect } from 'react';
// import { useState } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
// import { MotionConfig } from 'framer-motion';
import { motion } from 'framer-motion';
// import EastIcon from '@mui/icons-material/East';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import QuestionMark from '@mui/icons-material/QuestionMark';
import FadeLoader from 'react-spinners/FadeLoader';

const DashBoard = ({ setValue }) => {
 const [itemRequests, setItemRequests] = useState('');
 const [users, setUsers] = useState('');
 const userCountRef = useRef(null);
 const adminCountRef = useRef(null);

 const [error, setError] = useState('');

 useEffect(() => {
  fetchAllUsers();
  fetchNewItems();
 }, []);

 useEffect(() => {
  roleCheck();
 }, [users]);

 const fetchAllUsers = async () => {
  try {
   const response = await fetch(
    'https://halamanan-197e9734b120.herokuapp.com/admin/users',
    {
     headers: {
      token: 'admin',
     },
    }
   );

   const data = await response.json();
   if (data) {
    setUsers(data);
   } else {
   }
  } catch (error) {
   setError(error.response.data.error);
  }
 };

 const roleCheck = () => {
  {
   users &&
    users.map((user) => (
     <>
      {user.role === 'admin' ? (
       <>{(adminCountRef.current = adminCountRef.current + 1)}</>
      ) : (
       <>{(userCountRef.current = userCountRef.current + 1)}</>
      )}
     </>
    ));
  }
 };

 const fetchNewItems = async () => {
  try {
   const response = await fetch(
    'https://halamanan-197e9734b120.herokuapp.com/admin/pending'
   );

   const data = await response.json();
   if (data) {
    setItemRequests(data);
   } else {
   }
  } catch (error) {
   setError(error.response.data.error);
  }
 };

 return (
  <motion.div
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Container
    maxWidth="xl"
    disableGutters
    sx={{
     height: '91vh',
     p: 2,
     borderRadius: 1,
    }}
   >
    <Typography
     variant="h4"
     sx={{ mb: 2 }}
    >
     Dashboard
    </Typography>
    <Grid container>
     <Grid
      item
      xs={12}
     >
      {' '}
      <Grid
       container
       spacing={3}
      >
       <Grid
        item
        xs={5}
        sx={{
         mb: 2,
        }}
       >
        <Box
         sx={{
          p: 2,
          borderRadius: 1,
          height: '450px',
          bgcolor: 'rgba(255,255,255,0.2)',
         }}
        >
         <Box
          sx={{
           display: 'flex',
           width: '100%',
           justifyContent: 'space-between',
           alignItems: 'center',
          }}
         >
          <Typography variant="h5">Users</Typography>
          <Button
           onClick={() => setValue(1)}
           sx={{
            bgcolor: 'orange',
           }}
          >
           <Typography sx={{ pr: 1 }}>Manage Users</Typography>
           <ArrowOutwardIcon />
          </Button>
         </Box>
         <Box
          sx={{
           bgcolor: 'primary.main',
           p: 1,
           borderRadius: 1,
           mt: 1,
           height: '380px',
          }}
         >
          {users && (
           //    <>
           <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
             sx={{ width: 'inherit', display: 'flex', p: 1, maxWidth: '100%' }}
            >
             <Typography
              variant="h6"
              sx={{ mr: 1 }}
             >
              Admin Count:
              {adminCountRef.current === null
               ? 'Fetching data'
               : adminCountRef.current}
             </Typography>

             <Typography
              variant="h6"
              sx={{ mr: 1 }}
             >
              User Count:
              {userCountRef.current === null
               ? 'Fetching data'
               : userCountRef.current}
             </Typography>
            </Box>

            <Box>
             <Box sx={{ height: '300px', overflow: 'auto' }}>
              {users.map((user, index) => (
               //  <>
               <Box
                key={index}
                sx={{
                 m: 2,
                 mr: 2,
                 bgcolor:
                  user.role === 'admin' ? 'orange' : 'rgba(255,255,255,0.2)',
                 p: 1,
                 color: user.role === 'admin' ? 'primary.main' : 'white',
                 borderRadius: 1,
                }}
               >
                <Typography>id: {user._id}</Typography>
                <Typography>
                 Name: {user.firstName} {user.lastName}
                </Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Role: {user.role}</Typography>
               </Box>
              ))}
             </Box>
            </Box>
            {/* </> */}
           </Box>
          )}
         </Box>
        </Box>
       </Grid>
       <Grid
        item
        xs={7}
       >
        <Box
         sx={{
          height: '450px',
          bgcolor: 'rgba(255,255,255,0.2)',
          borderRadius: 1,
          p: 2,
         }}
        >
         <Box
          sx={{
           display: 'flex',
           width: '100%',
           justifyContent: 'space-between',
           alignItems: 'center',
           mb: 1,
          }}
         >
          <Typography variant="h5">Item Requests</Typography>
          <Button
           onClick={() => setValue(3)}
           sx={{ bgcolor: 'orange' }}
          >
           <Typography>View Requests</Typography>
           <ArrowOutwardIcon />
          </Button>
         </Box>
         <Box
          sx={{
           bgcolor: 'primary.main',
           height: '380px',
           p: 1,
           borderRadius: 1,
           overflow: 'hidden',
          }}
         >
          <Box sx={{ p: 1 }}>
           <Typography variant="h6">
            Pending requests: {itemRequests.length}
           </Typography>
          </Box>
          <Box
           sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            bgcolor: 'primary.main',
            height: '320px',
            overflowY: 'scroll',
            justifyContent: 'space-around',
           }}
          >
           {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', width: 'inherit' }}> */}
           {itemRequests &&
            itemRequests.map((items, index) => (
             <Box
              key={index}
              sx={{
               bgcolor: 'rgba(255,255,255,0.18)',
               m: 1,
               p: 1,
               pb: 2,
               width: '320px',
               borderRadius: 1,
               display: 'flex',
               //    justifyContent: 'center',
               flexDirection: 'column',
               alignItems: 'center',
              }}
             >
              <Typography sx={{ mb: 2 }}>
               Item Name: {items.newItemName}
              </Typography>
              {/* </Grid> */}

              {/* <Grid item> */}
              {!items.newItemUrl ? (
               <Box>
                <QuestionMark />
               </Box>
              ) : (
               <Box
                sx={{
                 justifyContent: 'center',
                 display: 'flex',
                 height: '200px',
                 width: '250px',
                 p: 1,
                 bgcolor: 'rgba(255,255,255,0.2)',
                 borderRadius: 1,
                }}
               >
                <img
                 src={items.newItemUrl}
                 style={{ height: '100%', objectFit: 'contain' }}
                />
               </Box>
              )}
              {/* </Grid> */}
              {/* </Grid> */}
             </Box>
            ))}
          </Box>
          {/* </Box> */}
         </Box>
        </Box>
       </Grid>
      </Grid>
     </Grid>
     <Grid
      item
      xs={12}
     >
      <Box
       sx={{
        bgcolor: 'white',
        height: '300px',
        bgcolor: 'rgba(255,255,255,0.2)',
        borderRadius: 1,
        p: 2,
       }}
      >
       <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Design Quote Requests</Typography>
        <Button
         onClick={() => {
          setValue(4);
         }}
         sx={{ bgcolor: 'orange' }}
        >
         {' '}
         <Typography sx={{ pr: 1 }}>View Quote Requests</Typography>
         <ArrowOutwardIcon />
        </Button>
       </Box>
       <Box
        sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         height: '80%',
         m: 2,
         bgcolor: 'primary.main',
         borderRadius: 1,
        }}
       >
        <Typography
         variant="h5"
         sx={{ color: 'white' }}
        >
         No quote requests as of the moment (future feature)
        </Typography>
       </Box>
      </Box>
     </Grid>
    </Grid>
   </Container>
  </motion.div>
 );
};

export default DashBoard;
