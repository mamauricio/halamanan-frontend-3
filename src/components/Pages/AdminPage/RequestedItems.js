import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
const RequestedItems = ({ handleSelectedItem }) => {
 const [requestedItems, setRequestedItems] = useState([]);
 useEffect(() => {
  const fetchNewItems = async () => {
   const response = await fetch(
    `https://halamanan-197e9734b120.herokuapp.com/admin`
   );

   try {
    const data = await response.json();
    setRequestedItems(data);
   } catch (error) {
    console.error('Error fetching designs:', error);
   }
  };
  fetchNewItems();
 }, []);

 return (
  <Box>
   {requestedItems.map((item, index) => (
    <Box
     onClick={() => handleSelectedItem(item)}
     key={index}
     sx={{
      bgcolor: 'primary.main',
      width: '250px',
      height: 'auto',
      p: 2,
      borderRadius: 2,
      border: 'solid 1px orange',
     }}
    >
     <Box
      sx={{
       height: '200px',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       bgcolor: 'orange',
       borderRadius: 2,
       mb: 1,
      }}
     >
      <img
       src={item.newItemUrl}
       style={{
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'contain',
       }}
      />
     </Box>
     <Box sx={{ color: 'orange', fontSize: '18px' }}>
      {' '}
      Item Name:{' '}
      <span style={{ color: 'white' }}>
       {item.newItemName ? item.newItemName : 'null'}{' '}
      </span>{' '}
     </Box>

     <Box sx={{ color: 'orange', fontSize: '18px' }}>
      {' '}
      Item Description:{' '}
      <span style={{ color: 'white' }}>
       {item.newItemDescription ? item.newItemDescription : 'null'}
      </span>
     </Box>
    </Box>
   ))}
  </Box>
 );
};

export default RequestedItems;
