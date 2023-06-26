import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDesignContext } from '../../../../hooks/useDesignContext';
import { Button, Alert, Zoom, Grow } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import html2canvas from 'html2canvas';
import axios from 'axios';

const SaveDesignButton = ({ designName, items, backgroundImage, saved }) => {
 const [open, setOpen] = useState(false);
 const { designs, dispatch } = useDesignContext();
 const { id } = useParams();
 const [error, setError] = useState(null);
 const [autosave, setAutosave] = useState(false);
 const [isSaving, setIsSaving] = useState(false);
 const handleOpen = () => {
  setOpen(true);
  setTimeout(() => {
   setOpen(false);
  }, 3 * 1000);
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

  if (isSaving === false) {
   try {
    setIsSaving(true);
    const newData = {
     designName,
     backgroundImage,
     designThumbnail,
     items,
    };
    const response2 = axios.patch(
     `http://localhost:3001/designs/${id}`,
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
    setError(error.message);
   }
  } else {
   setError('Saving already in progress');
  }
 };

 React.useEffect(() => {
  const autosave = setInterval(function () {
   setAutosave(true);
  }, 180 * 1000);
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
   {/* {useAutoSave()}; */}
   <Button
    sx={{
     ':hover': {
      backgroundColor: 'white',
      border: 'solid',
      color: 'primary.main',
      borderColor: 'primary.main',
      borderWidth: '1px',
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
      //   onClose={handleClose}
      variant="outlined"
      severity="success"
      sx={{
       bgcolor: 'primary.main',
       color: 'white',
       position: 'absolute',
       top: '20%',
       left: '50%',
       transform: 'translate(-50%, -50%)',
       zIndex: 2,
      }}
     >
      Attempting to save design
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
      left: '35%',
      top: '7%',
     }}
    >
     {!error ? 'Saved Successfully' : error}
    </Alert>
   </Zoom>
  </>
 );
};

export default SaveDesignButton;
