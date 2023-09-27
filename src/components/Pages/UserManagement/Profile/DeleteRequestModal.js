import React from 'react';
import { Modal, Box, Button } from '@mui/material';

const DeleteRequestModal = ({
 open,
 handleClose,
 selectedItem,
 handleDelete,
}) => {
 return (
  <Modal
   open={open}
   onClose={handleClose}
  >
   <Box
    sx={{
     position: 'absolute',
     left: '50%',
     top: '50%',
     transform: 'translate(-50%, -50%)',
     display: 'flex',
     flexDirection: 'column',
     bgcolor: 'orange',
     alignItems: 'center',
     justifyContent: 'center',
     padding: 2,
     borderRadius: 2,
     boxShadow: 10,
    }}
   >
    <Box
     sx={{
      color: 'primary.main',
      fontSize: '20px',
     }}
    >
     Are you sure you want to delete request for {selectedItem.newItemName}?
    </Box>
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '60%',
      mt: 2,
     }}
    >
     <Button
      onClick={() => handleDelete(selectedItem._id)}
      sx={{
       bgcolor: 'primary.main',
       color: 'orange',
       ':hover': {
        color: 'white',
        bgcolor: 'red',
       },
      }}
     >
      Yes
     </Button>
     <Button
      onClick={handleClose}
      sx={{
       bgcolor: 'primary.main',
       color: 'orange',
       ':hover': {
        color: 'orange',
        bgcolor: 'primary.main',
        opacity: 0.9,
       },
      }}
     >
      No
     </Button>
    </Box>
   </Box>
  </Modal>
 );
};

export default DeleteRequestModal;
