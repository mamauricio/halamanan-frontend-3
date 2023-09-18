import React, { useState, useEffect } from 'react';
import { Box, Grow, Typography } from '@mui/material';
import { useNewItemsContext } from '../../hooks/uewNewItemsContext';
import { FadeLoader } from 'react-spinners';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
const RequestedItems = ({ handleSelectedItem }) => {
 const { newItems, dispatch } = useNewItemsContext();
 const [fetchingItems, setFetchingItems] = useState(true);
 const [showItems, setShowItems] = useState(false);
 const [color, setColor] = useState('#ECAB00');

 useEffect(() => {
  const fetchNewItems = async () => {
   try {
    const response = await fetch(
     'https://halamanan-197e9734b120.herokuapp.com/admin/pending'
    );
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
    <Box
     sx={{
      height: '500px',
      width: '300px',
     }}
    >
     {' '}
     <Box
      sx={{
       height: 'inherit',
       width: 'inherit',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'space-evenly',
       alignItems: 'center',
      }}
     >
      <Typography variant="h4">Fetching Items</Typography>
      <FadeLoader
       color={color}
       loading={fetchingItems}
       size={200}
       aria-label="Loading Spinner"
       data-testid="loader"
      />
     </Box>{' '}
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
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: '300px',
        p: 2,
        borderRadius: 1,
        cursor: 'pointer',
        mb: 1,
        transition: 'background-color ease-in-out 0.2s',
        ':hover': {
         backgroundColor: 'rgba(255,255,255,0.1)',
        },
       }}
      >
       <Box
        sx={{
         height: '200px',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         bgcolor: 'rgba(255,255,255,0.8)',
         borderRadius: 1,
         mb: 1,
         py: 1,
        }}
       >
        {item.newItemUrl === '' ? (
         <>
          <Box
           sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgba(0,0,0,0.4)',
           }}
          >
           <QuestionMarkIcon fontSize="large" />
          </Box>
         </>
        ) : (
         <img
          src={item.newItemUrl}
          style={{
           maxHeight: '100%',
           maxWidth: '100%',
           objectFit: 'contain',
          }}
         />
        )}
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
