import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import UserDesigns from '../UserDesigns/UserDesigns';
import axios from 'axios';
import DeleteRoundedIcon from '@mui/icons-material/DeleteOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDesignContext } from '../../../hooks/useDesignContext';
import { motion } from 'framer-motion';

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
  // console.log(design);
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

 const copyToClipboard = (e) => {
  var copyText = document.querySelector('#itemList');
  navigator.clipboard.writeText(copyText.innerText);
  setAlertMessage('Copied to Clipboard');
  handleOpenAlert();
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
        <Fade in={openDesign}>
         <Box className="designInformation">
          <Box
           sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
           }}
          >
           <Box sx={{ ml: 2, py: 2, fontSize: '25px' }}>
            Design Name: {selectedDesign.designName}
           </Box>
           <Box
            sx={{
             display: 'flex',
             flexDirection: 'row',
             height: '40px',
             width: '220px',
             mt: 1,
             mr: 1,
             justifyContent: 'space-evenly',
            }}
           >
            <Button
             title="Save to Device"
             onClick={() => handleSaveToDevice(selectedDesign)}
             sx={{
              color: 'primary.main',
              bgcolor: 'white',
              ':hover': { bgcolor: 'green', color: 'white' },
             }}
            >
             <SaveAltIcon />
            </Button>
            <Button
             title="Edit Design"
             sx={{
              backgroundColor: 'white',

              ':hover': {
               color: 'primary.main',
               backgroundColor: 'orange',
              },
             }}
             onClick={() => handleEditDesign(selectedDesign)}
            >
             <ModeEditRoundedIcon label="Edit Design" />
            </Button>
            <Button
             title="Delete design"
             sx={{
              backgroundColor: 'white',

              ':hover': {
               color: 'white',
               backgroundColor: 'red',
              },
             }}
             onClick={handleOpen}
            >
             <DeleteRoundedIcon />
            </Button>
            <Modal
             open={open}
             onClose={handleClose}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
             sx={{}}
            >
             <Box
              sx={{
               position: 'absolute',
               left: '50%',
               top: '50%',
               transform: 'translate(-50%, -50%)',

               backgroundColor: 'orange',
               borderRadius: 2,
               p: 2,
              }}
             >
              <Box
               sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
               }}
              >
               <Box sx={{ fontSize: '20px', color: 'primary.main' }}>
                Are you sure you want to delete {selectedDesign.designName} ?
               </Box>
               <Box
                sx={{
                 mt: 2,
                 display: 'flex',
                 //  bgcolor: 'white',
                 width: '50%',
                 flexDirection: 'row',
                 justifyContent: 'space-between',
                }}
               >
                <Button
                 sx={{
                  bgcolor: 'red',
                  transition: 'opacity ease-in-out 0.2s',
                  ':hover': {
                   backgroundColor: 'red',
                   color: 'white',
                   opacity: 0.8,
                  },
                 }}
                 onClick={() => handleDelete(selectedDesign)}
                >
                 Yes
                </Button>
                <Button
                 sx={{
                  color: 'white',
                  backgroundColor: 'primary.main',
                  transition: 'opacity ease-in-out 0.2s ',
                  ':hover': { bgcolor: 'primary.main', opacity: 0.8 },
                 }}
                 onClick={handleClose}
                >
                 No
                </Button>
               </Box>
              </Box>
             </Box>
            </Modal>
           </Box>
          </Box>

          <Box
           className="thumbnail-container"
           sx={{
            backgroundColor: 'white',
            py: 1,
            alignContent: 'center',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 2,
            mx: 2,
            maxHeight: '600px',
           }}
          >
           <Box
            sx={{
             display: 'flex',
             justifyContent: 'center',
             alignContent: 'center',
            }}
           >
            <img
             src={selectedDesign.designThumbnail}
             width="inherit"
             height="inherit"
            />
           </Box>
          </Box>

          <Box
           className="design-info"
           sx={{
            mt: 1,
            display: 'flex',
            flexWrap: 'true',
            height: '100%',
            justifyContent: 'space-around',
           }}
          >
           <Box
            className="item-list"
            sx={{
             height: 'auto',
             overflow: 'auto',
             maxWidth: 'auto',
             minWidth: '500px',
             mt: 1,
            }}
           >
            <Box
             sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
             }}
            >
             <Typography>Items: </Typography>
             <Button
              title="Copy to Clipboard"
              onClick={copyToClipboard}
              sx={{ mr: 4 }}
             >
              <ContentCopyIcon sx={{ color: 'white' }} />
             </Button>
            </Box>
            <ul style={{ columnCount: 2, columnGap: '30px' }}>
             {Object.entries(itemList).length > 0 ? (
              <>
               <Box id="itemList">
                {Object.entries(itemList).map(([itemName, count]) => (
                 <div
                  key={itemName}
                  ref={itemListRef}
                 >
                  <li>
                   {itemName}: {count}
                  </li>
                 </div>
                ))}
               </Box>
              </>
             ) : (
              <Typography>No items yet</Typography>
             )}
            </ul>
           </Box>
          </Box>
         </Box>
        </Fade>
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
