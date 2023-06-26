import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import axios from 'axios';
import { useNewItemsContext } from '../../hooks/uewNewItemsContext';

const DeleteButton = ({ itemData, handleSuccess }) => {
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const { newItems, dispatch } = useNewItemsContext();

 const handleDelete = async (itemId) => {
  try {
   const deleteResponse = await axios.delete(
    ` https://halamanan-197e9734b120.herokuapp.com/admin/pending/`,
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
   handleSuccess('Successfully deleted item from requests');
  } catch (error) {}
 };

 return (
  <>
   <Button
    onClick={handleOpen}
    sx={{ color: 'white', bgcolor: 'red' }}
   >
    Delete
   </Button>

   <Modal
    open={open}
    onClose={handleClose}
   >
    <Box
     sx={{
      position: 'absolute',
      bgcolor: 'orange',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      p: 3,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
     }}
    >
     <Box>
      Are you sure you want to delete request for {itemData.newItemName}
     </Box>
     <Box>
      <Button onClick={() => handleDelete(itemData._id)}> Yes</Button>
      <Button onClick={handleClose}> No</Button>
     </Box>
    </Box>
   </Modal>
  </>
 );
};

export default DeleteButton;
