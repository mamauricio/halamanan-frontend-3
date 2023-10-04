import React, { useState } from 'react';
import {
 Box,
 FormControl,
 Typography,
 Grid,
 Button,
 MenuItem,
 Select,
 TextField,
 InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const NewItemForm = ({ setError, setAlertMessage, handleOpenAlert }) => {
 const [itemData, setItemData] = useState({
  newItemUserId: '',
  newItemName: '',
  newItemScientificName: '',
  newItemDescription: '',
  newItemCategory: '',
  newItemType: '',
  newItemUrl: '',
 });

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
  if (itemData.newItemUrl === '') {
   setError(true);
   setAlertMessage('Image is required');
   handleOpenAlert();
   return;
  }
  try {
   const newItem = {
    itemName: itemData.newItemName,
    scientificName: itemData.newItemScientificName,
    itemInformation: itemData.newItemDescription,
    category: itemData.newItemCategory,
    type: itemData.newItemType,
    informationSource: itemData.newItemInformationSource,
    imageSource: itemData.newItemImageSource,
    imageUrl: itemData.newItemUrl,
   };
   const response = fetch(
    `https://halamanan-197e9734b120.herokuapp.com/gallery/add-item`,
    {
     method: 'POST',
     body: JSON.stringify(newItem),
     headers: {
      'Content-type': 'application/json',
     },
    }
   );

   if (response) {
    setItemData({
     newItemName: '',
     newItemScientificName: '',
     newItemDescription: '',
     newItemCategory: '',
     newItemType: '',
     newItemUrl: '',
     newItemInformation: '',
     newItemImageSource: '',
    });
    setAlertMessage('Added item succesfully!');
    setError(false);
    handleOpenAlert();
   }
  } catch (error) {
   setError(true);
   setAlertMessage(
    'Error adding item. Make Sure all the fields are correct and item is unique.'
   );
  }
 };

 const textFieldStyle = {
  style: {
   color: 'white',
  },
 };

 return (
  <Box
   sx={{
    bgcolor: 'rgba(255,255,255,0.3)',
    m: 2,
    p: 2,
    mt: 3,
    borderRadius: 1,
    height: '75vh',
   }}
  >
   <Box>
    <Typography
     variant="h5"
     gutterBottom
     sx={{
      color: 'rgba(255,255,255,0.8)',
     }}
    >
     Add New Item
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
        sx={{ color: 'white' }}
       >
        <TextField
         name="newItemName"
         label="Item Name"
         value={itemData.newItemName}
         onChange={handleFormChange}
         fullWidth
         required
         sx={{ my: 1 }}
         inputProps={textFieldStyle}
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
         inputProps={textFieldStyle}
        />
        <TextField
         name="newItemScientificName"
         label="Scientific Name"
         value={itemData.newItemScientificName}
         onChange={handleFormChange}
         fullWidth
         sx={{ my: 1 }}
         inputProps={textFieldStyle}
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
          sx={{ my: 1, color: 'white' }}
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
         required
         sx={{ my: 1 }}
         inputProps={textFieldStyle}
        />
        <TextField
         name="newItemInformation"
         label="Item Information"
         multiline
         rows={2}
         value={itemData.newItemInformation}
         onChange={handleFormChange}
         fullWidth
         required
         sx={{ my: 1 }}
         inputProps={textFieldStyle}
        />
        <TextField
         name="newItemImageSource"
         label="Image Source"
         multiline
         rows={2}
         value={itemData.newItemImageSource}
         onChange={handleFormChange}
         fullWidth
         required
         sx={{ my: 1 }}
         inputProps={textFieldStyle}
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
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
          }}
         >
          <Box
           sx={{
            objectFit: 'contain',
            overFlow: 'hidden',
            bgcolor: 'rgba(255,255,255,0.8)',
            p: 2,
            m: 1,
            mb: 2,
            borderRadius: 1,
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
             borderRadius: 1,
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
      <Box
       sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
       }}
      >
       <Button
        title="Add Item"
        type="submit"
        sx={{
         mt: 6,
         fontSize: '20px',
         color: 'orange',
         bgcolor: 'primary.main',
         width: '50%',
         ':hover': {
          bgcolor: 'rgba(255,255,255,0.3)',
          color: 'white',
         },
        }}
       >
        Add Item
       </Button>
      </Box>
     </form>
    </FormControl>
   </Box>
  </Box>
 );
};

export default NewItemForm;
