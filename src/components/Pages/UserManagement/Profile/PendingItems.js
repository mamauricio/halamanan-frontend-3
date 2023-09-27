import React, { useState, useEffect } from 'react';

import { Typography, Box, Alert, Zoom, Button, Grow } from '@mui/material';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteRequestModal from './DeleteRequestModal';
import PendingItem from './PendingItem';
const PendingItems = ({}) => {
 const [showItems, setShowItems] = useState(false);
 const [open, setOpen] = useState(false);
 const [openAlert, setOpenAlert] = useState(false);
 const [pendingItems, setPendingItems] = useState([]);
 const [selectedItem, setSelectedItem] = useState('');
 const [error, setError] = useState('');

 const handleOpenAlert = () => {
  setOpenAlert(true);
  setTimeout(() => {
   setOpenAlert(false);
  }, 3 * 1000);
 };
 const handleCloseAlert = () => {
  setOpenAlert(false);
 };
 const handleOpen = (item) => {
  setSelectedItem(item);
  setOpen(true);
 };
 const handleClose = () => {
  setOpen(false);
 };

 useEffect(() => {
  const fetchPendingItems = async () => {
   const response = await fetch(
    `https://halamanan-197e9734b120.herokuapp.com/profile/pending`,
    {
     headers: {
      newItemUserId: `${sessionStorage.getItem('token')}`,
     },
    }
   );

   try {
    const pendingItems = await response.json();

    setPendingItems(pendingItems);
    setShowItems(true);
   } catch (error) {}
  };
  fetchPendingItems();
 }, []);

 const handleDelete = async (itemId) => {
  try {
   const response = await axios.delete(
    `https://halamanan-197e9734b120.herokuapp.com/profile/pending`,
    {
     params: {
      id: itemId,
     },
    }
   );

   const updated = pendingItems.filter(
    (pendingItem) => pendingItem._id !== itemId
   );

   setPendingItems(updated);
   handleOpenAlert();
   handleCloseAlert();
   handleClose();
  } catch (error) {
   setError(error);
  }
 };

 return (
  <Box>
   <Typography
    variant="h6"
    sx={{ color: 'orange' }}
   >
    Pending Items
   </Typography>
   <Box
    sx={{
     display: 'flex',
     flexDirection: 'row',
     height: '10vh',
     flexWrap: 'wrap',
    }}
   >
    <DeleteRequestModal
     open={open}
     handleClose={handleClose}
     selectedItem={selectedItem}
     handleDelete={handleDelete}
    />

    <Zoom
     in={openAlert}
     onClose={handleCloseAlert}
    >
     <Alert
      onClose={handleCloseAlert}
      severity={!error ? 'success' : 'error'}
      sx={{
       backgroundColor: !error ? 'primary.main' : 'red',
       position: 'absolute',
       zIndex: 1,
       height: '40px',
       left: '35%',
       top: '9%',
      }}
     >
      {!error ? 'Deleted Successfully' : error}
     </Alert>
    </Zoom>

    <Box
     className="pendingItems"
     sx={{
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'auto',
      height: '70vh',
     }}
    >
     {pendingItems.map((item, index) => (
      <Grow
       in={showItems}
       key={index}
      >
       <Box>
        <PendingItem
         index={index}
         handleOpen={handleOpen}
         item={item}
        />
       </Box>
      </Grow>
     ))}
    </Box>
   </Box>
  </Box>
 );
};

export default PendingItems;
