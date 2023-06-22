import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
const AboutPage = () => {
 const boxStyle = {
  display: 'flex',
  color: 'orange',
  fontSize: '20px',
  p: 2,
 };

 return (
  <motion.div
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Container
    sx={{
     p: 5,
     mt: 2,
     backgroundColor: 'primary.main',
     color: 'orange',
     borderRadius: 2,
     height: '100%',
     overflow: '',
    }}
   >
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'orange',
     }}
    >
     <h1>Halamanan</h1>
    </Box>
    <Box
     sx={{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      borderRadius: 2,
      overflowY: 'auto',
     }}
    >
     <Box>
      <Box sx={{ fontSize: '25px' }}>Description</Box>
      <Box sx={{ fontSize: '25px' }}>
       This Web Application aims to help homeowners visualize their landscape
       designs. With an initial database composed of common plants from
       different categories (trees, shrubs, flowers, groundcover, etc.) that
       could be found in the Philippines and the US, users have a wide selection
       of materials.{' '}
      </Box>
     </Box>
     <Box
      sx={{
       color: 'orange',
       fontSize: '30px',
       overflowY: 'auto',
       height: '100%',
      }}
     >
      <br />
      Features
      <Box sx={boxStyle}>
       HOME - a slideshow of different design concepts that you could apply to
       your own designs. VIEW existing designs on the sidebar and CREATE a new
       design through the side bar.
      </Box>
      <Box sx={boxStyle}>
       DESIGNS - Access existing designs and see more in depth information about
       each design (item list). CREATE, SAVE TO DEVICE, EDIT, and DELETE
       existing designs.
      </Box>
      <Box sx={{ ...boxStyle, display: 'flex', flexDirection: 'column' }}>
       Main Design Page (MDP) - Through the DESIGNS page, USERS would be asked
       to UPLOAD an IMAGE (BACKGROUND) of a space they would want to design.
       USERS would then be redirected to the MDP and would be shown a sidebar of
       ITEMS on the right.
       <ul>
        <li>
         Each ITEM has an information (i) button that would show the SELECTED
         ITEM's description.
        </li>
        <li>When an ITEM is clicked, it is added over the Design Area (DA)</li>
        <ul>
         ITEMS over the DA could be dragged, resized, and deleted.
         <li>
          To DRAG an ITEM, Hold down Left Mouse click over item and drag it onto
          desired position.
         </li>
         <li>
          To RESIZE an ITEM, HOVER over the ITEM to be RESIZED and ARROWS on the
          top right, bottom right, and bottom left would be visible. You can
          Drag from the corners to resize.
         </li>
         <li>
          To DELETE an ITEM, HOVER over the item to be DELETED and an ORANGE
          MINUS BUTTON would be visible on the TOP LEFT CORNER of the ITEM. It
          would remove the ITEM from the DA
         </li>
        </ul>

        <li>
         DESIGNS could be SAVED manually with the SAVE BUTTON on top of the DA,
         but an AUTOSAVE feature is running on the background every minute
        </li>
        <ul>
         Other functions in the Main Design Page:
         <li>
          Replace Button - allows the USER to REPLACE the BACKGROUND image,
         </li>
         <li>Download Button - SAVE the the DESIGN to their device (PNG)</li>
         <li>Reset button - Clear all the items inside the DA.</li>
        </ul>
       </ul>
      </Box>
      <Box sx={boxStyle}>
       GALLERY - VIEW different items within the database and FILTER them
       between two categories - softscape and hardscape - and different
       subcategories trees, pots, shrubs, etc.). REQUEST for new items to be
       uploaded in the database.{' '}
      </Box>
      <Box sx={boxStyle}>
       PROFILE - VIEW account information through the Information Tab. VIEW
       and/or DELETE pending requests through the Requested Items tab.
      </Box>
     </Box>
    </Box>
   </Container>
  </motion.div>
 );
};

export default AboutPage;
