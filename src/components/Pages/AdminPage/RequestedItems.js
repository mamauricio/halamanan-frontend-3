import React, { useState, useEffect } from 'react';
import { Box, Grow } from '@mui/material';
import { useNewItemsContext } from '../../hooks/uewNewItemsContext';
import { FadeLoader } from 'react-spinners';
const RequestedItems = ({ handleSelectedItem }) => {
 const { newItems, dispatch } = useNewItemsContext();
 const [fetchingItems, setFetchingItems] = useState(true);
 const [showItems, setShowItems] = useState(false);
 useEffect(() => {
  const fetchNewItems = async () => {
   try {
    const response = await fetch(' http://localhost:3001/admin/pending');
    const data = await response.json();

    if (data) {
     dispatch({
      type: 'GET_NEW_ITEMS',
      payload: data,
     });
     setFetchingItems(false);
     const timer = setTimeout(() => {
      setShowItems(true);
     }, 200);
    }
   } catch (error) {
    console.error('Error fetching designs:', error);
   }
  };
  fetchNewItems();
 }, []);

 return (
  <Box>
   {fetchingItems ? (
    <Box>
     {' '}
     <Box> Fetching Items </Box>{' '}
    </Box>
   ) : newItems && newItems.length !== 0 ? (
    newItems.map((item, index) => (
     <Grow
      in={showItems}
      key={index}
     >
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
        cursor: 'pointer',
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
     </Grow>
    ))
   ) : (
    <Box sx={{ color: 'primary.main', mt: 10, fontSize: '35px' }}>
     {' '}
     No requests{' '}
    </Box>
   )}
  </Box>
 );
};

export default RequestedItems;
