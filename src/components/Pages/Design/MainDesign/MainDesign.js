import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useItemsContext } from '../../../hooks/useItemsContext';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import html2canvas from 'html2canvas';
import axios from 'axios';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import DesignArea from './DesignArea/DesignArea';
import ReplaceImageButton from './Buttons/ReplaceImageButton';
import SaveDesignButton from './Buttons/SaveDesignButton';
import ResetButton from './Buttons/ResetButton';
import ItemTray from './Items/ItemTray';
import ParkIcon from '@mui/icons-material/Park';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
const MainDesign = () => {
 const { id } = useParams();
 const theme = useTheme();
 const location = useLocation();

 const [designName, setDesignName] = useState('');
 const [backgroundImage, setBackgroundImage] = useState(
  localStorage.backgroundImage
 );
 const { items, dispatch } = useItemsContext();
 const [designThumbnail, setDesignThumbnail] = useState(null);
 const [selectedItems, setSelectedItems] = useState([]);
 const [saving, setSaving] = useState('');

 const [anchorEl, setAnchorEl] = React.useState(null);
 const open = Boolean(anchorEl);
 const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
 };
 const handleClose = () => {
  setAnchorEl(null);
 };

 const [showDesign, setShowDesign] = useState(false);
 const [aspectRatio, setAspectRatio] = useState('');

 const isValidObjectId = (objectId) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(objectId);
 };

 useEffect(() => {
  if (isValidObjectId(id)) {
   const fetchItem = async () => {
    try {
     const response = await axios.get(
      `https://https://halamanan-197e9734b120.herokuapp.com/designs/${id}`
     );
     const fetchedItem = response.data;

     setDesignName(fetchedItem.designName);
     dispatch({ type: 'GET_ITEMS', payload: fetchedItem.items });
     setBackgroundImage(fetchedItem.backgroundImage);
     setShowDesign(true);
    } catch (error) {}
   };

   fetchItem();
  } else {
  }
 }, [id]);

 useEffect(() => {
  setShowDesign(true);
  const imageFromLocalStorage = localStorage.getItem('backgroundImage');
  if (location.state?.backgroundImage) {
   setBackgroundImage(location.state.backgroundImage);
  } else if (imageFromLocalStorage) {
   setBackgroundImage(imageFromLocalStorage);
  }
 }, [location.state]);

 useEffect(() => {
  const image = new Image();

  image.src = backgroundImage;
  image.onload = () => {
   const aspectRatio = image.width / image.height;
   setAspectRatio(aspectRatio);
  };
 }, [backgroundImage]);

 const handleReplaceBackground = (event) => {
  localStorage.setItem('backgroundImage', event);
  setBackgroundImage(event);
  setSelectedItems([]);
 };

 const handleDesignName = (event) => {
  setDesignName(event);
 };
 const handleAddItem = (designAreaItem) => {
  if (designAreaItem) {
   const newItem = {
    itemKey: items.length + 1,
    itemName: designAreaItem.itemName,
    width: '200px',
    height: '200px',
    x: 200,
    y: 200,
    imageUrl: designAreaItem.imageUrl,
   };

   dispatch({
    type: 'ADD_NEW_ITEM',
    payload: newItem,
   });
  }
 };

 const handleSaveToDevice = async (blob) => {
  createThumbnail();
  const designURL = designThumbnail.toDataURL();
  const a = document.createElement('a');
  a.href = designURL;
  a.download = `${designName}.png`;

  a.click();
 };

 const createThumbnail = () => {
  html2canvas(document.querySelector('#backgroundImageContainer')).then(
   (canvas) => {
    setDesignThumbnail(canvas);
   }
  );
 };

 return (
  <ThemeProvider theme={theme}>
   <Fade in={showDesign}>
    <Container
     maxWidth="xl"
     disableGutters={true}
    >
     <Box sx={{ mt: 2 }}>
      <Grid
       container
       spacing={0}
      >
       <Grid
        item
        md={12}
        xl={8}
       >
        <Box sx={{ mb: 1 }}>
         <TextField
          required
          label="Design Name"
          value={designName}
          onChange={(e) => {
           handleDesignName(e.target.value);
          }}
         />

         <Box sx={{ float: 'right' }}>
          <SaveDesignButton
           designName={designName}
           backgroundImage={backgroundImage}
           items={items}
           aspectRatio={aspectRatio}
          />

          <Button
           id="menu-button"
           aria-controls={open ? 'basic-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           onClick={handleClick}
           sx={{}}
          >
           <ParkIcon fontSize="large" />
          </Button>
          <Menu
           id="options-menu"
           anchorEl={anchorEl}
           open={open}
           onClose={handleClose}
           MenuListProps={{
            'aria-labelledby': 'menu-button',
           }}
          >
           <MenuItem></MenuItem>
           <MenuItem>
            <FindReplaceIcon />
            <ReplaceImageButton
             handleReplaceBackground={handleReplaceBackground}
            />
           </MenuItem>
           <MenuItem>
            <RestartAltIcon /> <ResetButton />
           </MenuItem>
           <MenuItem>
            <Box
             onClick={handleSaveToDevice}
             sx={{
              color: 'primary.main',
              display: 'flex',
              justifyContent: 'center',
             }}
            >
             <SaveAltIcon />
             Download
            </Box>
           </MenuItem>
          </Menu>
         </Box>
        </Box>

        <DesignArea
         backgroundImage={backgroundImage}
         items={items ? items : ''}
         backgroundAspectRatio={aspectRatio}
        />
       </Grid>
       <Grid
        item
        xs={3}
        xl={4}
       >
        <Box
         sx={{
          border: '0.5px solid',
          ml: 2,
          pt: 1,
         }}
        >
         <Box
          sx={{
           bgcolor: 'background.default',
           width: '420px',
           pl: 1,
           borderRadius: 2,
          }}
         >
          <ItemTray handleAddItem={handleAddItem} />
         </Box>
        </Box>
       </Grid>
      </Grid>
     </Box>
    </Container>
   </Fade>
  </ThemeProvider>
 );
};

export default MainDesign;
