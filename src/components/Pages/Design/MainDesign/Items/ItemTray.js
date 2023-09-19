import { React, useState, useEffect, useRef, useCallback } from 'react';
import {
 ImageList,
 ImageListItem,
 Button,
 ImageListItemBar,
 IconButton,
 Typography,
 Modal,
 Box,
 Grow,
 Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

// import Box from '@mui/material/';
import InfoIcon from '@mui/icons-material/Info';
import Filters from '../../../PlantGallery/Filters';
import { useItemsContext } from '../../../../hooks/useItemsContext';
import { useMediaQuery } from '@mui/material';
import FadeLoader from 'react-spinners/FadeLoader';
import axios from 'axios';

const ItemTray = ({ handleAddItem }) => {
 const xl = useMediaQuery((theme) => theme.breakpoints.down('xl'));

 const [mouseOffsetX, setMouseOffsetX] = useState(0);
 const [mouseOffsetY, setMouseOffsetY] = useState(0);

 const [itemTrayItems, setItemTrayItems] = useState([]);
 const [selectedItem, setSelectedItem] = useState('');
 const [selectedFilters, setSelectedFilters] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState();
 const [favoritesId, setFavoritesId] = useState([]);
 const { items, dispatch } = useItemsContext();
 const mainContainerRef = useRef(null);
 const isInitialRender = useRef(true);
 const [page, setPage] = useState(1);
 const totalPageRef = useRef(null);
 const [isLoading, setIsLoading] = useState(false);
 const [fetching, setFetching] = useState(true);
 const [error, setError] = useState([]);
 const [showAlert, setShowAlert] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 // const [fetching, isFetching] = useState(true);
 const [imageDimensions, setImageDimensions] = useState({
  width: null,
  height: null,
 });

 const [color, setColor] = useState('#ECAB00');

 const openAlert = () => {
  setShowAlert(true);
  const timer = setTimeout(() => {
   setShowAlert(false);
  }, 5 * 1000);
  return () => {
   clearTimeout(timer);
  };
 };
 const closeAlert = () => {
  setShowAlert(false);
 };

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

 const handleClose = () => {
  setSelectedItem('');
 };

 const fetchGalleryItems = () => {
  setIsLoading(true);
  setFetching(true);
  if (selectedCategory === 'favorites') {
   const token = sessionStorage.getItem('token');
   axios
    .get(`https://halamanan-197e9734b120.herokuapp.com/favorites`, {
     params: { token },
    })
    .then((response) => {
     setItemTrayItems(response.data);
     setIsLoading(false);
     setFetching(false);
    })
    .catch((error) => {
     setError(error);
    });
  } else {
   axios
    .get(
     `https://halamanan-197e9734b120.herokuapp.com/gallery?page=${page}&limit=10&category=${selectedCategory}&type=${selectedFilters}`
    )
    .then((response) => {
     const fetchedItems = response.data.items;
     if (response.data.page < response.data.totalPages) {
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
  }
 };

 useEffect(() => {
  fetchUserFavoritesId();
 }, []);

 useEffect(() => {
  setItemTrayItems([]);
  setPage(1);
  fetchGalleryItems();
 }, [selectedCategory, selectedFilters]);

 useEffect(() => {
  if (isInitialRender.current) {
   isInitialRender.current = false;
   return;
  }
  fetchGalleryItems();
 }, [page]);
 const handleScroll = useCallback(() => {
  const mainContainer = mainContainerRef.current;

  if (
   mainContainer.scrollTop + mainContainer.clientHeight >=
   mainContainer.scrollHeight
  ) {
   const totalPages = parseInt(totalPageRef.current);
   if (parseInt(page) < totalPages && isLoading === false) {
    setPage((page) => page + 1);
   }
  }
 }, [page, isLoading]);

 useEffect(() => {
  const mainContainer = mainContainerRef.current;
  if (mainContainer) {
   mainContainer.addEventListener('scroll', handleScroll);
   return () => {
    mainContainer.removeEventListener('scroll', handleScroll);
   };
  }
 }, [fetching, handleScroll]);

 const fetchUserFavoritesId = async () => {
  try {
   const token = sessionStorage.getItem('token');
   const response = await axios(
    'https://halamanan-197e9734b120.herokuapp.com/favorites-id',
    {
     headers: {
      token: token,
     },
    }
   ).then((response) => {
    setFavoritesId(response.data);
   });
  } catch (error) {
   setError(error.message);
  }
 };

 const isItemInFavorites = (itemId) => {
  return favoritesId && favoritesId.some((favorite) => favorite === itemId);
 };

 const filteredItems = itemTrayItems.filter((item) => {
  if (
   selectedFilters.length > 0 &&
   item.type.some((type) => !selectedFilters.includes(type))
  ) {
   return false;
  }
  return true;
 });

 const addToFavorites = async (event, itemId) => {
  event.stopPropagation();

  try {
   const response = await fetch(
    'https://halamanan-197e9734b120.herokuapp.com/favorites',
    {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
      token: sessionStorage.getItem('token'),
     },
     body: JSON.stringify({ itemId }),
    }
   );

   if (response.ok) {
    const updated = [...favoritesId, itemId];
    setFavoritesId(updated);
    setAlertMessage('Successfully added item to favorites');
    openAlert();
    closeAlert();
   } else {
   }
  } catch (error) {}
 };

 const removeFromFavorites = async (event, itemId) => {
  event.stopPropagation();
  try {
   const response = await fetch(
    'https://halamanan-197e9734b120.herokuapp.com/favorites',
    {
     method: 'DELETE',
     headers: {
      'Content-Type': 'application/json',
      token: sessionStorage.getItem('token'),
     },
     body: JSON.stringify({ itemId }),
    }
   );

   if (response.ok) {
    const updated = favoritesId.filter((favorite) => favorite !== itemId);
    setFavoritesId(updated);
    setAlertMessage('Successfully removed item from favorites');
    openAlert();
    closeAlert();
   }
  } catch {}
 };

 const addItem = (event, item, index) => {
  const img = new Image();
  img.src = event.target.src;
  const aspectRatio = img.width / img.height;
  const newHeight = 200 / aspectRatio;

  handleAddItem({
   designAreaItem: item,
   itemKey: item._id + items.length + index,
   height: newHeight,
   mouseOffsetX: mouseOffsetX,
   mouseOffsetY: mouseOffsetY,
  });
 };

 const getMousePosition = (event) => {
  var rect = event.target.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  setMouseOffsetY(offsetY);
  setMouseOffsetX(offsetX);
 };

 const CustomAlert = ({ showAlert, closeAlert }) => {
  return (
   <Grow in={showAlert}>
    <Alert
     variant="success"
     onClose={closeAlert}
     sx={{
      color: 'primary.main',
      backgroundColor: 'DDFFBC',
      zIndex: 999999999,
     }}
    >
     {alertMessage}
    </Alert>
   </Grow>
  );
 };

 return (
  <Box>
   <Box sx={{ pt: 1 }}>
    <Filters onFilterChange={handleFilterChange} />
   </Box>
   <ImageList
    ref={mainContainerRef}
    cols={xl ? 6 : 2}
    rowHeight={260}
    gap={11}
    sx={{
     width: xl ? '90vw' : null,
     height: '80vh',
     pr: 2,
    }}
   >
    {filteredItems === 0 ? (
     <Box sx={{ translate: 'transform(-50%, -50%)' }}> No Items Found </Box>
    ) : (
     filteredItems.map((item, index) => (
      <div key={item._id + items.length + index}>
       <ImageListItem
        id=""
        key={item._id + items.length + index}
        cols={2}
        sx={{
         cursor: 'grab',
         bgcolor: 'white',
         width: '220px',
         borderRadius: 2,
         transition: 'background-color ease-in-out 0.2s',
         ':hover': { bgcolor: 'rgba(255,255,255,0.7)' },
        }}
       >
        <Box
         className="draggableItem"
         onDragStart={(event) => getMousePosition(event)}
         onDragEnd={(event) => addItem(event, item, index)}
         sx={{
          height: '191px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          objectFit: 'contain',
          p: 1,
         }}
        >
         <img
          loading="lazy"
          src={item.imageUrl}
          style={{
           maxHeight: '100%',
           maxWidth: '100%',
           objectFit: 'contain',
          }}
         />
        </Box>
        <ImageListItemBar
         sx={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'primary.main',
          pl: 2,
          my: 1,
         }}
         title={item.itemName}
         position="below"
         actionIcon={
          <IconButton
           title="Information"
           onClick={(event) => showItemDetails(event, item)}
           sx={{
            transition: 'color ease-in-out 0.2s',
            color: 'rgba(255, 255, 255, 0.54)',
            ':hover': { color: 'orange' },
           }}
           aria-label={`info about ${item.title}`}
          >
           <InfoIcon />
          </IconButton>
         }
        />
       </ImageListItem>
       <Modal
        open={selectedItem._id === item._id}
        onClose={handleClose}
       >
        <Box
         sx={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          top: '50%',
          left: '50%',
          bgcolor: 'rgba(12, 35, 13, 0.6)',

          borderRadius: 1,
         }}
        >
         {showAlert && (
          <CustomAlert
           showAlert={showAlert}
           closeAlert={closeAlert}
          />
         )}
         <Box
          sx={{
           bgcolor: 'rgba(255,255,255,0.2)',
           p: 2,
           borderRadius: 1,
          }}
         >
          <Box
           sx={{
            bgcolor: 'rgba(255,255,255,0.9)',
            justifyContent: 'space-between',
            display: 'flex',
            p: 2,
            borderRadius: 1,
           }}
          >
           <Button
            title={
             isItemInFavorites(item._id)
              ? 'Remove from Favorites'
              : 'Add to Favorites ko.'
            }
            onClick={
             isItemInFavorites(item._id)
              ? (event) => {
                 removeFromFavorites(event, item._id);
                }
              : (event) => {
                 addToFavorites(event, item._id);
                }
            }
            sx={{
             height: '50px',
             width: '50px',
             ':hover': { bgcolor: 'rgba(0,0,0,0.1)' },
            }}
           >
            {isItemInFavorites(item._id) ? <StarIcon /> : <StarBorderIcon />}
           </Button>
           <Box sx={{ height: '400px' }}>
            <img
             src={item.imageUrl}
             style={{ objectFit: 'contain', height: '100%', width: '100%' }}
            />
           </Box>
           <Button
            sx={{
             height: '50px',
             width: '50px',
             ':hover': { bgcolor: 'rgba(0,0,0,0.1)' },
            }}
           >
            <CloseIcon
             title="Close"
             onClick={handleClose}
            />
           </Button>
          </Box>
          <Box
           className="itemInformation"
           sx={{ py: 1 }}
          >
           <span style={{ color: 'orange' }}>
            <strong>Item Description: </strong>
           </span>
           {item.itemInformation}
          </Box>
          <Box>
           <span style={{ color: 'orange' }}>
            <strong>Hardiness Zone: </strong>
           </span>{' '}
           Lorem Ipsum
          </Box>
          <Box sx={{ py: 1 }}>
           <span style={{ color: 'orange' }}>
            <strong>Height: </strong>
           </span>{' '}
           Lorem Ipsum
          </Box>
          <Box>
           <span style={{ color: 'orange' }}>
            <strong>Watering: </strong>
           </span>{' '}
           Lorem Ipsum
          </Box>
          <Box sx={{ pt: 1 }}>
           <span style={{ color: 'orange' }}>
            <strong>Lighting: </strong>
           </span>{' '}
           Lorem Ipsum
          </Box>
         </Box>
        </Box>
       </Modal>
      </div>
     ))
    )}
    {fetching && (
     <Box
      sx={{
       width: '220px',
       height: '200px',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       borderRadius: 1,
       bgcolor: 'rgba(255,255,255,0.2)',
       flexDirection: 'column',
      }}
     >
      <Typography sx={{ fontSize: '22px', mb: 3 }}> Fetching Items </Typography>
      <FadeLoader
       color={color}
       loading={fetching}
       size={200}
       aria-label="Loading Spinner"
       data-testid="loader"
      />
     </Box>
    )}
   </ImageList>
  </Box>
 );
};

export default ItemTray;
