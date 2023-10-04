import React, { useState, useEffect } from 'react';
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
 let color = '#ECAB00';
 const [showDesign, setShowDesign] = useState(false);
 const [aspectRatio, setAspectRatio] = useState('');
 const [saving, setSaving] = useState(false);
 const [saved, setSaved] = useState(false);
 const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

 const isValidObjectId = (objectId) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(objectId);
 };

 useEffect(() => {
  if (isValidObjectId(id)) {
   const fetchItem = async () => {
    try {
     const response = await axios.get(
      `https://halamanan-197e9734b120.herokuapp.com/designs/${id}`
     );
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

 const handleDrop = (event) => {
  event.preventDefault();
  const droppableArea = document.getElementById('background');

  const offsetX = event.clientX - droppableArea.getBoundingClientRect().left;
  const offsetY = event.clientY - droppableArea.getBoundingClientRect().top;

  setCoordinates({ x: offsetX, y: offsetY });
 };

 const handleAddItem = ({
  designAreaItem,
  itemKey,
  height,
  mouseOffsetX,
  mouseOffsetY,
 }) => {
  const droppableArea = document.getElementById('background');
  const droppableAreaRect = droppableArea.getBoundingClientRect();
  if (
   coordinates.x - mouseOffsetX > 0 &&
   coordinates.x - mouseOffsetX <
    droppableAreaRect.right - droppableAreaRect.left &&
   coordinates.y - mouseOffsetY > 0 &&
   coordinates.y - mouseOffsetY <
    droppableAreaRect.bottom - droppableAreaRect.top
  ) {
   if (designAreaItem) {
    const newItem = {
     itemKey: itemKey,
     itemName: designAreaItem.itemName,
     width: 200,
     height: height,
     x: coordinates.x - mouseOffsetX,
     y: coordinates.y - mouseOffsetY,
     imageUrl: designAreaItem.imageUrl,
     flip: false,
     rotate: 0,
    };
    dispatch({
     type: 'ADD_NEW_ITEM',
     payload: newItem,
    });
    setCoordinates({ x: 0, y: 0 });
   }
  } else {
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

 const selectAll = (event) => {
  event.target.select();
 };

 const handleSaving = (boolean) => {
  setSaving(boolean);
 };

 return (
  <ThemeProvider theme={theme}>
   <Fade in={showDesign}>
    <Container
     maxWidth="xl"
     disableGutters={true}
    >
     <Box
      sx={{
       mt: 2,
       bgcolor: 'rgba(255,255,255,0.1)',
       borderRadius: 2,
       p: 2,
       pb: 0,

       height: 'auto',
      }}
     >
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
           Fetching Design
          </Box>
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
          <Box
           sx={{
            m: 1,
            display: 'flex',
            justifyContent: 'space-between',
            width: '72vw',
           }}
          >
           <TextField
            required
            label="Design Name"
            value={designName}
            onChange={(e) => {
             handleDesignName(e.target.value);
            }}
            onFocus={selectAll}
            InputProps={{
             style: {
              color: 'white',
             },
            }}
           />

           <Box
            sx={{
             display: 'flex',
             mt: 1,
             width: '550px',
             justifyContent: 'space-around',
            }}
           >
            <SaveDesignButton
             designName={designName}
             backgroundImage={backgroundImage}
             items={items}
             aspectRatio={aspectRatio}
             saved={saved}
             handleSaving={handleSaving}
            />
            <ReplaceImageButton
             handleReplaceBackground={handleReplaceBackground}
            />
            <ResetButton />
            <Button
             onClick={handleSaveToDevice}
             title="Download to device"
             sx={{
              fontSize: 18,
              height: '50px',
              color: 'rgba(255,255,255,0.8)',
              display: 'flex',
              justifyContent: 'center',
              ':hover': {
               bgcolor: 'rgba(255,255,255,0.8)',
               color: 'primary.main',
              },
             }}
            >
             <SaveAltIcon sx={{ mr: '2px' }} />
             Download
            </Button>
           </Box>
          </Box>
          <Box
           sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '80vh',
            justifyContent: 'center',
           }}
          >
           <DesignArea
            backgroundImage={backgroundImage}
            items={items ? items : ''}
            backgroundAspectRatio={aspectRatio}
            handleDrop={handleDrop}
            saving={saving}
           />
          </Box>
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
          ml: 2,
          pt: 1,
         }}
        >
         <Box
          sx={{
           pl: 1,
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
