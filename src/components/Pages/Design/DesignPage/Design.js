import React from 'react';
import { Box, Typography, Button, Modal, Fade } from '@mui/material';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DesignInformation from './DesignInformation';

const Design = ({
 openDesign,
 selectedDesign,
 handleSaveToDevice,
 handleEditDesign,
 itemList,
 handleDelete,
 handleOpen,
 handleClose,
 handleOpenAlert,
 setAlertMessage,
 open,
}) => {
 return (
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
     className="thumbnailContainer"
     sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
     }}
    >
     <Box
      className="imageContainer"
      sx={{
       display: 'flex',
       justifyContent: 'center',
       alignContent: 'center',
       height: '500px',
       width: '800px',
       bgcolor: 'rgba(255,255,255,0.1)',
       p: 2,
       borderRadius: 1,
      }}
     >
      <img
       src={selectedDesign.designThumbnail}
       style={{ objectFit: 'contain', height: '100%', width: '100%' }}
      />
     </Box>
    </Box>

    <DesignInformation
     itemList={itemList}
     setAlertMessage={setAlertMessage}
     handleOpenAlert={handleOpenAlert}
    />
   </Box>
  </Fade>
 );
};

export default Design;
