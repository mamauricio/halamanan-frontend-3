import React, { useState } from 'react';
import { Grid, Box, Button, Container } from '@mui/material';
import RequestedItems from './RequestedItems';
import DeleteButton from './DeleteButton';
import ApproveButton from './ApproveButton';
import EditButton from './EditButton';
import AddNewItemButton from './AddNewItemButton';

const AdminPage2 = () => {
 const [openItem, setOpenItem] = useState(false);
 const [selectedItem, setSelectedItem] = useState();
 const handleSelectedItem = (item) => {
  if (selectedItem === item) {
   setOpenItem(false);
   setSelectedItem(null);
  } else {
   setSelectedItem(item);
   setOpenItem(true);
  }
 };
 const handleLogout = () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = 'https://halamanan.netlify.app/login';
 };

 return (
  <Container
   maxWidth="xl"
   disableGutters={true}
   sx={{ backgroundColor: 'orange', borderRadius: 2 }}
  >
   <Box
    sx={{
     display: 'flex',
     flexDirection: 'row',
     justifyContent: 'space-between',
     pt: 2,
     px: 2,
    }}
   >
    <Box sx={{ color: 'primary.main', fontSize: '30px', mt: 2 }}>
     Admin Dashboard
    </Box>
    <Button
     onClick={handleLogout}
     sx={{
      color: 'orange',
      backgroundColor: 'primary.main',
      fontSize: '30px',
     }}
    >
     Logout
    </Button>
   </Box>
   <Grid
    container
    sx={{
     backgroundColor: 'primary.main',
     height: '80vh',
     mt: 3,
     borderRadius: 2,
    }}
   >
    <Grid
     item
     xs={4}
     sx={{
      bgcolor: 'orange',
      overflowY: 'auto',
      height: 'inherit',
      border: 'solid 2px',
      borderColor: 'primary.main',
      borderRadius: 2,
     }}
    >
     <Box
      sx={{
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       flexDirection: 'column',
       mt: 2,
       overflowY: 'auto',
      }}
     >
      <Box sx={{ color: 'primary.main', fontSize: '30px' }}>
       Requested Items
      </Box>
      <RequestedItems handleSelectedItem={handleSelectedItem} />
     </Box>
    </Grid>
    <Grid
     item
     xs={8}
     sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
     }}
    >
     {selectedItem && (
      <>
       <Box
        sx={{
         bgcolor: 'primary.main',
         width: 'auto',
         height: 'auto',
         m: 2,
         p: 2,
         borderRadius: 2,
         border: 'solid 1px orange',
        }}
       >
        <Box
         sx={{
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'orange',
          borderRadius: 2,
          mb: 1,
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
          {selectedItem.newItemCategory ? selectedItem.newItemCategory : 'null'}
         </span>
        </Box>
        <Box sx={{ color: 'orange', fontSize: '18px' }}>
         Item Type:{' '}
         <span style={{ color: 'white' }}>
          {selectedItem.newItemType ? selectedItem.newItemType : 'null'}
         </span>
        </Box>
       </Box>
       <Box
        sx={{
         bgcolor: 'orange',
         width: '40%',
         justifyContent: 'space-evenly',
         display: 'flex',
         borderRadius: 2,
         p: 1,
        }}
       >
        <DeleteButton itemData={selectedItem} />
        <EditButton newItemData={selectedItem} />
        <ApproveButton itemData={selectedItem} />
       </Box>
      </>
     )}
     {!selectedItem && <AddNewItemButton />}
    </Grid>
   </Grid>
  </Container>
 );
};

export default AdminPage2;
