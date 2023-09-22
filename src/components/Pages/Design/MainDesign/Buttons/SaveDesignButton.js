import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDesignContext } from '../../../../hooks/useDesignContext';
import { Button, Alert, Zoom, Grow, filledInputClasses } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import html2canvas from 'html2canvas';
import axios from 'axios';

const SaveDesignButton = ({ designName, items, backgroundImage, saved }) => {
 const [open, setOpen] = useState(filledInputClasses);
 const { designs, dispatch } = useDesignContext();
 const { id } = useParams();
 const [error, setError] = useState(null);
 const [autosave, setAutosave] = useState(false);
 const [isSaving, setIsSaving] = useState(false);
 const handleCloseSecond = () => {
  setIsSaving(false);
 };
 const handleOpen = () => {
  setOpen(true);
  setTimeout(() => {
   setOpen(false);
  }, 300);
 };

 const handleClose = () => {
  setOpen(false);
 };

 const handleClick = async () => {
  await handleSave();
  handleOpen();
 };

 const handleSave = async () => {
  if (designName.length === 0) {
   setError('Design Name required');
   handleOpen();
   handleClose();
   return;
  }

  const canvas = html2canvas(
   document.querySelector('#backgroundImageContainer')
  );
  const designThumbnail = (await canvas).toDataURL('image/png');

  try {
   setIsSaving(true);
   const newData = {
    designName,
    backgroundImage,
    designThumbnail,
    items,
   };
   const response2 = axios.patch(
    `https://halamanan-197e9734b120.herokuapp.com/designs/${id}`,
    newData
   );

   dispatch({
    type: 'UPDATE_DESIGN',
    payload: {
     designId: id,
     newData,
    },
   });
   const saved = await response2;
   if (response2) {
    setIsSaving(false);
    setError(null);
   }
  } catch (error) {
   setIsSaving(false);
   setError(error.message);
  }
 };

 React.useEffect(() => {
  const autosave = setInterval(function () {
   setAutosave(true);
  }, 60 * 1000);
  return () => {
   setAutosave(false);
   clearInterval(autosave);
  };
 }, []);

 React.useEffect(() => {
  if (autosave && items !== saved) {
   handleSave();
   setAutosave(false);
  }
 }, [autosave, items, id, handleSave]);

 //---------------------------------------------------END OF UPDATING EXISTING DESIGN-------------------------------

 return (
  <>
   <Button
    title="Save Design"
    sx={{
     fontSize: 18,
     height: 50,
     color: 'rgba(255,255,255,0.8)',
     ':hover': {
      bgcolor: 'rgba(255,255,255,0.2)',

      color: 'primary.main',
     },
    }}
    onClick={handleClick}
   >
    <SaveIcon
     fontSize="small"
     sx={{ pr: 1 }}
    />
    Save
   </Button>
   {isSaving && (
    <Grow in={isSaving}>
     <Alert
      onClose={handleCloseSecond}
      sx={{
       bgcolor: 'primary.main',
       color: 'white',
       position: 'absolute',
       left: '40%',
       zIndex: 2,
      }}
     >
      Saving Design
     </Alert>
    </Grow>
   )}
   <Zoom
    in={open}
    onClose={handleClose}
   >
    <Alert
     onClose={handleClose}
     severity={!error ? 'success' : 'error'}
     sx={{
      backgroundColor: !error ? 'primary.main' : 'red',
      position: 'absolute',
      zIndex: 1,
      height: '40px',
      left: '40%',
      top: '11%',
     }}
    >
     {!error ? 'Saved Successfully' : error}
    </Alert>
   </Zoom>
  </>
 );
};

export default SaveDesignButton;
