import React, { useState } from 'react';
import { Button, Box, Modal, Grow, Fade } from '@mui/material';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import ExistingDesigns from './BlankDesigns';

import { useItemsContext } from '../../../../hooks/useItemsContext';
const ReplaceImageButton = ({ handleReplaceBackground }) => {
 const { items, dispatch } = useItemsContext();
 const [open, setOpen] = useState(false);
 const [openSecond, setOpenSecond] = useState(false);
 const [openTemplate, setOpenTemplate] = useState(false);

 const handleTemplate = (template) => {
  localStorage.clear();
  localStorage.setItem('backgroundImage', template);
  handleReplaceBackground(template);
  handleCloseSecond();
  dispatch({
   type: 'RESET_ITEMS',
   payload: null,
  });
  handleClose();
 };
 const handleOpenSecond = () => {
  setOpenSecond(true);
  handleClose();
 };
 const handleCloseSecond = () => setOpenSecond(false);
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
    title="Replace background image"
    sx={{
     fontSize: 18,
     height: '50px',
     color: 'rgba(255,255,255,0.8)',
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
        onClick={handleOpenSecond}
        sx={{
         color: 'white',
         bgcolor: 'red',
         m: 2,
         transition: 'background-color ease-in-out 0.2s',
         ':hover': {
          bgcolor: 'rgba(0,0,0,0.6)',
         },
        }}
       >
        Yes
       </Button>
       <Button
        onClick={handleClose}
        sx={{
         backgroundColor: 'white',
         m: 2,
         transition: 'background-color ease-in-out 0.2s',

         ':hover': {
          backgroundColor: 'rgba(255,255,255,0.7)',
          color: 'primary.main',
         },
        }}
       >
        No
       </Button>
      </Box>
     </Box>
    </Box>
   </Modal>
   <Modal
    open={openSecond}
    onClose={handleCloseSecond}
   >
    <Fade in={openSecond}>
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
       Replace Design{' '}
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
         onClick={handleReplaceImageButton}
         sx={{
          backgroundColor: 'primary.main',
          color: 'orange',
          ':hover': { backgroundColor: 'white', color: 'primary.main' },
         }}
        >
         Choose Own Image
        </Button>
        <Button onClick={handleCloseSecond}>Cancel</Button>
        <input
         type="file"
         id="fileInput"
         accept=".jpg,.jpeg,.png"
         onChange={handleReplaceBackground}
         style={{ display: 'none' }}
        />
       </Box>
      </Box>
     </Box>
    </Fade>
   </Modal>
  </>
 );
};

export default ReplaceImageButton;
