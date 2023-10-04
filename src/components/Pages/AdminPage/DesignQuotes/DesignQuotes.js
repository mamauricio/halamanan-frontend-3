import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const DesignQuotes = () => {
 return (
  <motion.div
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Box
    sx={{
     color: 'primary.main',
     display: 'flex',
     flexDirection: 'column',
     height: '100%',
     alignItems: 'center',
     justifyContent: 'center',
     fontSize: '50px',
     mt: '10%',
    }}
   >
    Display design quote requests by users
    <Box sx={{ color: 'primary.main' }}>(future feature)</Box>
   </Box>
  </motion.div>
 );
};

export default DesignQuotes;
