import React, { useEffect, useState, useRef } from 'react';
import { Box, Button } from '@mui/material';
import './DesignArea.css';
import Item from '../Items/Item';
import { useItemsContext } from '../../../../hooks/useItemsContext';

const DesignArea = ({
 backgroundImage,
 backgroundAspectRatio,
 handleDrop,
 saving,
}) => {
 const [selectedItem, setSelectedItem] = useState(null);
 const { items, dispatch } = useItemsContext();
 const [itemCount, setItemCount] = useState(items.length);
 //  const itemCountRef = useRef(items.length);
 const [backgroundSize, setBackgroundSize] = useState({ width: 0, height: 0 });

 const mainContainerStyle = {
  position: 'relative',
  aspectRatio: backgroundAspectRatio.toString(),
  overflow: 'hidden',
  display: 'flex',
  maxHeight: '80vh',
 };

 useEffect(() => {
  if (saving) {
   setSelectedItem('');
  }
 }, [saving]);

 const backgroundImageStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
  maxHeight: '80vh',
  bgcolor: 'white',
 };

 const reorderItems = (array, selectedIndex) => {
  const updatedItems = [...array];
  const selected = updatedItems[selectedIndex];
  updatedItems.splice(selectedIndex, 1);
  updatedItems.push(selected);
  return updatedItems;
 };

 useEffect(() => {
  setItemCount(items.length);
  setSelectedItem(itemCount - 1);
 }, [items]);

 const handleSelect = (index) => {
  setSelectedItem(index);

  const updatedItems = reorderItems(items, index);
  dispatch({ type: 'GET_ITEMS', payload: updatedItems });
 };

 const handleCloseItem = (event) => {
  event.stopPropagation();
  setSelectedItem('');
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
    <Box
     id="background"
     droppable="true"
     sx={backgroundImageStyle}
     onDrop={handleDrop}
     onDragOver={(event) => event.preventDefault()}
    >
     {items.map((designAreaItem, index) => (
      <Box
       onTouchStart={() => {
        handleSelect(index);
       }}
       key={designAreaItem.itemKey}
       onDrag={() => handleSelect(index)}
       onClick={() => handleSelect(index)}
       sx={{
        width: '100px',
        backgroundColor: 'orange',
        zIndex: index === selectedItem ? 1 : 'auto',
       }}
      >
       {/* {console.log('selected Item: ' + selectedItem)} */}
       <Item
        handleCloseItem={handleCloseItem}
        index={index}
        // selected={selectedItem === index}
        selected={selectedItem === index}
        itemKey={designAreaItem.itemKey}
        itemName={designAreaItem.itemName}
        imageUrl={designAreaItem.imageUrl}
        width={designAreaItem.width}
        height={designAreaItem.height}
        x={designAreaItem.x}
        y={designAreaItem.y}
        rotate={designAreaItem.rotate}
        flip={designAreaItem.flip}
       />
      </Box>
     ))}
    </Box>
   </Box>
  </>
 );
};

export default DesignArea;
