import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import './DesignArea.css';
import Item from '../Items/Item';
import { useItemsContext } from '../../../../hooks/useItemsContext';

const DesignArea = ({ backgroundImage, backgroundAspectRatio }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { items, dispatch } = useItemsContext();
  const [backgroundSize, setBackgroundSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    dispatch({ type: 'GET_ITEMS', payload: [] });
  }, []);

  const mainContainerStyle = {
    position: 'relative',
    width: '100%',
    aspectRatio: backgroundAspectRatio.toString(),
    overflow: 'hidden',
    border: 'solid 1px yellow',
  };

  const backgroundImageStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'green',
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
    <Box id="backgroundImageContainer" sx={mainContainerStyle}>
      <Box id="background" sx={backgroundImageStyle}>
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
      </Box>
    </Box>
  );
};

export default DesignArea;
