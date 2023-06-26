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

const ItemManagement = () => {
 const [openItem, setOpenItem] = useState(false);
 const [openAlert, setOpenAlert] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 const [error, setError] = useState('');
 const [selectedItem, setSelectedItem] = useState();
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
    setSelectedItem(null);
   }, 800);
  } else {
   const timer3 = setTimeout(() => {
    setOpenItem(false);
    const timer1 = setTimeout(() => {
     setSelectedItem(item);
    }, 500);
   }, 400);

   const timer2 = setTimeout(() => {
    setOpenItem(true);
   }, 900);
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
   const response = fetch(`http://localhost:3001/gallery/add-item`, {
    method: 'POST',
    body: JSON.stringify(newItem),
    headers: {
     'Content-type': 'application/json',
    },
   });
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
   setError(null);
  }
 };

 return (
  <motion.div
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Container
    maxWidth="xl"
    disableGutters={true}
    spacing={2}
    sx={{ borderRadius: 2, mt: 2 }}
   >
    {openAlert && (
     <Grow in={openAlert}>
      <Alert
       variant="outlined"
       severity={error ? 'error' : 'success'}
       sx={{
        //  bgcolor: 'white',
        //  color: 'red',
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
    <Box sx={{ mt: 2, bgcolor: 'white', height: '100%' }}>
     <Grid
      container
      sx={{
       backgroundColor: 'primary.main',
       height: 'auto',
       //  mt: 3,
       borderRadius: 2,
       // width:
      }}
     >
      <Grid
       item
       xs={3}
       sx={{
        overflowY: 'auto',
        height: '75vh',
        borderColor: 'primary.main',
        borderRadius: 2,
        width: '100%',
        mt: 2,
       }}
      >
       <Box
        sx={{
         height: '100%',
         display: 'flex',
         bgcolor: 'orange',
         borderRadius: 2,

         overflowY: 'auto',
         ml: 2,
         mb: 1,
        }}
       >
        <Box
         sx={{
          height: 'auto',
          borderRadius: 2,
          m: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
         }}
        >
         <Box
          sx={{
           color: 'primary.main',
           fontSize: '30px',
           borderBottom: 'solid 1px ',
           borderColor: 'primary.main',
           borderColor: 'ActiveBorder',
           width: '100%',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
          }}
         >
          Item Requests
         </Box>
         <Box sx={{ mt: 1 }}>
          <RequestedItems handleSelectedItem={handleSelectedItem} />
         </Box>
        </Box>
       </Box>
      </Grid>
      <Grid
       item
       xs={9}
       sx={{}}
      >
       <Box
        sx={{
         display: 'flex',
         bgcolor: 'orange',
         // flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: 2,
         m: 2,
        }}
       >
        {selectedItem ? (
         <Grow in={openItem}>
          <div>
           <Box
            sx={{
             bgcolor: 'primary.main',
             // bgcolor: 'orange',
             width: 'auto',
             height: 'auto',
             // m: 2,
             p: 2,
             borderRadius: 2,
             border: 'solid 1px orange',
             display: 'flex',
             flexDirection: 'column',
            }}
           >
            <Box
             sx={{
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              mb: 1,
              bgcolor: 'orange',
             }}
            >
             <img
              src={selectedItem.newItemUrl}
              style={{
               maxHeight: '100%',
               objectFit: 'contain',
              }}
             />
            </Box>
            <Box sx={{ color: 'orange', fontSize: '18px' }}>
             {' '}
             Item Name:{' '}
             <span style={{ color: 'white' }}>
              {selectedItem.newItemName ? selectedItem.newItemName : 'null'}{' '}
             </span>{' '}
            </Box>
            <Box sx={{ color: 'orange', fontSize: '18px' }}>
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
            <Box sx={{ color: 'orange', fontSize: '18px' }}>
             {' '}
             Item Description:{' '}
             <span style={{ color: 'white' }}>
              {selectedItem.newItemDescription
               ? selectedItem.newItemDescription
               : 'null'}
             </span>
            </Box>
            <Box sx={{ color: 'orange', fontSize: '18px' }}>
             Item Category:{' '}
             <span style={{ color: 'white' }}>
              {selectedItem.newItemCategory
               ? selectedItem.newItemCategory
               : 'null'}
             </span>
            </Box>
            <Box sx={{ color: 'orange', fontSize: '18px' }}>
             Item Type:{' '}
             <span style={{ color: 'white' }}>
              {selectedItem.newItemType ? selectedItem.newItemType : 'null'}
             </span>
            </Box>
            <Box
             sx={{
              width: '100%',
              justifyContent: 'space-evenly',
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'white',
              borderRadius: 2,
              mt: 2,
              // mt: 1,
              py: 1,
             }}
            >
             <DeleteButton itemData={selectedItem} />
             <EditButton newItemData={selectedItem} />
             <ApproveButton itemData={selectedItem} />
            </Box>
           </Box>
          </div>
         </Grow>
        ) : (
         <Grow in={!selectedItem}>
          <Box sx={{ m: 2 }}>
           <Box
            sx={{
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
                 required
                 sx={{ my: 1 }}
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
          </Box>
         </Grow>
        )}
       </Box>
      </Grid>
     </Grid>
    </Box>
   </Container>
  </motion.div>
 );
};

export default ItemManagement;
