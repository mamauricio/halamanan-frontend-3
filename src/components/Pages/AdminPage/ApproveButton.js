import React, { useState } from 'react';
import { Button, Box, Modal } from '@mui/material';
import axios from 'axios';
const ApproveButton = (itemData) => {
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 const handleApprove = async ({ itemData }) => {
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
  handleClose();
 };
 return (
  <>
   <Button
    onClick={handleOpen}
    sx={{ color: 'white', bgcolor: 'primary.main' }}
   >
    Approve
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
