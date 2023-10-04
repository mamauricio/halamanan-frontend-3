import React from 'react';

import { Box, Typography } from '@mui/material';

const DesignThumbnail = ({ design, index, handleClick }) => {
 return (
  <Box
   key={index}
   onClick={() => handleClick(design)}
   sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',

    bgcolor: 'rgba(255,255,255,0.2)',
    mb: 2,
    p: 1.5,
    borderRadius: 1,
    transition: 'background-color  0.2s ease-in-out',
    mr: 1,
    ':hover': { cursor: 'pointer', bgcolor: 'rgba(255,255,255,0.1)' },
   }}
  >
   <Box
    sx={{
     height: '250px',
     width: '100%',
     borderRadius: 1,
     mt: 1,
    }}
   >
    <img
     src={design.designThumbnail}
     style={{ height: '100%', width: '100%', objectFit: 'cover' }}
    />
   </Box>
   <Typography>{design.designName}</Typography>
  </Box>
 );
};

export default DesignThumbnail;
