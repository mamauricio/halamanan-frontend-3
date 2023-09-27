import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Fade from '@mui/material/Fade';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import './HowTo.css';
import { motion } from 'framer-motion';
const HowTo = () => {
 const [value, setValue] = useState('1');
 const [show, setShow] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
   setShow(true);
  }, 200);
 }, []);

 const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  color: 'orange',
  fontSize: '20px',
  p: 2,
 };
 const Header = (props) => {
  return (
   <Typography
    variant="h5"
    sx={{ color: 'orange' }}
   >
    {props.children}
   </Typography>
  );
 };

 const CustomBody = (props) => {
  return (
   <Box sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '23px', mt: 1 }}>
    {props.children}
   </Box>
  );
 };

 const ImageContainer = ({ image }) => {
  return (
   <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
    <img
     src={`/images/how_to_use/${image}.png`}
     style={{ maxHeight: '250px', maxWidth: '800px', objectFit: 'contain' }}
    />
   </Box>
  );
 };

 const handleChange = (event, newValue) => {
  setShow(false);
  setValue(newValue);
  const timer = setTimeout(() => {
   setShow(true);
  }, 50);
 };

 return (
  <motion.div
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Container
    maxWidth="xl"
    sx={{
     mt: 5,
    }}
   >
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'orange',
      height: '45px',
     }}
    >
     <img
      src="/images/TreeBranchesWhite.png"
      style={{
       height: '100%',
      }}
     />
     <Typography
      variant="h3"
      sx={{ fontFamily: 'Sans Serif', mx: 2 }}
     >
      Halamanan
     </Typography>
     <img
      src="/images/TreeBranchesWhite.png"
      style={{
       height: '100%',
       transform: 'scaleX(-1)',
      }}
     />
    </Box>

    <Grid
     container
     spacing={2}
     sx={{
      height: '78vh',
      mt: 2,
      borderRadius: 1,
      overflow: 'hidden',
     }}
    >
     <TabContext value={value}>
      <Grid
       item
       xs={2}
       sx={{
        // color: '212121',
        display: 'flex',
        flexDirection: 'column',
        borderRight: 'solid',
        borderWidth: '1px',
        borderColor: 'rgba(255,255,255,0.5)',
        //    borderRadius: 1,
        p: '10px 0 0 0',
       }}
      >
       <Box sx={{ mr: 1 }}>
        <TabList
         orientation="vertical"
         onChange={handleChange}
        >
         <Tab
          label="Description"
          value="1"
          style={{
           color: value === '1' ? 'orange' : 'rgba(255, 255, 255, 0.8)',
           backgroundColor: value === '1' ? 'rgba(255,255,255,0.2)' : null,
           borderRadius: 10,
           //  transition: 'background-color: ease-in-out 0.3s',
           fontSize: '18px',
          }}
         />
         <Tab
          label="Creating a Design"
          value="2"
          style={{
           color: value === '2' ? 'orange' : 'rgba(255, 255, 255, 0.8)',
           backgroundColor: value === '2' ? 'rgba(255,255,255,0.2)' : null,
           borderRadius: 10,
           fontSize: '18px',
          }}
         />
         <Tab
          label="Existing Designs"
          value="3"
          style={{
           color: value === '3' ? 'orange' : 'rgba(255, 255, 255, 0.8)',
           backgroundColor: value === '3' ? 'rgba(255,255,255,0.2)' : null,
           borderRadius: 10,
           //  transition: 'background-color: ease-in-out 0.3s',
           fontSize: '18px',
          }}
         />
         <Tab
          label="Gallery Features"
          value="4"
          style={{
           color: value === '4' ? 'orange' : 'rgba(255, 255, 255, 0.8)',
           //  opacity: '87%',
           backgroundColor: value === '4' ? 'rgba(255,255,255,0.2)' : null,
           borderRadius: 10,
           fontSize: '18px',
          }}
         />
         <Tab
          label="Requesting New Items"
          value="5"
          style={{
           color: value === '5' ? 'orange' : 'rgba(255, 255, 255, 0.8)',
           //  opacity: '87%',
           backgroundColor: value === '5' ? 'rgba(255,255,255,0.2)' : null,
           borderRadius: 10,
           fontSize: '18px',
          }}
         />
        </TabList>
       </Box>
      </Grid>
      <Grid
       item
       xs={10}
      >
       <Box
        sx={{
         height: '78vh',
         overflowY: 'scroll',
         bgcolor: 'rgba(255,255,255,0.3)',
         borderRadius: 1,
        }}
       >
        {/* sx={{ height: '60vh', scrollY: 'auto' }} */}
        <TabPanel value="1">
         <Fade in={show}>
          <Box>
           <Box>
            <Header>Description</Header>
            <CustomBody>
             This web application aims to help homeowners visualize their
             landscape designs. With an initial database composed of plants from
             different categories (trees, shrubs, flowers, groundcover, etc.).
             Users are also able to request their own softscape or hardscape
             materials to be added onto the database. This could also help
             contractors in showing their clients proposals for their projects.
             <br />
            </CustomBody>
           </Box>

           <Box sx={{ mt: 4 }}>
            <Header>Sample Design</Header>
            <CustomBody>
             Below is a sample before and after of a landscape design created
             through this web application.
             <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <ImageContainer image="/Description/Sample" />
              <ImageContainer image="/Description/Sample1" />
             </Box>
             <br />
            </CustomBody>
           </Box>
           <Box sx={{ mt: 4 }}>
            <Header>Future Developments</Header>
            <CustomBody>
             1) Adding more functionalities to managing items (bring up, bring
             down)
             <br />
             2) Sending a request for a Design Quote from the User to the Admin.
             <br />
             3) Add account recovery features (password reset, etc.)
            </CustomBody>
           </Box>
          </Box>
         </Fade>
        </TabPanel>
        <TabPanel value="2">
         <Fade in={show}>
          <Box>
           <Box>
            <Header> Creating a Design</Header>
            <CustomBody>
             1) Sign up and login onto the website Proceed to the Designs tab
             and you will find existing designs in this page, if there are any.
             <Box
              sx={{
               //  bgcolor: 'white',
               display: 'flex',
               justifyContent: 'space-evenly',
              }}
             >
              <ImageContainer image="/Design/SignUp" />

              <ImageContainer image="/Design/Login" />
             </Box>
             <br />
             2) To create a new design,click the "Create New Design" which would
             be found at the bottom left side of the page. You could choose from
             template images or upload your own desired image.
             <Box
              sx={{
               display: 'flex',
               //  bgcolor: 'white',
               justifyContent: 'space-evenly',
              }}
             >
              <ImageContainer image="/Design/DesignsPreview" />
              <ImageContainer image="/Design/AddNewDesign" />
             </Box>
             <br />
             3) After selecting an image, you will be redirected to the main
             design area.
             <ImageContainer image="/Design/MainDesign" />
             <br />
            </CustomBody>
            <Box sx={{ mt: 2 }}>
             <Header>Item Management</Header>
             <CustomBody>
              1) After creating a design, an item tray would be found at the
              right side of the page.
              <ImageContainer image="/Design/ItemTray" />
              <br />
              2) An information icon could be found at the bottom right corner
              of every item. Clicking the icon would reveal information about
              the item.
              <br />
              3) Drag an item from the tray over desired area on the design.
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
               <ImageContainer image="/Design/ItemInformation" />
               <ImageContainer image="/Design/ItemInformation2" />
              </Box>
              <br />
              4) Items in the design area are resizable and draggable. They
              could also be flipped and rotated.
              <ImageContainer image="/Design/Item" />
              <br />
              <a></a>4a.) Hover onto an item and there would be indicators on
              the top right, bottom right, and bottom left corners <br />
              <a />
              <a />
              where the item could be dragged to be resized.
              <br />
              <a></a>4b.) Click on an item and hold down the mouse pointer to
              drag item across the design. <br />
              <strong style={{ color: 'orange' }}>
               <a></a>
               <a></a>**Dragging an item would bring it on top of other items
              </strong>
              <br />
              <a></a>4c.)Click the Flip button to flip an item.
              <ImageContainer image="/Design/ItemFlip" />
              <br />
              <a></a>4d.)Click the Rotate button to open the rotate slider.
              <br />
              <strong style={{ color: 'orange' }}>
               <a></a>
               <a></a>**Drag the slider to the right to rotate item clockwise,
               and to the left to rotate counter-clockwise.
              </strong>
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
               <ImageContainer image="/Design/ItemRotate" />
               <ImageContainer image="/Design/ItemRotate2" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
               <ImageContainer image="/Design/ItemRotate3" />
               <ImageContainer image="/Design/ItemRotate4" />
              </Box>
              <br />
              5) To delete an item, hover over desired item to be deleted and a
              white delete icon would appear at the top left corner. Hovering
              over the icon would turn it to orange. Clicking the icon would
              remove the item from the design.
              <ImageContainer image="/Design/ItemRemove" />
             </CustomBody>
            </Box>

            <Box sx={{ mt: 2 }}>
             <Header>Other Functions</Header>
             <CustomBody>
              <ImageContainer image="/Design/OtherFunctions" />
              1) Download to Device
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
               <ImageContainer image="/Design/Download" />
               <ImageContainer image="/Design/Save2" />
              </Box>
              <br />
              2) Replacing background image
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
               {' '}
               <ImageContainer image="/Design/Replace" />
               <ImageContainer image="/Design/Replace2" />
              </Box>
              <br />
              3) Reseting items inside the design
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
               {' '}
               <ImageContainer image="/Design/Reset" />
               <ImageContainer image="/Design/Reset2" />
              </Box>
              <br />
              4) Filtering Item Tray
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
               <ImageContainer image="/Design/Filters2" />
               <ImageContainer image="/Design/Filters" />
              </Box>
             </CustomBody>
            </Box>
           </Box>
          </Box>
         </Fade>
        </TabPanel>
        <TabPanel value="3">
         <Fade in={show}>
          <Box>
           <Box>
            <Header>Existing Designs</Header>
            <CustomBody>
             1) Click on the Designs tab on the navigation bar.
             <ImageContainer image="/Design/DesignsNav" />
             <br />
             2) Existing designs could be found on the left side of the page.
             <ImageContainer image="/Design/DesignsPreview" />
             <br />
             3) Clicking on an existing design would show items that were used
             in the design.
             <ImageContainer image="/Design/Existing/info" />
             <br />
             4) Existing designs could be downloaded, edited, or deleted through
             the Designs page.
             <Box>
              <ImageContainer image="/Design/Existing/func" />
              <ImageContainer image="/Design/Existing/func1" />
              <ImageContainer image="/Design/Existing/func2" />
             </Box>
             <br />
            </CustomBody>
           </Box>
          </Box>
         </Fade>
        </TabPanel>
        <TabPanel value="4">
         <Fade in={show}>
          <Box>
           <Header>Gallery</Header>
           <CustomBody>
            1) Click on the Gallery button on the navigation bar to proceed to
            the Gallery
            <ImageContainer image="/Gallery/GalleryNav" />
            <br />
            2) Users could view all items through the gallery.
            <ImageContainer image="/Gallery/Gallery" />
            <br />
            3) Clicking on an item would reveal all information about the
            selected item.
            <ImageContainer image="/Gallery/ItemInformation" />
            <br />
            4) Items could be added or removed from Favorites
            <Box
             sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
             }}
            >
             <ImageContainer image="/Gallery/Favorites" />
             <ImageContainer image="/Gallery/Favorites3" />
            </Box>
            <Box
             sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
             }}
            >
             <ImageContainer image="/Gallery/Favorites2" />
             <ImageContainer image="/Gallery/Favorites4" />
            </Box>
           </CustomBody>
          </Box>
         </Fade>
        </TabPanel>
        <TabPanel value="5">
         <Fade in={show}>
          <Box sx={{ mt: 3 }}>
           <Header>Requesting for new Items</Header>
           <CustomBody>
            1) Click the Gallery tab on the navigation bar.
            <ImageContainer image="/New/GalleryNav" />
            <br />
            2) A "Request New Item" button could be found on the upper right
            corner of the Gallery Page beside the Filter button
            <ImageContainer image="/New/Gallery" />
            <br />
            3) Clicking on the button would reveal a form regarding the item
            that the user wants to be added onto the database
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
             <ImageContainer image="/New/Form" />
             <ImageContainer image="/New/Form2" />
            </Box>
            <br />
            4) Upon submission, the request would then be sent to the Admin and
            be reviewed for approval.
            <ImageContainer image="/New/RequestSent" />
            <br />
           </CustomBody>

           <Header>Requested Items</Header>
           <CustomBody>
            1) Click on the Profile tab on the navigation bar
            <ImageContainer image="/New/ProfileNav" />
            <br />
            2) Click on the Requested Items tab that could be found on the left
            side of the screen
            <ImageContainer image="/New/Profile" />
            <br />
            3) Pending requests could be seen in this tab.
            <ImageContainer image="/New/Pending" />
            <br />
            4) Pending requests could also be deleted by the user.
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
             <ImageContainer image="/New/Delete" />
             <ImageContainer image="/New/Delete2" />
            </Box>
           </CustomBody>
          </Box>
         </Fade>
        </TabPanel>
       </Box>
      </Grid>
     </TabContext>
    </Grid>
   </Container>
  </motion.div>
 );
};

export default HowTo;
