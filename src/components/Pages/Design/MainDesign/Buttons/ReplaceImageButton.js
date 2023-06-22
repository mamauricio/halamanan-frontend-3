import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Modal } from '@mui/material';
import FindReplaceIcon from '@mui/icons-material/FindReplace';

// import './ReplaceImageButton.css';
import { useItemsContext } from '../../../../hooks/useItemsContext';
const ReplaceImageButton = ({ handleReplaceBackground }) => {
 //  const navigate = useNavigate();
 const { items, dispatch } = useItemsContext();
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 function handleReplaceImageButton(e) {
  document.getElementById('image_upload').click();
 }

 const replaceImage = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
   localStorage.removeItem('backgroundImage');
   const imageBase64 = reader.result;
   localStorage.setItem('backgroundImage', imageBase64);
   handleReplaceBackground(imageBase64);
  };

  if (file) {
   localStorage.removeItem('backgroundImage');
   reader.readAsDataURL(file);
   dispatch({
    type: 'RESET_ITEMS',
    payload: null,
   });
   handleClose();
  }
 };

 return (
  <>
   <Button
    sx={{
     color: 'primary.main',
     ':hover': { backgroundColor: 'orange', color: 'primary.main' },
    }}
    onClick={handleOpen}
   >
    <input
     id="image_upload"
     type="file"
     accept=".jpg,.jpeg,.png"
     onChange={replaceImage}
     style={{ display: 'none' }}
    />
    <FindReplaceIcon />
    Replace Image
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
      borderRadius: 2,
      p: 2,
      boxShadow: 2,
      top: '40%',
      left: '40%',
      transform: 'translate(-50 -50)',
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
      <h3>Replace Image? </h3>
      All items in the design would be removed
      <br />
      <Box>
       <Button
        onClick={handleReplaceImageButton}
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

export default ReplaceImageButton;
