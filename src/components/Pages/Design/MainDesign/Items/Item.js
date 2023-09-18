import React, { useState, useEffect } from 'react';
import './Item.css';
import { Rnd } from 'react-rnd';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useItemsContext } from '../../../../hooks/useItemsContext';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
const Item = (props) => {
 const [width, setWidth] = useState(props.width);
 const [height, setHeight] = useState(props.height);
 const [x, setX] = useState(props.x);
 const [y, setY] = useState(props.y);
 const [selectedItem, setSelectedItem] = useState(null);
 const [isHovered, setIsHovered] = useState(false);
 const { items, dispatch } = useItemsContext();

 useEffect(() => {
  const newData = { width, height, x, y };
  dispatch({
   type: 'RESIZE_ITEM',
   payload: {
    itemKey: props.itemKey,
    newData,
   },
  });
 }, [width, height, x, y, props.itemKey, dispatch]);

 useEffect(() => {
  const newData = { x, y };
  dispatch({
   type: 'MOVE_ITEM',
   payload: {
    itemKey: props.itemKey,
    newData,
   },
  });
 }, [x, y, props.itemKey, dispatch]);

 const changePosition = (e, item) => {
  setX(item.x);
  setY(item.y);
 };

 const handleResize = (e, direction, ref, delta, position) => {
  setWidth(ref.style.width);
  setHeight(ref.style.height);
  setX(position.x);
 };

 const handleClick = (itemKey) => {
  setSelectedItem(itemKey);
 };

 const removeItem = (itemKey) => {
  dispatch({
   type: 'REMOVE_ITEM',
   payload: { itemKey },
  });
 };

 return (
  <>
   <Rnd
    className="item"
    size={{ height: height, width: width }}
    position={{ x, y }}
    enableResizing={{ bottomRight: true, topRight: true, bottomLeft: true }}
    disableDragging={false}
    lockAspectRatio={true}
    onDrag={changePosition}
    onResize={handleResize}
    resizeHandleClasses={['bottomRight', 'topRight', 'bottomLeft']}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
   >
    <Box
     sx={{
      height: height,
      width: width,
      display: 'flex',
     }}
    >
     {isHovered && (
      <>
       <Button
        onClick={() => removeItem(props.itemKey)}
        sx={{
         left: 2,
         top: 2,
         width: '20px',
         position: 'absolute',
         bgcolor: 'rgba(255,255,255,0.7)',
         zIndex: 2,
         ':hover': { bgcolor: 'orange' },
        }}
       >
        <RemoveIcon fontSize="small" />
       </Button>

       <KeyboardArrowRightIcon
        fontSize="large"
        sx={{
         position: 'absolute',
         right: 0,
         bottom: 0,
         color: 'primary.main',
         zIndex: 0,
         transform: 'rotate(45deg)',
        }}
       />
       <KeyboardArrowRightIcon
        fontSize="large"
        sx={{
         position: 'absolute',
         top: 0,
         right: 0,
         color: 'primary.main',
         zIndex: 0,
         transform: 'rotate(-45deg)',
        }}
       />
       <KeyboardArrowRightIcon
        fontSize="large"
        sx={{
         position: 'absolute',
         bottom: 0,
         left: 0,
         color: 'primary.main',
         zIndex: 0,
         transform: 'rotate(135deg)',
        }}
       />
      </>
     )}

     <img
      className="image"
      key={props.itemKey}
      label={props.itemName}
      src={props.imageUrl}
      height={height}
      onClick={() => handleClick(props.itemKey)}
      style={{
       zIndex: selectedItem === props.itemKey ? 1 : 0,
       objectFit: 'contain',
      }}
     />
    </Box>
   </Rnd>
  </>
 );
};

export default Item;
