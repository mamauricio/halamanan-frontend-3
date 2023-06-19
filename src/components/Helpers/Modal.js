import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const GeneralModal = ({ mainText, buttonFunction, open, handleClose }) => {
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box
      className="modal"
      sx={{
        position: 'absolute',
        backgroundColor: 'orange',
        // border: "solid",
        // borderWidth: 1,
        borderRadius: 2,
        p: 2,
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          // backgroundColor: "orange",
          color: 'primary.main',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
        }}
      >
        {mainText}
        <br />
        <Box>
          <Button
            onClick={buttonFunction}
            sx={{
              color: 'white',
              backgroundColor: 'red',
              m: 2,
              ':hover': { opacity: '0.4', backgroundColor: 'red' },
            }}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: 'white',
              m: 2,
              ':hover': { opacity: '0.7', backgroundColor: 'white' },
            }}
          >
            No
          </Button>
        </Box>
      </Box>
    </Box>
  </Modal>;
};

export default GeneralModal;
