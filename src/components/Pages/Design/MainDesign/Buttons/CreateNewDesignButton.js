import React, { useState } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import ParkIcon from '@mui/icons-material/Park';

const CreateNewDesignButton = ({ handleCreateNewDesign }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleBackgroundImage = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageBase64 = reader.result;
      localStorage.setItem('backgroundImage', imageBase64);

      handleCreateNewDesign({ backgroundImage: imageBase64 });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Button
        sx={{
          mt: 2,
          width: 'inherit',
          justifyContent: 'space-around',
          bgcolor: 'orange',
          color: 'primary.main',
          ':hover': {
            opacity: 0.9,
            border: 'solid',
            borderWidth: 1,
            borderColor: 'white',
            color: 'white',
          },
        }}
        onClick={handleOpen}
      >
        <ParkIcon />
        Add new Design
        <ParkIcon />
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Box
            sx={{
              backgroundColor: 'orange',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              p: 4,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                fontSize: '20px',
                color: 'primary.main',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              {' '}
              Create new design{' '}
            </Box>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <Button
                onClick={handleButtonClick}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  ':hover': { backgroundColor: 'white', color: 'primary.main' },
                }}
              >
                Choose Image
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
              <input
                type="file"
                id="fileInput"
                accept=".jpg,.jpeg,.png"
                onChange={handleBackgroundImage}
                style={{ display: 'none' }}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default CreateNewDesignButton;
