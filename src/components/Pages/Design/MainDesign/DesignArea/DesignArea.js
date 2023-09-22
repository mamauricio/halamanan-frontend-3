import React, { useEffect, useState, useRef } from 'react';
import { Box, Button } from '@mui/material';
import './DesignArea.css';
import Item from '../Items/Item';
import { useItemsContext } from '../../../../hooks/useItemsContext';

const DesignArea = ({ backgroundImage, backgroundAspectRatio, handleDrop }) => {
 const [selectedItem, setSelectedItem] = useState(null);
 const selectedItemRef = useRef('');
 const { items, dispatch } = useItemsContext();
 const [backgroundSize, setBackgroundSize] = useState({ width: 0, height: 0 });

 const mainContainerStyle = {
  position: 'relative',
  aspectRatio: backgroundAspectRatio.toString(),
  overflow: 'hidden',
  display: 'flex',
  maxHeight: '80vh',
 };

 const backgroundImageStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',

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

 useEffect(() => {
  const isSelected = checkSelected();
  {
   console.log('checking if item is selected: ' + isSelected);
  }
 }, [selectedItem]);

 const handleSelect = (index) => {
  setSelectedItem(index);
  console.log('handling item select: ' + selectedItem);

  const updatedItems = reorderItems(items, index);
  dispatch({ type: 'GET_ITEMS', payload: updatedItems });
  //   }
 };

 const checkSelected = (index) => {
  if (selectedItem === index) {
   return true;
  } else return false;
 };

 const handleCloseItem = (index) => {
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

 const handleClick = (event) => {};

 return (
  <>
   <Box
    className="backgroundImageContainer"
    id="backgroundImageContainer"
    sx={mainContainerStyle}
   >
    <Box
     onClick={(event) => handleClick(event)}
     id="background"
     droppable="true"
     sx={backgroundImageStyle}
     onDrop={handleDrop}
     onDragOver={(event) => event.preventDefault()}
    >
     {console.log(selectedItem)}
     {items.map((designAreaItem, index) => (
      <Box
       key={designAreaItem.itemKey}
       onDrag={() => handleSelect(index)}
       sx={{
        width: '100px',
        backgroundColor: 'orange',
        zIndex: index === selectedItem ? 1 : 'auto',
        // zIndex: index === selectedItemRef.current ? 1 : 'auto',
       }}
      >
       {console.log('index: ' + index)}
       {console.log('selected Item: ' + selectedItem)}
       <Item
        // handleSelect = {handleSelect}
        // checkSelected={checkSelected}
        handleCloseItem={handleCloseItem}
        index={index}
        selected={selectedItem === index}
        // selected={selectedItemRef.current === index}
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
