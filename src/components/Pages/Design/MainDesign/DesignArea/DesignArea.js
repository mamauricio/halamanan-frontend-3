import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import './DesignArea.css';
import Item from '../Items/Item';
import { useItemsContext } from '../../../../hooks/useItemsContext';

const DesignArea = ({ backgroundImage, backgroundAspectRatio, handleDrop }) => {
 const [selectedItem, setSelectedItem] = useState(null);
 const { items, dispatch } = useItemsContext();
 const [backgroundSize, setBackgroundSize] = useState({ width: 0, height: 0 });

 const mainContainerStyle = {
  position: 'relative',
  //   width: '100%',
  //   height: '100%',
  aspectRatio: backgroundAspectRatio.toString(),
  overflow: 'hidden',
  display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  bgcolor: 'pink',
  maxHeight: '80vh',
 };

 const backgroundImageStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  //   width: backgroundSize.width,
  //   height: '80vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'green',

  overflow: 'hidden',
  maxHeight: '80vh',
 };

 const reorderItems = (array, selectedIndex) => {
  const updatedItems = [...array];
  const selected = updatedItems[selectedIndex];
  updatedItems.splice(selectedIndex, 1);
  updatedItems.push(selected);
  return updatedItems;
 };

 const handleSelect = (index) => {
  setSelectedItem(index);
  const updatedItems = reorderItems(items, index);
  dispatch({ type: 'GET_ITEMS', payload: updatedItems });
 };

 useEffect(() => {
  function handleResize() {
   const background = document.getElementById('background');

   if (background) {
    const { clientWidth: width, clientHeight: height } = background;
    setBackgroundSize({ width, height });
   }
  }
  window.addEventListener('resize', handleResize);
  handleResize();
  return () => {
   window.removeEventListener('resize', handleResize);
  };
 }, []);

 return (
  <>
   <Box
    className="backgroundImageContainer"
    id="backgroundImageContainer"
    sx={mainContainerStyle}
   >
    {/* <Box sx={{ display: 'flex', alignItems: 'center' }}> */}
    <Box
     id="background"
     droppable="true"
     sx={backgroundImageStyle}
     onDrop={handleDrop}
     onDragOver={(event) => event.preventDefault()}
    >
     {/* <img src={`url(${backgroundImage})`} /> */}
     {items.map((designAreaItem, index) => (
      <Box
       key={designAreaItem.itemKey}
       onDrag={() => handleSelect(index)}
       sx={{
        width: '100px',
        backgroundColor: 'orange',
        zIndex: index === selectedItem ? 1 : 'auto',
       }}
      >
       <Item
        itemKey={designAreaItem.itemKey}
        itemName={designAreaItem.itemName}
        imageUrl={designAreaItem.imageUrl}
        width={designAreaItem.width || 200}
        height={designAreaItem.height || 200}
        x={designAreaItem.x || 100}
        y={designAreaItem.y || 100}
       />
      </Box>
     ))}
     {/* </Box> */}
    </Box>
   </Box>
  </>
 );
};

export default DesignArea;
