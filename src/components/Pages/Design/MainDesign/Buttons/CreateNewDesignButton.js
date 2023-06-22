import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';

import ParkIcon from '@mui/icons-material/Park';
import ExistingDesigns from './BlankDesigns';

const CreateNewDesignButton = ({ handleCreateNewDesign }) => {
 const [open, setOpen] = useState(false);
 const [openTemplate, setOpenTemplate] = useState(false);

 const handleOpen = () => {
  setOpen(true);
 };
 const handleClose = () => {
  setOpen(false);
 };

 const handleButtonClick = () => {
  document.getElementById('fileInput').click();
 };

 const handleBackgroundImage = (event) => {
  event.preventDefault();
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
   const imageBase64 = reader.result;
   localStorage.setItem('backgroundImage', imageBase64);

   handleCreateNewDesign();
  };

  if (file) {
   reader.readAsDataURL(file);
  }
 };

 const handleTemplate = (template) => {
  localStorage.clear();
  localStorage.setItem('backgroundImage', template);
  handleCreateNewDesign({ backgroundImage: template });
 };

 return (
  <Box sx={{ width: '100%' }}>
   <Button
    sx={{
     mt: 2,
     width: 'inherit',
     justifyContent: 'space-around',
     bgcolor: 'orange',
     color: 'primary.main',
     ':hover': {
      opacity: 0.9,
      border: 'solid',
      borderWidth: 1,
      borderColor: 'white',
      color: 'white',
     },
    }}
    onClick={handleOpen}
   >
    <ParkIcon />
    Add new Design
    <ParkIcon />
   </Button>

   <Modal
    open={open}
    onClose={handleClose}
   >
    <Fade in={open}>
     <Box
      sx={{
       backgroundColor: 'orange',
       position: 'absolute',
       left: '50%',
       top: '50%',
       transform: 'translate(-50%, -50%)',
       p: 4,
       borderRadius: 2,
      }}
     >
      <Box
       sx={{
        fontSize: '20px',
        color: 'primary.main',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
       }}
      >
       {' '}
       Create new design{' '}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
       {openTemplate && (
        <Grow in={openTemplate}>
         <Box
          sx={{
           transition: 'max-width 0.3s, max-height 0.3s',
           maxWidth: openTemplate ? '1000px' : '600px',
           maxHeight: openTemplate ? '1000px' : '600px',
           overflow: 'hidden',
          }}
         >
          <ExistingDesigns handleTemplate={handleTemplate} />
          <Button
           onClick={() => setOpenTemplate(false)}
           sx={{ bgcolor: 'red', color: 'white', mt: 1 }}
          >
           Close{' '}
          </Button>
         </Box>
        </Grow>
       )}
       {!openTemplate && (
        <Button
         onClick={() => setOpenTemplate(true)}
         sx={{
          bgcolor: 'primary.main',
          color: 'orange',
          mt: 2,
          ':hover': { backgroundColor: 'white', color: 'primary.main' },
         }}
        >
         Choose from templates
        </Button>
       )}
       <Box
        sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         m: 2,
        }}
       >
        Or
       </Box>
       <Box sx={{ display: 'flex' }}>
        <Button
         onClick={handleButtonClick}
         sx={{
          backgroundColor: 'primary.main',
          color: 'orange',
          ':hover': { backgroundColor: 'white', color: 'primary.main' },
         }}
        >
         Choose Own Image
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
        <input
         type="file"
         id="fileInput"
         accept=".jpg,.jpeg,.png"
         onChange={handleBackgroundImage}
         style={{ display: 'none' }}
        />
       </Box>
      </Box>
     </Box>
    </Fade>
   </Modal>
  </Box>
 );
};

export default CreateNewDesignButton;
