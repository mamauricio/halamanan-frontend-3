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
 //  Fade,
 TextField,
} from '@mui/material/';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { motion } from 'framer-motion';

const UserProfile = () => {
 const [value, setValue] = useState(0);
 const [showProfile, setShowProfile] = useState(false);
 const [showItems, setShowItems] = useState(false);
 const [error, setError] = useState('');
 const [open, setOpen] = useState(false);
 const [openAlert, setOpenAlert] = useState(false);
 const [pendingItems, setPendingItems] = useState([]);
 const [user, setUser] = useState('');
 const [selectedItem, setSelectedItem] = useState('');
 const [openMain, setOpenMain] = useState(false);
 const [editing, setEditing] = useState(false);
 const [userData, setUserData] = useState({
  firstName: '',
  lastName: '',
  email: '',
 });

 const handleFormChange = (event) => {
  setError('');
  setUserData({
   ...userData,
   [event.target.name]: event.target.value,
  });
 };

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
 const handleOpen = (item) => {
  setSelectedItem(item);
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
    setUserData({
     firstName: user.firstName,
     lastName: user.lastName,
     email: user.email,
    });
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

 const boxStyle = {
  display: 'flex',
  p: 1,
  color: 'orange',
 };

 const textStyle = {
  color: 'rgba(255,255,255,0.8)',
  width: '100px',
  justifyContent: 'right',
  display: 'flex',
  mr: 1,
 };

 const handleSave = async () => {
  const token = sessionStorage.getItem('token');

  try {
   const response = await axios.patch(
    `http://localhost:3001/profile/${token}`,
    userData
   );
   if (response) {
    const user = response.data;
    setUser(user);
    setEditing(false);
   }
  } catch (response) {
   setError(response.response.data.error);
  }
 };

 const handleCancel = () => {
  setUserData({
   firstName: user.firstName,
   lastName: user.lastName,
   email: user.email,
  });
  setEditing(false);
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
    sx={{ bgcolor: 'primary.main', height: '85vh', mt: 2, borderRadius: 2 }}
   >
    <Typography variant="h5">Profile</Typography>
    <Container
     maxWidth="xl"
     disableGutters={true}
     sx={{
      height: '65vh',
      bgcolor: 'rgba(255,255,255,0.1)',
      borderRadius: 2,
      m: 1,
      mt: 2,
      p: 1,
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
          color: value === 0 ? 'orange' : 'rgba(255,255,255,0.7)',
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

          color: value === 1 ? 'orange' : 'rgba(255,255,255,0.7)',
          bgcolor: value === 1 ? 'primary.main' : 'transparent',
          cursor: 'pointer',
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
           justifyContent: 'center',
           alignItems: 'center',
           display: 'flex',
           flexDirection: 'column',
          }}
         >
          <Typography
           variant="h6"
           sx={{ my: 3, color: 'rgba(255,255,255,0.8)' }}
          >
           Account Information
          </Typography>
          <Grow in={showProfile}>
           <Box sx={{}}>
            <Box sx={boxStyle}>
             <Typography sx={textStyle}>First Name:</Typography>
             {editing && (
              <TextField
               name="firstName"
               value={userData.firstName}
               onChange={handleFormChange}
               inputProps={{
                style: {
                 color: 'white',
                },
               }}
               sx={{ width: '300px' }}
              />
             )}
             {!editing && (
              <Typography sx={{ ml: 1 }}>{user.firstName}</Typography>
             )}
            </Box>
            <Box sx={boxStyle}>
             <Typography sx={textStyle}>Last Name:</Typography>
             {editing && (
              <TextField
               name="lastName"
               value={userData.lastName}
               onChange={handleFormChange}
               inputProps={{
                style: {
                 color: 'white',
                },
               }}
               sx={{ width: '300px' }}
              />
             )}
             {!editing && (
              <Typography sx={{ ml: 1 }}>{user.lastName}</Typography>
             )}
            </Box>
            <Box sx={boxStyle}>
             <Typography sx={textStyle}>Email:</Typography>
             {editing && (
              <TextField
               name="email"
               required
               email
               error={error}
               helperText={error}
               value={userData.email}
               onChange={handleFormChange}
               inputProps={{
                style: {
                 color: 'white',
                },
               }}
               sx={{ width: '300px' }}
              />
             )}
             {!editing && <Typography sx={{ ml: 1 }}>{user.email}</Typography>}
            </Box>
            <Box
             sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
             }}
            >
             {!editing && (
              <Button
               onClick={() => {
                setEditing(true);
               }}
               sx={{
                bgcolor: 'orange',
                ':hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.3)' },
               }}
              >
               {' '}
               Edit Information
              </Button>
             )}
             {editing && (
              <Box
               sx={{
                width: '80%',
                display: 'flex',
                justifyContent: 'space-evenly',
                // bgcolor: 'orange',
               }}
              >
               <Button
                onClick={() => handleCancel()}
                sx={{
                 width: '100px',
                 bgcolor: 'rgba(255,255,255,0.2)',
                 color: 'rgba(255,255,255,0.5)',
                 transition:
                  'background-color ease-in-out 0.2s, color ease-in-out 0.2s',
                 ':hover': { bgcolor: 'red', color: 'white' },
                }}
               >
                cancel
               </Button>
               <Button
                onClick={() => handleSave()}
                sx={{
                 width: '100px',
                 bgcolor: 'orange',
                 ':hover': { bgcolor: 'orange', color: 'white' },
                }}
               >
                save
               </Button>
              </Box>
             )}
            </Box>
            {/* </Box> */}
           </Box>
          </Grow>
         </Box>
        )}
        {value === 1 && (
         <Box
          sx={{
           p: 3,
           overflowY: 'auto',
           height: '500px',
          }}
         >
          <Typography
           variant="h6"
           sx={{ color: 'orange' }}
          >
           Pending Items
          </Typography>
          <Box
           sx={{
            display: 'flex',
            flexDirection: 'row',
            height: '10vh',
            flexWrap: 'wrap',
           }}
          >
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
              Are you sure you want to delete request for{' '}
              {selectedItem.newItemName}?
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
               onClick={() => handleDelete(selectedItem._id)}
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
                title="Delete Request"
                onClick={() => handleOpen(item)}
                sx={{
                 color: 'primary.main',
                 bgcolor: 'orange',
                 mb: 1,
                 ':hover': {
                  backgroundColor: 'red',
                  color: 'primary.main',
                 },
                }}
               >
                <DeleteOutlineIcon />
               </Button>
              </Box>
              <Box>
               {item.newItemUrl && (
                <Box
                 sx={{
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(255,255,255,0.8)',
                  borderRadius: 2,
                  mb: 1,
                  p: 2,
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
  </motion.div>
  //</Fade>
 );
};

export default UserProfile;
