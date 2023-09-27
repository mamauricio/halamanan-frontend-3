import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button } from '@mui/material';

const PendingItem = ({ index, handleOpen, item }) => {
 return (
  <Box
   key={index}
   sx={{
    color: 'primary.main',
    bgcolor: 'primary.main',
    borderRadius: 2,
    boxShadow: 5,
    width: '400px',

    m: 1,
    p: 2,
   }}
  >
   <Box sx={{ display: 'flex', justifyContent: 'end' }}>
    <Button
     title="Delete Request"
     onClick={() => handleOpen(item)}
     sx={{
      color: 'primary.main',
      bgcolor: 'orange',
      mb: 1,
      ':hover': {
       backgroundColor: 'red',
       color: 'primary.main',
      },
     }}
    >
     <DeleteOutlineIcon />
    </Button>
   </Box>
   <Box>
    {item.newItemUrl && (
     <Box
      sx={{
       height: '200px',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       bgcolor: 'rgba(255,255,255,0.8)',
       borderRadius: 2,
       mb: 1,
       p: 2,
      }}
     >
      <img
       src={item.newItemUrl}
       style={{
        maxHeight: '100%',
        objectFit: 'contain',
       }}
      />
     </Box>
    )}
   </Box>
   <Box> Item name: {item.newItemName} </Box>
   <Box>
    {item.newItemScientificName && (
     <Box>
      Scientific Name:
      <em> {item.newItemScientificName}</em>
     </Box>
    )}
   </Box>
   <Box>
    Item Description: {item.newItemDescription && item.newItemDescription}
   </Box>
   <Box>Item Category: {item.newItemCategory && item.newItemCategory}</Box>
   <Box>{item.newItemType && <Box> Item Type: {item.newItemType} </Box>}</Box>
  </Box>
 );
};

export default PendingItem;
