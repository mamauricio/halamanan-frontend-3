import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import UserDesigns from './UserDesigns/UserDesigns';
import axios from 'axios';
import { useDesignContext } from '../../../hooks/useDesignContext';
import { motion } from 'framer-motion';
import Design from './Design';

const DesignPage = () => {
 const navigate = useNavigate();
 const [selectedDesign, setSelectedDesign] = useState();
 const [itemList, setItemList] = useState({});
 const { designs, dispatch } = useDesignContext();
 const [open, setOpen] = useState(false);
 const [openDesign, setOpenDesign] = useState(false);
 const [error, setError] = useState(null);
 const [openMain, setOpenMain] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 const [openAlert, setOpenAlert] = useState(false);
 const itemListRef = useRef(null);
 const handleOpenAlert = () => {
  setOpenAlert(true);
  const timer = setTimeout(() => {
   setOpenAlert(false);
  }, 2000);
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

 useEffect(() => {
  const timer = setTimeout(() => {
   setOpenMain(true);
  }, 70);
 }, []);

 useEffect(() => {
  const countItems = () => {
   if (selectedDesign && selectedDesign.items) {
    const count = selectedDesign.items.reduce((acc, item) => {
     acc[item.itemName] = (acc[item.itemName] || 0) + 1;
     return acc;
    }, {});

    setItemList(count);
   }
  };
  countItems();
 }, [selectedDesign]);

 const handleEditDesign = (design) => {
  navigate(`/designs/${design._id}`, { state: { design } });
 };

 const handleSelectedDesign = (design) => {
  if (selectedDesign === design) {
   setOpenDesign(false);
   const timer = setTimeout(() => {
    setSelectedDesign('');
   }, 100);
  } else {
   setOpenDesign(false);

   const timer = setTimeout(() => {
    setSelectedDesign(design);
    setOpenDesign(true);
   }, 100);
  }
 };

 const handleDelete = async (design) => {
  const response = await axios
   .delete(
    `https://halamanan-197e9734b120.herokuapp.com/designs/${design._id}`,
    {
     data: { id: design._id },
    }
   )

   .then((response) => {
    dispatch({
     type: 'DELETE_DESIGN',
     payload: design._id,
    });
    handleClose();
    setAlertMessage(`Successfully Deleted ${design.designName}`);
    handleOpenAlert();
    setSelectedDesign('');
   })
   .catch((error) => {
    setError(error);
   });
 };

 const handleSaveToDevice = (selectedDesign) => {
  const link = document.createElement('a');
  link.href = selectedDesign.designThumbnail;
  link.download = `${selectedDesign.designName}.png`;
  link.click();
 };

 return (
  <motion.div
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Container
    disableGutters={true}
    maxWidth="xl"
   >
    <Typography
     variant="h5"
     sx={{ pt: 2 }}
    >
     Designs
    </Typography>
    {openAlert && (
     <Grow in={openAlert}>
      <Alert
       onClose={handleCloseAlert}
       sx={{
        position: 'absolute',
        color: 'orange',
        bgcolor: 'primary.main',
        top: '20%',
        left: '50%',
       }}
      >
       {alertMessage}
      </Alert>
     </Grow>
    )}
    <Grid
     container
     spacing={1}
     sx={{
      background: 'rgba(255,255,255,0.1)',
      m: 1,
      mt: 2,
      p: 1,
      borderRadius: 2,
      height: '84vh',
     }}
    >
     <Grid
      item
      xs={3}
     >
      <Box
       sx={{
        pr: 1,
        border: 'solid',
        borderColor: 'primary.main',
        borderWidth: '0 1px 0 0 ',
       }}
      >
       <UserDesigns handleSelectedDesign={handleSelectedDesign} />
      </Box>
     </Grid>

     <Grid
      item
      xs={9}
     >
      <Box
       sx={{
        height: '93%',
        maxHeight: '89vh',
        borderRadius: 2,
        overflowY: 'auto',
       }}
      >
       {selectedDesign ? (
        <Design
         openDesign={openDesign}
         selectedDesign={selectedDesign}
         handleSaveToDevice={handleSaveToDevice}
         handleEditDesign={handleEditDesign}
         itemList={itemList}
         handleDelete={handleDelete}
         handleOpen={handleOpen}
         handleClose={handleClose}
         setAlertMessage={setAlertMessage}
         open={open}
         handleOpenAlert={handleOpenAlert}
        />
       ) : (
        <Box
         sx={{
          display: 'flex',
          justifyContent: 'center',
          top: '50%',
          pt: 20,
         }}
        >
         Select A Design to view details{' '}
        </Box>
       )}
      </Box>
     </Grid>
    </Grid>
   </Container>
  </motion.div>
 );
};

export default DesignPage;
