import React, { useState, useEffect } from 'react';
import {
 Grid,
 Box,
 Container,
 Typography,
 Button,
 Modal,
 Alert,
 Zoom,
 Grow,
 Fade,
} from '@mui/material/';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
const UserProfile = () => {
 const [value, setValue] = useState(0);
 const [showProfile, setShowProfile] = useState(false);
 const [showItems, setShowItems] = useState(false);
 const [error, setError] = useState('');
 const [open, setOpen] = useState(false);
 const [openAlert, setOpenAlert] = useState(false);
 const [pendingItems, setPendingItems] = useState([]);
 const [user, setUser] = useState('');
 const [openMain, setOpenMain] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
   setOpenMain(true);
  }, 100);
 }, []);

 const handleOpenAlert = () => {
  setOpenAlert(true);
  setTimeout(() => {
   setOpenAlert(false);
  }, 3 * 1000);
 };
 const handleCloseAlert = () => {
  setOpenAlert(false);
 };
 const handleOpen = () => {
  setOpen(true);
 };
 const handleClose = () => {
  setOpen(false);
 };

 const handleChange = (event, newValue) => {
  setValue(newValue);
 };

 useEffect(() => {
  const fetchUser = async () => {
   const response = await fetch(`http://localhost:3001/profile/`, {
    headers: {
     token: `${sessionStorage.getItem('token')}`,
    },
   });

   try {
    const user = await response.json();
    setUser(user);
   } catch (error) {}
  };

  fetchUser();
  setShowProfile(true);
 }, []);

 useEffect(() => {
  const fetchPendingItems = async () => {
   const response = await fetch(`http://localhost:3001/profile/pending`, {
    headers: {
     newItemUserId: `${sessionStorage.getItem('token')}`,
    },
   });

   try {
    const pendingItems = await response.json();

    setPendingItems(pendingItems);
    setShowItems(true);
   } catch (error) {}
  };
  fetchPendingItems();
 }, []);

 const handleDelete = async (itemId) => {
  try {
   const response = await axios.delete(
    `http://localhost:3001/profile/pending`,
    {
     params: {
      id: itemId,
     },
    }
   );

   const updated = pendingItems.filter(
    (pendingItem) => pendingItem._id !== itemId
   );

   setPendingItems(updated);
   handleOpenAlert();
   handleCloseAlert();
   handleClose();
  } catch (error) {
   setError(error);
  }
 };

 return (
  <Fade in={openMain}>
   <Container
    maxWidth="xl"
    disableGutters={true}
    sx={{ bgcolor: 'primary.main', height: '85vh', mt: 2, borderRadius: 2 }}
   >
    <Box sx={{ color: 'orange', pt: 2 }}>
     <h2>Profile</h2>
    </Box>
    <Container
     maxWidth="lg"
     disableGutters={true}
     sx={{
      height: '65vh',
      bgcolor: 'orange',
      borderRadius: 2,
     }}
    >
     <Grid
      container
      sx={{ height: '800px', p: 2 }}
     >
      <Grid
       item
       xs={2}
      >
       <Box
        component="nav"
        sx={{
         color: 'primary.main',
         borderRight: 1,
         borderColor: 'divider',
         height: '100%',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'start',
        }}
       >
        <Box
         onClick={(event) => handleChange(event, 0)}
         sx={{
          py: 2,
          px: 2,
          mr: 2,
          borderRadius: 2,
          cursor: 'pointer',
          color: value === 0 ? 'orange' : 'primary.main',
          borderBottom: '2px',
          borderColor: 'divider',
          bgcolor: value === 0 ? 'primary.main' : 'transparent',
         }}
        >
         <Typography>Information</Typography>
        </Box>
        <Box
         onClick={(event) => handleChange(event, 1)}
         sx={{
          py: 2,
          px: 2,
          mr: 2,
          borderRadius: 2,

          color: value === 1 ? 'orange' : 'primary.main',
          cursor: 'pointer',
          bgcolor: value === 1 ? 'primary.main' : 'transparent',
         }}
        >
         <Typography>Requested Items</Typography>
        </Box>
       </Box>
      </Grid>
      <Grid
       item
       xs={10}
      >
       <Box>
        {value === 0 && (
         <Box
          sx={{
           color: 'primary.main',
           mt: '20%',
           display: 'flex',
           top: '30%',
           justifyContent: 'center',
           alignItems: 'center',
           height: '100%',
          }}
         >
          <Grow in={showProfile}>
           <Box
            sx={{
             bgcolor: 'primary.main',
             width: '300px',
             height: '150px',
             position: 'absolute',
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center',
             borderRadius: 2,
             boxShadow: 5,
            }}
           >
            <Box sx={{ color: 'orange' }}>First Name: {user.firstName}</Box>
            <Box sx={{ color: 'orange', py: 2 }}>
             Last Name: {user.lastName}
            </Box>
            <Box sx={{ color: 'orange' }}>Email: {user.email}</Box>
           </Box>
          </Grow>
         </Box>
        )}
        {value === 1 && (
         <Box
          sx={{
           color: 'primary.main',
           p: 3,
           overflowY: 'auto',
           height: '500px',
          }}
         >
          <Typography>Pending Items</Typography>
          <Box
           sx={{
            display: 'flex',
            //    bgcolor: 'yellow',
            flexDirection: 'row',
            height: '10vh',
            //    overFlowY: 'hidden',
            flexWrap: 'wrap',
           }}
          >
           {' '}
           {pendingItems.map((item, index) => (
            <Grow
             in={showItems}
             key={index}
            >
             <Box
              key={index}
              sx={{
               color: 'primary.main',
               bgcolor: 'primary.main',
               borderRadius: 2,
               boxShadow: 5,
               width: '300px',

               m: 1,
               p: 2,
              }}
             >
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
               <Button
                onClick={handleOpen}
                sx={{
                 color: 'primary.main',
                 bgcolor: 'orange',
                 mb: 1,
                 ':hover': {
                  backgroundColor: 'red',
                  opacity: 0.9,
                  color: 'orange',
                 },
                }}
               >
                <DeleteOutlineIcon />
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
                  Are you sure you want to delete request for {item.newItemName}
                  ?
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
                   onClick={() => handleDelete(item._id)}
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
               <Zoom
                in={openAlert}
                onClose={handleCloseAlert}
               >
                <Alert
                 onClose={handleCloseAlert}
                 severity={!error ? 'success' : 'error'}
                 sx={{
                  backgroundColor: !error ? 'primary.main' : 'red',
                  position: 'absolute',
                  zIndex: 1,
                  height: '40px',
                  left: '35%',
                  top: '9%',
                 }}
                >
                 {!error ? 'Deleted Successfully' : error}
                </Alert>
               </Zoom>
              </Box>
              <Box>
               {item.newItemUrl && (
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
                  src={item.newItemUrl}
                  style={{
                   maxHeight: '100%',
                   objectFit: 'contain',
                  }}
                 />
                </Box>
               )}
              </Box>
              <Box> Item name: {item.newItemName} </Box>
              <Box>
               {item.newItemScientificName && (
                <Box>
                 Scientific Name:
                 <em> {item.newItemScientificName}</em>
                </Box>
               )}
              </Box>
              <Box>
               Item Description:{' '}
               {item.newItemDescription && item.newItemDescription}
              </Box>
              <Box>
               Item Category: {item.newItemCategory && item.newItemCategory}
              </Box>
              <Box>
               {item.newItemType && <Box> Item Type: {item.newItemType} </Box>}
              </Box>
             </Box>
            </Grow>
           ))}{' '}
          </Box>
         </Box>
        )}
       </Box>
      </Grid>
     </Grid>
    </Container>
   </Container>
  </Fade>
 );
};

export default UserProfile;
