import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
const ApprovedItems = () => {
 const [approvedItems, setApprovedItems] = useState('');

 useEffect(() => {
  getApprovedItems();
 }, []);

 const getApprovedItems = () => {
  //   console.log('getting approved items');
 };

 return (
  <Box>
   <Typography>No Approved Items Yet (Under Construction)</Typography>
  </Box>
 );
};

export default ApprovedItems;