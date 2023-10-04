import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const DesignInformation = ({ itemList, setAlertMessage, handleOpenAlert }) => {
 const itemListRef = useRef(null);
 const copyToClipboard = (e) => {
  var copyText = document.querySelector('#itemList');
  navigator.clipboard.writeText(copyText.innerText);
  setAlertMessage('Copied to Clipboard');
  handleOpenAlert();
 };

 return (
  <Box
   className="design-info"
   sx={{
    mt: 1,
    display: 'flex',
    flexWrap: 'true',
    height: '100%',
    justifyContent: 'space-around',
   }}
  >
   <Box
    className="item-list"
    sx={{
     height: 'auto',
     overflow: 'auto',
     maxWidth: 'auto',
     minWidth: '500px',
     mt: 1,
    }}
   >
    <Box
     sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
     }}
    >
     <Typography>Items: </Typography>
     <Button
      title="Copy to Clipboard"
      onClick={copyToClipboard}
      sx={{
       mr: 4,
       ':hover': { bgcolor: 'rgba(255,255,255,0.2)' },
      }}
     >
      <ContentCopyIcon sx={{ color: 'white' }} />
     </Button>
    </Box>
    <ul style={{ columnCount: 2, columnGap: '30px' }}>
     {Object.entries(itemList).length > 0 ? (
      <>
       <Box id="itemList">
        {Object.entries(itemList).map(([itemName, count]) => (
         <div
          key={itemName}
          ref={itemListRef}
         >
          <li>
           {itemName}: {count}
          </li>
         </div>
        ))}
       </Box>
      </>
     ) : (
      <Typography>No items yet</Typography>
     )}
    </ul>
   </Box>
  </Box>
 );
};

export default DesignInformation;
