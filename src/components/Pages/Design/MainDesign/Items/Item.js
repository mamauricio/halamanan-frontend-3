// import React, { useState, useEffect } from 'react';
// import './Item.css';
// import { Rnd } from 'react-rnd';
// import Button from '@mui/material/Button';
// import { useItemsContext } from '../../../../hooks/useItemsContext';
// import RemoveIcon from '@mui/icons-material/Remove';

// const Item = (props) => {
//  const [width, setWidth] = useState(props.width);
//  const [height, setHeight] = useState(props.width);
//  const [x, setX] = useState(props.x);
//  const [y, setY] = useState(props.y);
//  const [selectedItem, setSelectedItem] = useState(null);
//  const [isHovered, setIsHovered] = useState(false);
//  const { items, dispatch } = useItemsContext();

//  useEffect(() => {
//   const newData = { width, height, x, y };
//   dispatch({
//    type: 'RESIZE_ITEM',
//    payload: {
//     itemKey: props.itemKey,
//     newData,
//    },
//   });
//  }, [width, height, x, y, props.itemKey, dispatch]);

//  useEffect(() => {
//   const newData = { x, y };
//   dispatch({
//    type: 'MOVE_ITEM',
//    payload: {
//     itemKey: props.itemKey,
//     newData,
//    },
//   });
//  }, [x, y, props.itemKey, dispatch]);

//  const changePosition = (e, item) => {
//   setX(item.x);
//   setY(item.y);
//  };

//  const handleResize = (e, direction, ref, delta, position) => {
//   setWidth(ref.style.width);
//   setHeight(ref.style.height);
//   setX(position.x);
//  };

//  const handleClick = (itemKey) => {
//   setSelectedItem(itemKey);
//  };

//  const removeItem = (itemKey) => {
//   //console.log((itemKey);
//   dispatch({
//    type: 'REMOVE_ITEM',
//    payload: { itemKey },
//   });
//  };

//  return (
//   <>
//    <Rnd
//     className="item"
//     size={{ width, height }}
//     position={{ x, y }}
//     enableResizing={{ bottomRight: true, topLeft: true, bottomLeft: true }}
//     minWidth={100}
//     minHeight={100}
//     disableDragging={false}
//     lockAspectRatio={true}
//     onDrag={changePosition}
//     onResize={handleResize}
//     resizeHandleClasses={['bottomRight', 'topRight', 'bottomLeft']}
//     onMouseEnter={() => setIsHovered(true)}
//     onMouseLeave={() => setIsHovered(false)}
//    >
//     {isHovered && (
//      <Button
//       onClick={() => removeItem(props.itemKey)}
//       sx={{ position: 'absolute', bgcolor: 'orange', zIndex: 2 }}
//      >
//       <RemoveIcon />
//      </Button>
//     )}
//     <img
//      className="image"
//      key={props.itemKey}
//      label={props.itemName}
//      src={props.imageUrl}
//      width={width}
//      onClick={() => handleClick(props.itemKey)}
//      style={{ zIndex: selectedItem === props.itemKey ? 1 : 0 }}
//     />
//    </Rnd>
//   </>
//  );
// };

// export default Item;

import React, { useState, useEffect } from 'react';
import './Item.css';
import { Rnd } from 'react-rnd';
import Button from '@mui/material/Button';
import { useItemsContext } from '../../../../hooks/useItemsContext';
import RemoveIcon from '@mui/icons-material/Remove';

const Item = (props) => {
 const [imageLoaded, setImageLoaded] = useState(false);
 const [aspectRatio, setAspectRatio] = useState(1); // Initial aspect ratio of 1:1
 const [x, setX] = useState(props.x);
 const [y, setY] = useState(props.y);
 const [selectedItem, setSelectedItem] = useState(null);
 const [isHovered, setIsHovered] = useState(false);
 const { items, dispatch } = useItemsContext();

 useEffect(() => {
  const img = new Image();
  img.onload = () => {
   const imgAspectRatio = img.width / img.height;
   setAspectRatio(imgAspectRatio);
   setImageLoaded(true);
  };
  img.src = props.imageUrl;
 }, [props.imageUrl]);

 const changePosition = (e, item) => {
  setX(item.x);
  setY(item.y);
 };

 const handleResize = (e, direction, ref, delta, position) => {
  const { width, height } = ref.style;
  const newWidth = parseInt(width, 10);
  const newHeight = newWidth / aspectRatio;
  setX(position.x);
  setY(position.y);
  setAspectRatio(aspectRatio); // Ensuring aspect ratio is maintained
  setWidth(`${newWidth}px`); // Updating width with new dimensions
  setHeight(`${newHeight}px`); // Updating height with new dimensions
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
   {imageLoaded && (
    <Rnd
     className="item"
     size={{ width, height }}
     position={{ x, y }}
     enableResizing={{ bottomRight: true, topLeft: true, bottomLeft: true }}
     minWidth={100}
     minHeight={100}
     disableDragging={false}
     lockAspectRatio={aspectRatio} // Locking aspect ratio
     onDrag={changePosition}
     onResize={handleResize}
     resizeHandleClasses={['bottomRight', 'topRight', 'bottomLeft']}
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
    >
     {isHovered && (
      <Button
       onClick={() => removeItem(props.itemKey)}
       sx={{ position: 'absolute', bgcolor: 'orange', zIndex: 2 }}
      >
       <RemoveIcon />
      </Button>
     )}
     <img
      className="image"
      key={props.itemKey}
      label={props.itemName}
      src={props.imageUrl}
      onClick={() => handleClick(props.itemKey)}
      style={{ zIndex: selectedItem === props.itemKey ? 1 : 0 }}
     />
    </Rnd>
   )}
  </>
 );
};

export default Item;
