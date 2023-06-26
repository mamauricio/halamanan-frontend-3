import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDesignContext } from '../../../../hooks/useDesignContext';
import { Button, Alert } from '@mui/material';
import Zoom from '@mui/material/Zoom';
// import useAutosave from '../../../../hooks/useAutoSave.hook';

import SaveIcon from '@mui/icons-material/Save';
import html2canvas from 'html2canvas';
import axios from 'axios';

const SaveDesignButton = ({ designName, items, backgroundImage, saved }) => {
 const [open, setOpen] = useState(false);
 const { designs, dispatch } = useDesignContext();
 const { id } = useParams();
 const [error, setError] = useState(null);
 const [autosave, setAutosave] = useState(false);
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
  //   handleClose();
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
   const newData = {
    designName,
    backgroundImage,
    designThumbnail,
    items,
   };
   const response2 = axios.patch(
    ` http://localhost:3001/designs/${id}`,
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
   console.log(saved);
   if (response2) {
    setError(null);
   }
  } catch (error) {
   console.log(error);
   setError(error.message);
  }
 };

 React.useEffect(() => {
  const autosave = setInterval(function () {
   setAutosave(true);
   console.log(id);
   console.log('autosaving');
  }, 60 * 1000); // runs every minute
  return () => {
   setAutosave(false); // turn autosave off
   clearInterval(autosave); // clear autosave on dismount
  };
 }, []);

 React.useEffect(() => {
  if (autosave && items !== saved) {
   console.log('stopping autosave');
   handleSave();
   setAutosave(false); // toggle autosave off
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
