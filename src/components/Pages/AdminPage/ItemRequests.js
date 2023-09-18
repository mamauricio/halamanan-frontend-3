import React, { useState } from 'react';
import {
 Grid,
 Box,
 Button,
 Container,
 Typography,
 FormControl,
 TextField,
 MenuItem,
 InputLabel,
 Select,
 Alert,
 Grow,
} from '@mui/material';
import RequestedItems from './RequestedItems';
import DeleteButton from './DeleteButton';
import ApproveButton from './ApproveButton';
import EditButton from './EditButton';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import QuestionMark from '@mui/icons-material/QuestionMark';

const ItemManagement = () => {
 const [openItem, setOpenItem] = useState(false);
 const [openAlert, setOpenAlert] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 const [error, setError] = useState('');
 const [selectedItem, setSelectedItem] = useState('');
 const handleOpenAlert = () => {
  setOpenAlert(true);
  const timeout = setTimeout(() => {
   handleCloseAlert();
  }, 4 * 1000);
 };

 const handleCloseAlert = () => {
  setError('false');
  setAlertMessage('');
  setOpenAlert(false);
 };

 const [itemData, setItemData] = useState({
  newItemName: '',
  newItemScientificName: '',
  newItemDescription: '',
  newItemCategory: '',
  newItemType: '',
  newItemUrl: '',
 });

 const handleSelectedItem = (item) => {
  if (selectedItem === item) {
   setOpenItem(false);
   const timer5 = setTimeout(() => {
    setSelectedItem('');
   }, 300);
  } else {
   setOpenItem(false);
   const timer = setTimeout(() => {
    setSelectedItem(item);
    setOpenItem(true);
   }, 300);
  }
 };

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
    'Error adding item. Make Sure all the fields are correct and item is unique'
   );
  }
 };

 const labelStyle = {
  color: 'orange',
  pb: 1,
  fontSize: '18px',
 };

 const textFieldStyle = {
  style: {
   color: 'white',
  },
 };

 return (
  <motion.div
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Container
    maxWidth="xl"
    disableGutters
    sx={{
     borderRadius: 1,
     p: 2,
    }}
   >
    <Typography variant="h5">Item Requests</Typography>

    {openAlert && (
     <Grow in={openAlert}>
      <Alert
       variant="outlined"
       severity={error ? 'error' : 'success'}
       sx={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
       }}
      >
       {alertMessage}
      </Alert>
     </Grow>
    )}
    <Box>
     <Grid
      container
      sx={{
       height: 'auto',
       borderRadius: 1,
      }}
     >
      <Grid
       item
       xs={3}
       sx={{
        overflowY: 'auto',
        height: '82vh',
        borderColor: 'primary.main',
        borderRadius: 1,
        width: '100%',
        mt: 2,
       }}
      >
       <Box
        sx={{
         height: 'auto',
         display: 'flex',
         borderRadius: 1,
         overflowY: 'auto',
         mb: 1,
        }}
       >
        <Box
         sx={{
          height: 'auto',
          borderRadius: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
         }}
        >
         <Box sx={{ mt: 1 }}>
          <RequestedItems handleSelectedItem={handleSelectedItem} />
         </Box>
        </Box>
       </Box>
      </Grid>
      <Grid
       item
       xs={9}
       sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
       }}
      >
       {selectedItem && (
        <Grow in={openItem}>
         <Box
          sx={{
           width: '80%',
           height: '100%',
           display: 'flex',
           flexDirection: 'column',
           bgcolor: 'rgba(255,255,255,0.3)',
           borderRadius: 1,
           m: 3,
           alignItems: 'center',
          }}
         >
          <Box
           sx={{
            width: '30%',
            justifyContent: 'space-evenly',
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'primary.main',

            borderRadius: 1,
            mt: 5,
            mb: 3,
            px: 2,
            py: 1.2,
           }}
          >
           <>
            <DeleteButton itemData={selectedItem} />
            <EditButton newItemData={selectedItem} />
            <ApproveButton itemData={selectedItem} />
           </>
          </Box>

          <Box
           sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 1,
            width: '90%',
            mt: 4,
            p: 2,
           }}
          >
           <Box sx={{ width: '100%' }}>
            <Box
             sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
             }}
            >
             <Box>
              <Box sx={labelStyle}>
               {' '}
               Item Name:{' '}
               <span style={{ color: 'white' }}>
                {selectedItem.newItemName ? selectedItem.newItemName : 'null'}{' '}
               </span>{' '}
              </Box>
              <Box sx={labelStyle}>
               {' '}
               Scientific Name:{' '}
               {selectedItem.newItemScientificName ? (
                <span style={{ color: 'white' }}>
                 <em>{selectedItem.newItemScientificName}</em>
                </span>
               ) : (
                'null'
               )}
              </Box>
              <Box sx={labelStyle}>
               {' '}
               Item Description:{' '}
               <span style={{ color: 'white' }}>
                {selectedItem.newItemDescription
                 ? selectedItem.newItemDescription
                 : 'null'}
               </span>
              </Box>
              <Box sx={labelStyle}>
               Item Category:{' '}
               <span style={{ color: 'white' }}>
                {selectedItem.newItemCategory
                 ? selectedItem.newItemCategory
                 : 'null'}
               </span>
              </Box>
              <Box sx={labelStyle}>
               Item Type:{' '}
               <span style={{ color: 'white' }}>
                {selectedItem.newItemType ? selectedItem.newItemType : 'null'}
               </span>
              </Box>
             </Box>
             <Box
              sx={{
               minHeight: '500px',
               minWidth: '300px',
               maxWidth: '300px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               borderRadius: 1,
               bgcolor: 'rgba(255,255,255,0.8)',
               p: 2,
               ml: 1,
              }}
             >
              {selectedItem.newItemUrl === '' ? (
               <Box
                sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 height: '150px',
                 width: 'inherit',
                 justifyContent: 'center',
                 alignItems: 'center',
                }}
               >
                <QuestionMark
                 fontSize="large"
                 sx={{ color: 'rgba(0,0,0,0.4)' }}
                />
                <Typography
                 variant="h5"
                 sx={{ color: 'rgba(0,0,0,0.4)', mt: 3 }}
                >
                 Upload Image
                </Typography>
               </Box>
              ) : (
               <img
                src={selectedItem.newItemUrl}
                style={{
                 maxHeight: '100%',
                 maxWidth: '100%',
                 objectFit: 'contain',
                }}
               />
              )}
             </Box>
            </Box>
           </Box>
          </Box>
         </Box>
        </Grow>
       )}

       {!selectedItem && (
        <Grow in={!selectedItem}>
         <Box
          sx={{
           bgcolor: 'rgba(255,255,255,0.3)',
           m: 2,
           p: 2,
           mt: 3,
           borderRadius: 1,
           //  pb: 7,
           height: '78vh',
          }}
         >
          <Box>
           <Typography
            variant="h5"
            gutterBottom
            sx={{
             color: 'rgba(255,255,255,0.8)',
             //  ml: 1,
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
                 //  inputProps={textFieldStyle}
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
                  // bgcolor: 'yellow',
                  // justifyContent: 'center',
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
               //  alignItems: 'center',
              }}
             >
              <Button
               title="Add Item"
               type="submit"
               // variant="contained"
               sx={{
                mt: 6,
                fontSize: '20px',
                color: 'orange',
                bgcolor: 'primary.main',
                width: '50%',
                ':hover': {
                 bgcolor: 'rgba(255,255,255,0.3)',
                 // bgcolor: 'rgba(0,0,0,0.8)',
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
        </Grow>
       )}
      </Grid>
     </Grid>
    </Box>
   </Container>
  </motion.div>
 );
};

export default ItemManagement;
