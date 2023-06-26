import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import AddPhoto from '@mui/icons-material/AddAPhoto';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { InputLabel, MenuItem, Select } from '@mui/material';
const AddNewItemButton = ({ handleSuccess }) => {
 const [open, setOpen] = useState(false);
 const [error, setError] = useState('');

 const [itemData, setItemData] = useState({
  newItemName: '',
  newItemScientificName: '',
  newItemDescription: '',
  newItemCategory: '',
  newItemType: '',
  newItemUrl: '',
 });

 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 const handleFormChange = (event) => {
  setItemData({
   ...itemData,
   [event.target.name]: event.target.value,
  });
 };

 const handleButtonClick = () => {
  document.getElementById('fileInput').click();
 };

 const handleImageUpload = (event) => {
  event.preventDefault();
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
   const imageBase64 = reader.result;
   setItemData({ ...itemData, newItemUrl: imageBase64 });
  };

  if (file) {
   reader.readAsDataURL(file);
  }
 };

 const handleSubmit = async (event) => {
  event.preventDefault();

  try {
   const token = sessionStorage.getItem('token');
   const newItem = {
    newItemUserId: token,
    newItemName: itemData.newItemName,
    newItemDescription: itemData.newItemDescription,
    newItemCategory: itemData.newItemCategory,
    newItemType: itemData.newItemType,
    newItemScientificName: itemData.newItemScientificName,
    newItemUrl: itemData.newItemUrl,
   };
   const response = fetch(` http://localhost:3001/gallery/newItem`, {
    method: 'POST',
    body: JSON.stringify(newItem),
    headers: {
     'Content-type': 'application/json',
    },
   });
   handleSuccess();
   setItemData({
    newItemName: '',
    newItemScientificName: '',
    newItemDescription: '',
    newItemCategory: '',
    newItemType: '',
    newItemUrl: '',
   });
   handleClose();
  } catch (error) {
   setError(error);
   setError(null);
  }

  handleSuccess();
 };

 return (
  <Box sx={{}}>
   <Button
    onClick={handleOpen}
    sx={{ fontSize: '18px', position: 'relative' }}
   >
    <Box
     sx={{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'orange',
      p: 1,
      color: 'primary.main',
      borderRadius: 1,

      ':hover': { opacity: 0.9 },
     }}
    >
     <AddPhoto fontSize="medium" />
     Request New Item
    </Box>
   </Button>
   <Modal
    open={open}
    onClose={handleClose}
   >
    <Box
     sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'orange',
      boxShadow: 24,
      p: 4,
      width: 600,
      maxWidth: '95%',
      borderRadius: 2,
     }}
    >
     <Typography
      variant="h5"
      component="h2"
      gutterBottom
     >
      Add Item
     </Typography>
     <FormControl onSubmit={handleSubmit}>
      <form onSubmit={() => handleSubmit}>
       <Grid
        container
        direction="row"
        spacing={2}
       >
        <Grid
         item
         xs={6}
        >
         <TextField
          name="newItemName"
          label="Item Name"
          value={itemData.newItemName}
          onChange={handleFormChange}
          fullWidth
          required
          sx={{ my: 1 }}
         />
         <TextField
          name="newItemDescription"
          label="Item Description"
          multiline
          rows={2}
          value={itemData.newItemDescription}
          onChange={handleFormChange}
          fullWidth
          required
          sx={{ my: 1 }}
         />
         <TextField
          name="newItemScientificName"
          label="Scientific Name"
          value={itemData.newItemScientificName}
          onChange={handleFormChange}
          fullWidth
          sx={{ my: 1 }}
         />
         <FormControl
          fullWidth
          sx={{ color: 'primary.main' }}
         >
          <InputLabel id="itemCategoryLabel">Item Category</InputLabel>
          <Select
           name="newItemCategory"
           labelId="itemCategoryLabel"
           value={itemData.newItemCategory}
           label="Item Category"
           required
           onChange={handleFormChange}
           sx={{ my: 1 }}
          >
           <MenuItem
            value=""
            disabled
           >
            <em> Select Item Category</em>
           </MenuItem>
           <MenuItem value="softscape">Softscape</MenuItem>
           <MenuItem value="hardscape">Hardscape</MenuItem>
          </Select>
         </FormControl>
         <TextField
          name="newItemType"
          label="Item Type"
          value={itemData.newItemType}
          onChange={handleFormChange}
          fullWidth
          // required
          sx={{ my: 1 }}
         />
        </Grid>
        <Grid
         item
         xs={6}
        >
         {' '}
         {itemData.newItemUrl ? (
          <Box
           sx={{
            width: '100%',
            objectFit: 'contain',
            overFlow: 'hidden',
           }}
          >
           <Box
            sx={{
             objectFit: 'contain',
             overFlow: 'hidden',
            }}
           >
            <img
             src={itemData.newItemUrl}
             style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
           </Box>

           <Button
            onClick={handleButtonClick}
            sx={{
             bgcolor: 'primary.main',
             color: 'white',
             width: '300px',
            }}
           >
            Replace Image
           </Button>
           <input
            type="file"
            id="fileInput"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
           />
          </Box>
         ) : (
          <>
           <Button onClick={handleButtonClick}>
            <Box
             sx={{
              color: 'orange',
              fontSize: '50px',
              backgroundColor: 'primary.main',
              p: 3,
              m: 2,
              borderRadius: 2,
              boxShadow: 10,
              ':hover': { opacity: 0.9, marginBottom: 1 },
             }}
            >
             <AddIcon fontSize="large" />

             <Box sx={{ color: 'inherit' }}>Add Image</Box>
            </Box>
           </Button>
           <input
            type="file"
            id="fileInput"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
           />
          </>
         )}
        </Grid>
       </Grid>

       <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
       >
        Submit
       </Button>
      </form>
     </FormControl>
    </Box>
   </Modal>
  </Box>
 );
};

export default AddNewItemButton;
