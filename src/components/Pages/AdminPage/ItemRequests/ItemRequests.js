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
import NewItemForm from './NewItemForm';

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

 const handleSuccess = (message) => {
  setError(null);
  setAlertMessage(message);
  handleOpenAlert();
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
      spacing={1}
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
        borderRight: 'solid 1px black',
        // borderColor: 'primary.main',
        pr: 2,
        // borderRadius: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        // mr: 2,
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
            <DeleteButton
             itemData={selectedItem}
             handleSuccess={handleSuccess}
             setSelectedItem={setSelectedItem}
            />
            <EditButton newItemData={selectedItem} />
            <ApproveButton
             itemData={selectedItem}
             handleSuccess={handleSuccess}
            />
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
         <div>
          <NewItemForm
           setError={setError}
           setAlertMessage={setAlertMessage}
           handleOpenAlert={handleOpenAlert}
          />
         </div>
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
