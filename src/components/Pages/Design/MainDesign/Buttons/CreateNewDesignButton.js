import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';

import ParkIcon from '@mui/icons-material/Park';
import ExistingDesigns from './BlankDesigns';
import { Typography } from '@mui/material';

const CreateNewDesignButton = ({ handleCreateNewDesign }) => {
 const [open, setOpen] = useState(false);
 const [openTemplate, setOpenTemplate] = useState(false);

 const handleOpen = () => {
  setOpen(true);
 };
 const handleClose = () => {
  setOpenTemplate(false);
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
    title="Create a new design"
    sx={{
     mt: 2,
     width: 'inherit',
     justifyContent: 'space-around',
     bgcolor: 'orange',
     color: 'primary.main',
     ':hover': {
      bgcolor: 'rgba(255,165,0,0.8)',
     },
    }}
    onClick={handleOpen}
   >
    <ParkIcon />
    Create new design
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
      <Typography
       sx={{
        fontSize: '20px',
        color: 'primary.main',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        mb: 1,
       }}
      >
       Create new design
      </Typography>
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
        <Typography sx={{ color: 'primary.main' }}>Or</Typography>
       </Box>
       <Box
        sx={{
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'space-evenly',
         alignItems: 'center',
        }}
       >
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
