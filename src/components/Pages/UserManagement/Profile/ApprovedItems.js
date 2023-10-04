import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PendingItem from './PendingItem';
const ApprovedItems = () => {
 const [approvedItems, setApprovedItems] = useState('');
 const [showItems, setShowItems] = useState(false);
 useEffect(() => {
  const fetchApprovedItems = async () => {
   const response = await fetch(
    `https://halamanan-197e9734b120.herokuapp.com/profile/approved`,
    {
     headers: {
      newItemUserId: `${sessionStorage.getItem('token')}`,
     },
    }
   );

   try {
    const approvedItems = await response.json();
    setApprovedItems(approvedItems);
    setShowItems(true);
   } catch (error) {}
  };
  fetchApprovedItems();
 }, []);

 return (
  <Box sx={{ p: 1 }}>
   <Typography
    variant="h6"
    sx={{ color: 'orange' }}
   >
    Approved Items
   </Typography>
   <Box>
    {approvedItems.length === 0 && (
     <Typography
      variant="h6"
      sx={{
       display: 'flex',
       justifyContent: 'center',
       mt: 2,
      }}
     >
      No approved items
     </Typography>
    )}

    {approvedItems.length > 0 && (
     <Box
      className="pendingItems"
      sx={{
       display: 'flex',
       width: '100%',
       flexDirection: 'column',
       alignItems: 'center',
       overflowY: 'auto',
       height: '70vh',
      }}
     >
      {approvedItems.map((item, index) => (
       <div key={index}>
        <PendingItem
         item={item}
         index={index}
         approved={item.approved}
         showItems={showItems}
        />
       </div>
      ))}
     </Box>
    )}
   </Box>
  </Box>
 );
};

export default ApprovedItems;
