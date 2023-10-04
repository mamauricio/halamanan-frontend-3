import React from 'react';

import { Modal, Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CustomAlert from './ItemTray';

const ItemModal = ({
 selectedItem,
 handleClose,
 showAlert,
 closeAlert,
 item,
 addToFavorites,
 isItemInFavorites,
 removeFromFavorites,
}) => {
 return (
  <Modal
   open={selectedItem._id === item._id}
   onClose={handleClose}
  >
   <Box
    sx={{
     position: 'absolute',
     transform: 'translate(-50%, -50%)',
     width: '800px',
     top: '50%',
     left: '50%',
     bgcolor: 'rgba(12, 35, 13, 0.9)',

     borderRadius: 1,
    }}
   >
    {showAlert && (
     <CustomAlert
      showAlert={showAlert}
      closeAlert={closeAlert}
     />
    )}
    <Box
     sx={{
      bgcolor: 'rgba(255,255,255,0.2)',
      p: 2,
      borderRadius: 1,
     }}
    >
     <Box
      sx={{
       bgcolor: 'rgba(255,255,255,0.9)',
       justifyContent: 'space-between',
       display: 'flex',
       p: 2,
       borderRadius: 1,
      }}
     >
      <Button
       title={
        isItemInFavorites(item._id)
         ? 'Remove from Favorites'
         : 'Add to Favorites ko.'
       }
       onClick={
        isItemInFavorites(item._id)
         ? (event) => {
            removeFromFavorites(event, item._id);
           }
         : (event) => {
            addToFavorites(event, item._id);
           }
       }
       sx={{
        height: '50px',
        width: '50px',
        ':hover': { bgcolor: 'rgba(0,0,0,0.1)' },
       }}
      >
       {isItemInFavorites(item._id) ? <StarIcon /> : <StarBorderIcon />}
      </Button>
      <Box sx={{ height: '400px' }}>
       <img
        src={item.imageUrl}
        style={{ objectFit: 'contain', height: '100%', width: '100%' }}
       />
      </Box>
      <Button
       sx={{
        height: '50px',
        width: '50px',
        ':hover': { bgcolor: 'rgba(0,0,0,0.1)' },
       }}
      >
       <CloseIcon
        title="Close"
        onClick={handleClose}
       />
      </Button>
     </Box>
     <Box
      className="itemInformation"
      sx={{ py: 1 }}
     >
      <span style={{ color: 'orange' }}>
       <strong>Item Description: </strong>
      </span>
      {item.itemInformation}
     </Box>
     <Box>
      <span style={{ color: 'orange' }}>
       <strong>Item Type: </strong>{' '}
      </span>{' '}
      {item.type.map((type, index) => (
       <span key={index}>{type} , </span>
      ))}
     </Box>
     <Box>
      <span style={{ color: 'orange' }}>
       <strong>Hardiness Zone: </strong>
      </span>{' '}
      Lorem Ipsum
     </Box>
     <Box sx={{ py: 1 }}>
      <span style={{ color: 'orange' }}>
       <strong>Height: </strong>
      </span>{' '}
      Lorem Ipsum
     </Box>
     <Box>
      <span style={{ color: 'orange' }}>
       <strong>Watering: </strong>
      </span>{' '}
      Lorem Ipsum
     </Box>
     <Box sx={{ pt: 1 }}>
      <span style={{ color: 'orange' }}>
       <strong>Lighting: </strong>
      </span>{' '}
      Lorem Ipsum
     </Box>
    </Box>
   </Box>
  </Modal>
 );
};

export default ItemModal;
