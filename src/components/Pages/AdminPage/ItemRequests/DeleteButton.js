import React, { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNewItemsContext } from '../../../hooks/uewNewItemsContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const DeleteButton = ({ itemData, handleSuccess, setSelectedItem }) => {
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const { newItems, dispatch } = useNewItemsContext();

 const handleDelete = async (itemId) => {
  try {
   const deleteResponse = await axios.delete(
    `https://halamanan-197e9734b120.herokuapp.com/admin/pending/`,
    {
     params: {
      id: itemId,
     },
    }
   );
   dispatch({
    type: 'REMOVE_NEW_ITEM',
    payload: { id: itemData._id },
   });
   handleClose();
   setSelectedItem('');
   handleSuccess('Successfully deleted item from requests');
  } catch (error) {}
 };

 return (
  <>
   <Button
    title="Delete Request"
    onClick={handleOpen}
    sx={{
     color: 'white',
     bgcolor: 'primary.main',
     color: 'rgba(255,255,255,0.8)',
     transition: 'background-color ease-in 0.15s',
     ':hover': {
      bgcolor: 'red',
      color: 'rgba(255,255,255,0.2',
     },
    }}
   >
    {/* Delete */}
    <DeleteOutlineIcon />
   </Button>

   <Modal
    open={open}
    onClose={handleClose}
   >
    <Box
     sx={{
      position: 'absolute',
      bgcolor: 'primary.main',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 1,
     }}
    >
     <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 2, borderRadius: 1 }}>
      <Typography sx={{ fontSize: '22px' }}>
       Are you sure you want to delete request for {itemData.newItemName}
      </Typography>
      <Box
       sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        mt: 2,
       }}
      >
       <Button
        title="Delete Request"
        onClick={() => handleDelete(itemData._id)}
        sx={{
         width: '120px',
         bgcolor: 'rgba(255,255,255,0.2)',
         ':hover': {
          bgcolor: 'red',
          color: 'rgba(255,255,255,1)',
         },
        }}
       >
        {' '}
        Yes
       </Button>
       <Button
        title="Cancel"
        onClick={() => handleClose()}
        sx={{
         width: '120px',
         bgcolor: 'rgba(255,255,255,0.2)',
         ':hover': {
          bgcolor: 'rgba(255,255,255,0.1)',
         },
        }}
       >
        {' '}
        No
       </Button>
      </Box>
     </Box>
    </Box>
   </Modal>
  </>
 );
};

export default DeleteButton;
