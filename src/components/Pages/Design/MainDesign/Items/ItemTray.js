import { React, useState, useEffect, useRef, useCallback } from 'react';
import {
 ImageList,
 ImageListItem,
 Button,
 ImageListItemBar,
 IconButton,
} from '@mui/material';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Filters from '../../../PlantGallery/Filters';
import { useItemsContext } from '../../../../hooks/useItemsContext';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';

const ItemTray = ({ handleAddItem }) => {
 const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'));

 const [itemTrayItems, setItemTrayItems] = useState([]);
 const [selectedItem, setSelectedItem] = useState('');
 const [selectedFilters, setSelectedFilters] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState();
 const [favorites, setFavorites] = useState([]);
 const { items, dispatch } = useItemsContext();
 const mainContainerRef = useRef(null);
 const [page, setPage] = useState(1);
 const totalPageRef = useRef(null);
 const [isLoading, setIsLoading] = useState(false);
 const [fetching, setFetching] = useState(true);
 const [error, setError] = useState([]);

 const handleFilterChange = (filters, category) => {
  setSelectedCategory(category);
  setSelectedFilters(filters);
 };
 const showItemDetails = (event, item) => {
  event.stopPropagation();
  if (selectedItem._id === item._id) {
   setSelectedItem('');
  } else {
   setSelectedItem(item);
  }
 };

 //  const fetchUserFavorites = async () => {
 //   try {
 //    const token = sessionStorage.getItem('token');
 //    const response = await fetch('https://halamanan-197e9734b120.herokuapp.com/favorites', {
 //     headers: {
 //      token: token,
 //     },
 //    });

 //    const data = await response.json();
 //    setFavorites(data);
 //   } catch (error) {}
 //  };

 useEffect(() => {
  // totalPageRef.current = 1;
  const fetchGalleryItems = () => {
   setIsLoading(true);
   //    console.log(page);
   //  pageRef.current = 1;
   //  if (page <= totalPageRef.current) {
   axios
    .get(
     `https://halamanan-197e9734b120.herokuapp.com/gallery?page=${page}&limit=10`
    )
    .then((response) => {
     const fetchedItems = response.data.items;
     if (
      //   totalPageRef.current !== null &&
      response.data.page < response.data.totalPages
     ) {
      setItemTrayItems((prevItems) => [...prevItems, ...fetchedItems]);
     }
     totalPageRef.current = parseInt(response.data.totalPages);

     setIsLoading(false);
     setFetching(false);
    })
    .catch((error) => {
     setError(error.message);
     setIsLoading(false);
    });
  };
  fetchGalleryItems();
  // }
 }, [page]);
 //   fetchUserFavorites();
 const handleScroll = useCallback(() => {
  const mainContainer = mainContainerRef.current;

  if (
   mainContainer.scrollTop + mainContainer.clientHeight >=
   mainContainer.scrollHeight
  ) {
   const totalPages = parseInt(totalPageRef.current);
   //    console.log(`current page: ${page}`)/;
   //    console.log(`total pages: ${totalPages}`);
   if (parseInt(page) < totalPages && isLoading === false) {
    // console.log('adding +1');
    setPage((page) => page + 1);
   }
  }
 }, [page, isLoading]);

 useEffect(() => {
  //   console.log('attaching ');
  const mainContainer = mainContainerRef.current;
  if (mainContainer) {
   mainContainer.addEventListener('scroll', handleScroll);
   return () => {
    mainContainer.removeEventListener('scroll', handleScroll);
   };
  }
 }, [fetching, handleScroll]);

 const isItemInFavorites = (itemId) => {
  return favorites.some((favorite) => favorite.itemId === itemId);
 };

 const filteredItems = itemTrayItems.filter((item) => {
  if (selectedCategory === 'favorites' && isItemInFavorites(item._id)) {
   return true;
  }

  if (
   selectedCategory &&
   selectedCategory !== 'all' &&
   selectedCategory !== item.category
  ) {
   return false;
  }

  if (
   selectedFilters.length > 0 &&
   item.type.some((type) => !selectedFilters.includes(type))
  ) {
   return false;
  }
  return true;
 });

 return (
  <Box>
   <Box sx={{ pt: 1 }}>
    <Filters onFilterChange={handleFilterChange} />
   </Box>
   <ImageList
    ref={mainContainerRef}
    cols={xs ? 7 : 2}
    rowHeight={250}
    gap={10}
    sx={{
     height: '80vh',
     width: '100%',
     pt: 2,
     //  overflowX: 'none',
    }}
   >
    {filteredItems.map((item, index) => (
     <div key={item._id + items.length + index}>
      <ImageListItem
       key={item._id + items.length + index}
       cols={2}
       onClick={() =>
        handleAddItem({
         designAreaItem: item,
         itemKey: item._id + items.length + index,
        })
       }
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
        {/* {console.log(item.imageUrl)} */}
        <img
         loading="lazy"
         src={item.imageUrl}
         style={{
          boxSizing: 'border-box',
          height: '100%',
          maxWidth: '100%',
          objectFit: 'cover',
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
        rows={2}
        col={2}
        sx={{ height: '500px', bgcolor: 'orange' }}
       >
        <Box sx={{ color: 'primary.main', p: 2 }}>{item.itemInformation}</Box>
       </ImageListItem>
      )}
     </div>
    ))}
   </ImageList>
  </Box>
 );
};

export default ItemTray;
