import React, { useState } from 'react';
import { Button, Box, Modal } from '@mui/material';
import { useItemsContext } from '../../../../hooks/useItemsContext';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const ResetButton = () => {
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const { items, dispatch } = useItemsContext();

 const handleReset = () => {
  dispatch({
   type: 'RESET_ITEMS',
   payload: null,
  });
  handleClose();
 };

 return (
  <>
   <Button
    sx={{
     mt: 1,
     color: 'primary.main',
     ':hover': { backgroundColor: 'red', color: 'white' },
    }}
    onClick={handleOpen}
   >
    <RestartAltIcon />
    Reset
   </Button>

   <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
   >
    <Box
     className="modal"
     sx={{
      position: 'absolute',
      backgroundColor: 'orange',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      borderRadius: 2,
      p: 2,
      boxShadow: 2,
     }}
    >
     <Box
      sx={{
       color: 'primary.main',
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       fontSize: 20,
      }}
     >
      <h3>Remove all items? </h3>
      <div>All items in the design would be removed</div>
      <br />
      <Box>
       <Button
        onClick={handleReset}
        sx={{
         color: 'white',
         backgroundColor: 'red',
         m: 2,
         ':hover': { opacity: '0.4', backgroundColor: 'red' },
        }}
       >
        Yes
       </Button>
       <Button
        onClick={handleClose}
        sx={{
         backgroundColor: 'white',
         m: 2,
         ':hover': { opacity: '0.7', backgroundColor: 'white' },
        }}
       >
        No
       </Button>
      </Box>
     </Box>
    </Box>
   </Modal>
  </>
 );
};

export default ResetButton;
