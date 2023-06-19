import { React, useState, useEffect } from 'react';
import {
  ImageList,
  ImageListItem,
  Button,
  ImageListItemBar,
  IconButton,
} from '@mui/material';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';

import axios from 'axios';

const ItemTray = ({ handleAddItem }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const showItemDetails = (event, item) => {
    event.stopPropagation();
    if (selectedItem._id === item._id) {
      setSelectedItem('');
    } else {
      setSelectedItem(item);
    }
  };

  useEffect(() => {
    axios
      .get('https://halamanan-197e9734b120.herokuapp.com/gallery')
      .then((response) => {
        const fetchedItems = response.data;
        setItems(fetchedItems);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <ImageList
        cols={2}
        rowHeight={230}
        gap={1}
        sx={{
          height: '80vh',
          width: '100%',
          pt: 2,
        }}
      >
        {items.map((item, index) => (
          <div key={index}>
            <ImageListItem
              key={index}
              cols={1}
              onClick={() => handleAddItem(item, { index })}
              sx={{
                cursor: 'pointer',
                ':hover': { opacity: '0.8' },
                bgcolor: 'orange',
                height: '200px',
                width: '200px',
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={item.imageUrl}
                  style={{
                    boxSizing: 'border-box',
                    height: '170px',
                  }}
                />
              </Box>
              <ImageListItemBar
                sx={{
                  backgroundColor: 'primary.main',
                  pl: 2,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                title={item.itemName}
                position="below"
                actionIcon={
                  <IconButton
                    onClick={(event) => showItemDetails(event, item)}
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
            {selectedItem && selectedItem._id === item._id && (
              <ImageListItem
                key={`${item._id}-details`}
                rows={1}
                cols={2}
                sx={{ height: '400px', bgcolor: 'orange' }}
              >
                <Box sx={{ color: 'primary.main', p: 2 }}>
                  {item.itemInformation}
                </Box>
              </ImageListItem>
            )}
          </div>
        ))}
      </ImageList>
    </>
  );
};

export default ItemTray;
