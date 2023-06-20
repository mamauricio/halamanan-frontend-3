import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDesignContext } from '../../../../hooks/useDesignContext';
import { Button, Alert } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import useAutosave from '../../../../hooks/useAutoSave.hook';

import SaveIcon from '@mui/icons-material/Save';
import html2canvas from 'html2canvas';
import axios from 'axios';

const SaveDesignButton = ({
 designName,
 items,
 backgroundImage,
 aspectRatio,
 designDescription,
}) => {
 const [open, setOpen] = useState(false);
 const { designs, dispatch } = useDesignContext();
 const { id } = useParams();
 const [error, setError] = useState(null);

 const isValidObjectId = (objectId) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/; // Regex pattern for a valid ObjectId

  return objectIdPattern.test(objectId);
 };

 const handleOpen = () => {
  setOpen(true);
  //console.log((open);
 };

 const handleClose = () => {
  setTimeout(() => {
   setOpen(false);
  }, 3 * 1000);
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
   if (!isValidObjectId(id)) {
    try {
     const user_id = sessionStorage.getItem('token');
     const design = {
      designThumbnail,
      user_id,
      designName,
      items,
      backgroundImage,
      aspectRatio,
      designDescription,
     };
     const response = fetch(
      `https://halamanan-197e9734b120.herokuapp.com/designs/create`,
      {
       method: 'POST',
       body: JSON.stringify(design),
       headers: {
        'Content-type': 'application/json',
       },
      }
     )
      .then((response) => {
       if (!response.ok) {
        setError('Error Saving. Enter design name');
       }
       return response.json();
      })
      .then((data) => {
       try {
        window.location.href = `'https://halamanan.netlify.app/designs/${data}`;
       } catch {
        setError(data.error.message);
       }

       handleOpen();
       handleClose();
      });
    } catch (error) {
     setError(error);
     setError(null);
    }
   }

   //----------------------------------------------END OF CREATING NEW DESIGN-------------------------------------------------
   else {
    //console.log(('Save Button:  editing');

    try {
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

     if (!response2.ok) {
      setError(response2.error);
     }

     handleOpen();
     handleClose();
    } catch (error) {
     setError(error);
     setError(null);
    }
   }
  } catch (error) {
   setError(error);
  }
 };

 useAutosave(() => {
  handleSave();
 }, 60 * 1000);
 //---------------------------------------------------END OF UPDATING EXISTING DESIGN-------------------------------

 return (
  <>
   {/* {useAutoSave()}; */}
   <Button
    sx={{
     bgcolor: 'primary.main',
     color: 'white',
     ':hover': {
      backgroundColor: 'white',
      border: 'solid',
      color: 'primary.main',
      borderColor: 'primary.main',
      borderWidth: '1px',
     },
    }}
    onClick={handleSave}
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
