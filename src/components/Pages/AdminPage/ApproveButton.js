import React, { useState } from 'react';
import { Button, Box, Modal } from '@mui/material';
import axios from 'axios';
import { useNewItemsContext } from '../../hooks/uewNewItemsContext';
import CheckIcon from '@mui/icons-material/Check';
const ApproveButton = (itemData) => {
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const { newItems, dispatch } = useNewItemsContext();

 const handleApprove = async ({ itemData, handleSuccess }) => {
  const item = {
   itemName: itemData.newItemName,
   scientificName: itemData.newItemScientificName,
   itemInformation: itemData.newItemDescription,
   category: itemData.newItemCategory,
   type: itemData.newItemType,
   informationSource: 'User',
   imageSource: 'User',
   imageUrl: itemData.newItemUrl,
  };
  const response = await fetch(
   `https://halamanan-197e9734b120.herokuapp.com/gallery/add-item`,
   {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
     'Content-type': 'application/json',
    },
   }
  );

  const deleteResponse = await axios.delete(
   `https://halamanan-197e9734b120.herokuapp.com/admin/pending/`,
   {
    params: {
     id: itemData._id,
    },
   }
  );
  dispatch({
   type: 'REMOVE_NEW_ITEM',
   payload: { id: itemData._id },
  });
  handleClose();

  handleSuccess('Successfully added item to the gallery');
 };
 return (
  <>
   <Button
    title="Approve Request"
    onClick={handleOpen}
    sx={{
     color: 'rgba(255,255,255,0.8)',
     bgcolor: 'primary.main',
     width: 'auto',
    }}
   >
    {/* Approve */}
    <CheckIcon />
   </Button>
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
      Are you sure you want to Approve request for {itemData.newItemName}?
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
       onClick={() => handleApprove(itemData)}
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
  </>
 );
};

export default ApproveButton;
