import React, { useState, useEffect, useRef } from 'react';
import './Item.css';
import { Rnd } from 'react-rnd';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';

import { useItemsContext } from '../../../../hooks/useItemsContext';
import RemoveIcon from '@mui/icons-material/Remove';
import FlipIcon from '@mui/icons-material/Flip';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
const Item = (props) => {
 const indexRef = useRef(props.index);
 const [width, setWidth] = useState(props.width);
 const [height, setHeight] = useState(props.height);
 const [x, setX] = useState(props.x);
 const [y, setY] = useState(props.y);
 const [isHovered, setIsHovered] = useState(false);
 const { items, dispatch } = useItemsContext();
 const [isRotating, setIsRotating] = useState(false);
 const [flip, setFlip] = useState(props.flip);
 const [rotate, setRotate] = useState(props.rotate);

 const { handleCloseItem } = props;

 const [scrollPosition, setScrollPosition] = useState(192 / 2 - 15);

 const isDraggingDisabledRef = useRef(true);

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

 useEffect(() => {
  const newData = { rotate };
  dispatch({
   type: 'ROTATE_ITEM',
   payload: {
    itemKey: props.itemKey,
    newData,
   },
  });
 }, [rotate, props.itemKey, dispatch]);

 useEffect(() => {
  const newData = { flip };
  dispatch({
   type: 'FLIP_ITEM',
   payload: {
    itemKey: props.itemKey,
    newData,
   },
  });
 }, [flip, props.itemKey, dispatch]);

 const changePosition = (e, item) => {
  setX(item.x);
  setY(item.y);
 };

 const handleResize = (e, direction, ref, delta, position) => {
  setWidth(ref.style.width);
  setHeight(ref.style.height);
  setX(position.x);
  setY(position.y);
 };

 const handleClick = (itemKey) => {
  setIsHovered(true);
 };

 const removeItem = (event, itemKey) => {
  event.stopPropagation();
  dispatch({
   type: 'REMOVE_ITEM',
   payload: { itemKey },
  });
 };

 const handleRotate = (event, item) => {
  event.stopPropagation();
  isDraggingDisabledRef.current = true;
  const ratio = 180 / (192 + 15);
  const offset = item.x - 192 / 2 + 15;

  if (item.x <= 192) {
   setRotate(ratio * offset);

   setScrollPosition(item.x);
  }
 };

 const disableDrag = (event) => {
  event.stopPropagation();
  isDraggingDisabledRef.current = true;
 };

 const handleFlip = () => {
  setFlip(!flip);
 };

 const enableDrag = () => {
  isDraggingDisabledRef.current = false;
 };

 return (
  <>
   <Rnd
    className="item"
    size={{ height: height, width: width }}
    position={{ x, y }}
    enableResizing={{
     bottomRight: true,
     topRight: true,
     bottomLeft: true,
     topLeft: true,
    }}
    disableDragging={isDraggingDisabledRef.current}
    lockAspectRatio={true}
    onTouchStart={() => {}}
    onMouseEnter={() => {
     enableDrag();
    }}
    onDrag={changePosition}
    onResize={handleResize}
    resizeHandleClasses={['bottomRight', 'topRight', 'bottomLeft', 'topLeft']}
    onClick={() => {
     handleClick();
    }}
    style={{
     backgroundColor: props.selected ? 'rgba(255, 170, 0, 0.254)' : null,
    }}
   >
    <Box
     sx={{
      height: height,
      width: width,
      display: 'flex',
     }}
    >
     {props.selected && (
      <>
       <Box
        sx={{
         position: 'absolute',
         left: -90,
         top: -40,
         display: 'flex',
         flexDirection: 'row',
        }}
       >
        <Box
         sx={{
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'null',
         }}
        >
         <Button
          title="Close Options"
          onTouchEnd={(event) => {
           handleCloseItem(event);
          }}
          onClick={(event) => {
           handleCloseItem(event);
          }}
          sx={{
           bgcolor: 'rgba(255,255,255,1)',
           mb: 1,
           zIndex: 2,
           ':hover': { bgcolor: 'orange' },
          }}
         >
          Close
         </Button>
         <Button
          title="Remove Item"
          onTouchEnd={(event) => {
           removeItem(event, props.itemKey);
          }}
          onClick={(event) => removeItem(event, props.itemKey)}
          sx={{
           bgcolor: 'rgba(255,255,255,1)',
           mb: 1,
           zIndex: 2,
           ':hover': { bgcolor: 'orange' },
          }}
         >
          <RemoveIcon fontSize="small" />
         </Button>
         <Button
          title="Flip Item"
          onTouchEnd={() => {
           handleFlip();
          }}
          onClick={() => handleFlip()}
          sx={{ bgcolor: 'white', mb: 1, ':hover': { bgcolor: 'orange' } }}
         >
          <FlipIcon />
         </Button>
         <Button
          title="Open rotate slider"
          onTouchEnd={() => {
           setIsRotating(!isRotating);
          }}
          onClick={() => setIsRotating(!isRotating)}
          sx={{ bgcolor: 'white', ':hover': { bgcolor: 'orange' } }}
         >
          {' '}
          <RotateLeftIcon />{' '}
         </Button>
        </Box>
        {isRotating && (
         <>
          <Box
           sx={{
            position: 'absolute',
            ml: 10,

            width: `${scrollPosition + 17}px`,
            bgcolor: 'rgba(255,165,0, 0.8)',
            height: '10px',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 10,
            border: 'solid 1px black',
           }}
          />

          <Box
           className="scrollbar"
           sx={{
            ml: 2,
            mb: 4,
            width: `192px`,
            bgcolor: 'rgba(37,57,38, 0.2)',
            height: '10px',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 0.5,
            border: 'solid 1px black',
           }}
          >
           <Rnd
            position={{ x: scrollPosition, y: 0 }}
            enableResizing={false}
            dragAxis="x"
            maxWidth={100}
            bounds="parent"
            resizable="false"
            disableDragging={!isDraggingDisabledRef.current}
            onMouseEnter={(event) => disableDrag(event)}
            onTouchStart={(event) => disableDrag(event)}
            onDrag={(event, item) => handleRotate(event, item)}
            onDragStop={() => enableDrag()}
            onTouchEnd={() => enableDrag()}
            onMouseLeave={() => enableDrag()}
           >
            <Box
             className="scrollTracker"
             sx={{
              position: 'absolute',
              top: -4,
              height: '15px',
              width: '15px',
              bgcolor: 'rgba(37,57,38, 0.8)',

              border: 'solid white 2px',
              borderRadius: '20px',
              ':hover': { cursor: 'grab' },
             }}
            />
           </Rnd>
          </Box>
         </>
        )}
       </Box>

       <KeyboardArrowRightIcon
        className="arrowIcon"
        sx={{
         position: 'absolute',
         right: -18,
         bottom: -18,
         color: 'primary.main',
         zIndex: 0,
         transform: 'rotate(45deg)',
         fontSize: '50px',
         ':hover': {
          cursorSize: '300px',
         },
        }}
       />

       <KeyboardArrowRightIcon
        className="arrowIcon"
        sx={{
         position: 'absolute',
         left: -18,
         top: -18,
         color: 'primary.main',
         zIndex: 0,
         transform: 'rotate(225deg)',
         fontSize: '50px',
         ':hover': {
          cursorSize: '300px',
         },
        }}
       />

       <KeyboardArrowRightIcon
        className="arrowIcon"
        sx={{
         position: 'absolute',
         top: -18,
         right: -18,
         color: 'primary.main',
         zIndex: 0,

         transform: 'rotate(-45deg)',
         fontSize: '50px',
        }}
       />
       <KeyboardArrowRightIcon
        className="arrowIcon"
        sx={{
         position: 'absolute',
         bottom: -18,
         left: -18,
         color: 'primary.main',
         zIndex: 0,
         transform: 'rotate(135deg)',
         fontSize: '50px',
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
       objectFit: 'contain',

       transform: flip
        ? `scaleX(-1) rotate(${rotate}deg)`
        : `rotate(${rotate}deg)`,
      }}
     />
    </Box>
   </Rnd>
  </>
 );
};

export default Item;
