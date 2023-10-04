import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import ApprovedItems from './ApprovedItems';
import PendingItems from './PendingItems';

const RequestedItems = () => {
 return (
  <Grid
   container
   sx={{
    ml: 4,
   }}
  >
   <Grid
    item
    xs={5}
    sx={{
     mr: 3,
     p: 1,
     height: '75vh',
     borderRight: 'solid 1px',
     borderColor: 'rgba(0,0,0,0.3)',
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
