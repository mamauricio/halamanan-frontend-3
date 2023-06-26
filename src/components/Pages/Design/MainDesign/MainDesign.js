import React, { useState, useEffect, useRef } from 'react';
import { resolvePath, useLocation, useParams } from 'react-router-dom';
import { useItemsContext } from '../../../hooks/useItemsContext';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import html2canvas from 'html2canvas';
import axios from 'axios';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { FadeLoader } from 'react-spinners';
import DesignArea from './DesignArea/DesignArea';
import ReplaceImageButton from './Buttons/ReplaceImageButton';
import SaveDesignButton from './Buttons/SaveDesignButton';
import ResetButton from './Buttons/ResetButton';
import ItemTray from './Items/ItemTray';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
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
 const [fetching, setFetching] = useState(true);
 const [color, setColor] = useState('#ECAB00');

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
     const response = await axios.get(` http://localhost:3001/designs/${id}`);
     const fetchedItem = response.data;

     setDesignName(fetchedItem.designName);
     dispatch({ type: 'GET_ITEMS', payload: fetchedItem.items });
     setBackgroundImage(fetchedItem.backgroundImage);
     setShowDesign(true);
     setFetching(false);
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
 const handleAddItem = ({ designAreaItem, itemKey }) => {
  if (designAreaItem) {
   const newItem = {
    itemKey: itemKey,
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
  await createThumbnail();
  const designURL = designThumbnail.toDataURL();
  const a = document.createElement('a');
  a.href = designURL;
  a.download = `${designName}.png`;

  a.click();
 };

 const createThumbnail = () => {
  return new Promise((resolve) => {
   html2canvas(document.querySelector('#backgroundImageContainer')).then(
    (canvas) => {
     setDesignThumbnail(canvas);
     resolve();
    }
   );
  });
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
        {fetching === true ? (
         <Box
          sx={{
           display: 'flex',
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%,-50%)',
           flexDirection: 'column',
           alignItems: 'center',
          }}
         >
          <Box
           sx={{
            color: 'primary.main',
            fontSize: '30px',
            mb: 2,
            display: 'flex',

            justifyContent: 'center',
            alignItems: 'center',
           }}
          >
           Fetching Items
          </Box>
          {/* <br /> */}
          <FadeLoader
           color={color}
           loading={fetching}
           size={200}
           aria-label="Loading Spinner"
           data-testid="loader"
          />
         </Box>
        ) : (
         <>
          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
           <TextField
            required
            label="Design Name"
            value={designName}
            onChange={(e) => {
             handleDesignName(e.target.value);
            }}
           />

           <Box sx={{ display: 'flex' }}>
            <SaveDesignButton
             designName={designName}
             backgroundImage={backgroundImage}
             items={items}
             aspectRatio={aspectRatio}
            />
            <ReplaceImageButton
             handleReplaceBackground={handleReplaceBackground}
            />
            <ResetButton />
            <Button
             onClick={handleSaveToDevice}
             sx={{
              color: 'primary.main',
              display: 'flex',
              justifyContent: 'center',
             }}
            >
             <SaveAltIcon />
             Download
            </Button>
           </Box>
          </Box>

          <DesignArea
           backgroundImage={backgroundImage}
           items={items ? items : ''}
           backgroundAspectRatio={aspectRatio}
          />
         </>
        )}
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
