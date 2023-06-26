import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, Container, Grow } from '@mui/material';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
 const [designs, setDesigns] = useState('');
 const [items, setItems] = useState('');
 const [users, setUsers] = useState('');
 const [error, setError] = useState('');
 const [newItems, setNewItems] = useState('');
 const [open, setOpen] = useState();
 const [fetchingUsers, setFetchingUsers] = useState(true);
 const [fetchingGallery, setFetchingGallery] = useState(true);
 const [fetchingDesigns, setFetchingDesigns] = useState(true);
 const [fetchingItemRequests, setFetchingItemRequests] = useState(true);
 //  const [fetchingUsers, setFetchingUsers] = useState(false);

 const handleOpen = () => {
  setOpen(true);
 };
 const handleClose = () => {
  setOpen(false);
 };

 useEffect(() => {
  fetchDesigns();
  fetchAllUsers();
  fetchAllItems();
  fetchNewItems();
  const timer = setTimeout(() => {
   handleOpen();
  }, 500);
 }, []);

 const fetchDesigns = async () => {
  try {
   const response = await fetch(
    'https://halamanan-197e9734b120.herokuapp.com/designs/',
    {
     headers: {
      token: 'admin',
     },
    }
   );
   console.log(response);
   const data = await response.json();
   console.log(data);
   if (data) {
    setFetchingDesigns(false);
    setDesigns(data);
   } else {
    console.log(error);
   }
  } catch (error) {
   console.log(error);
   //    setError(error.response.data.error);
  }
 };

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
    setFetchingUsers(false);
    setUsers(data);
   } else {
   }
  } catch (error) {
   setError(error.response.data.error);
  }
 };

 const fetchAllItems = async () => {
  try {
   const response = await fetch(
    'https://halamanan-197e9734b120.herokuapp.com/gallery'
   );

   const data = await response.json();
   if (data) {
    // console.log(data);
    setFetchingGallery(false);
    setItems(data.totalCount);
   } else {
   }
  } catch (error) {
   setError(error.response.data.error);
  }
 };

 const fetchNewItems = async () => {
  try {
   const response = await fetch(
    'https://halamanan-197e9734b120.herokuapp.com/admin/pending'
   );

   const data = await response.json();
   if (data) {
    setFetchingItemRequests(false);
    setNewItems(data);
   } else {
   }
  } catch (error) {
   setError(error.response.data.error);
  }
 };

 const styles = {
  color: 'orange',
  my: '3px',
  fontSize: '20px',
 };

 return (
  <motion.div
   className="itemManagement"
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Container
    maxWidth="xl"
    sx={{
     color: 'primary.main',
     height: '80vh',
     bgcolor: 'primary.main',
     borderRadius: 2,
     mt: 2,
     position: 'relative',
    }}
   >
    <Box
     sx={{
      position: 'absolute',
      display: 'flex',
      top: '30%',
      left: '50%',
      transform: 'translate(-40%, -60%)',
      flexDirection: 'column',
     }}
    >
     <Grow in={open}>
      <div>
       <Box sx={styles}>
        Number of users: {fetchingUsers ? 'Loading' : users.length}
       </Box>
       <Box sx={styles}>
        Number of Gallery Items: {fetchingGallery ? 'Loading' : items}
       </Box>
       <Box sx={styles}>
        Current amount of Designs:{' '}
        {fetchingDesigns ? 'Loading' : designs.length}
       </Box>

       <Box sx={styles}>
        Number of New Item Requests:{' '}
        {fetchingItemRequests ? 'Loading' : newItems.length}
       </Box>
       <Box sx={styles}>Number of Design Quote Requests: 0</Box>
      </div>
     </Grow>
    </Box>
   </Container>
  </motion.div>
 );
};
export default AdminDashboard;
