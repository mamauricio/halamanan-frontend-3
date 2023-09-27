import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import axios from 'axios';
import ApprovedItems from './ApprovedItems';
import PendingItems from './PendingItems';

const RequestedItems = () => {
 return (
  <Grid
   container
   sx={{
    ml: 1,
   }}
  >
   <Grid
    item
    xs={5}
    sx={{
     mr: 3,
     p: 1,
     height: '600px',
    }}
   >
    <PendingItems />
   </Grid>
   <Grid
    item
    xs={5}
   >
    {' '}
    <Box>
     <ApprovedItems />
    </Box>
   </Grid>
  </Grid>
 );
};

export default RequestedItems;
