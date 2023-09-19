import { React, useState, useEffect, useRef, useCallback } from 'react';
import {
 Box,
 Container,
 useTheme,
 ThemeProvider,
 Grow,
 Alert,
 Typography,
 Modal,
} from '@mui/material/';
import Filters from './Filters';
import axios from 'axios';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddNewItemButton from './AddNewItemButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FadeLoader from 'react-spinners/FadeLoader';
import { motion } from 'framer-motion';
const PlantGallery = ({ isGuest }) => {
 const theme = useTheme();
 const totalCountRef = useRef(0);
 const [showAlert, setShowAlert] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 const [fetching, setFetching] = useState(true);
 const [favoritesId, setFavoritesId] = useState();
 const [items, setItems] = useState([]);
 const [page, setPage] = useState(1);
 const isInitialRender = useRef(0);
 const totalPageRef = useRef(null);
 const [isLoading, setIsLoading] = useState(false);
 const [activeItem, setActiveItem] = useState(null);
 const currentIndexRef = useRef(0);
 const [selectedFilters, setSelectedFilters] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState('all');
 const [openMain, setOpenMain] = useState(false);
 const [color, setColor] = useState('#ECAB00');
 const [error, setError] = useState([]);
 const mainContainerRef = useRef(null);
 const activeItemRef = useRef(null);

 const openAlert = () => {
  setShowAlert(true);
 };
 const closeAlert = () => {
  setShowAlert(false);
 };

 useEffect(() => {
  let timer;

  if (showAlert) {
   timer = setTimeout(() => {
    setShowAlert(false);
   }, 5000); // 5 seconds
  }

  // Clean up the timer when the component unmounts or when showAlert is set to false
  return () => {
   clearTimeout(timer);
  };
 }, [showAlert]);

 useEffect(() => {
  fetchUserFavoritesId();
  const timer = setTimeout(() => {
   setOpenMain(true);
  }, 100);
 }, []);

 useEffect(() => {
  fetchGalleryItems();
 }, [page]);

 useEffect(() => {
  if (isInitialRender.current != 2) {
   isInitialRender.current = isInitialRender.current + 1;
   return;
  }
  setItems([]);
  setPage(1);
  fetchGalleryItems();
 }, [selectedCategory, selectedFilters]);

 const fetchGalleryItems = () => {
  setIsLoading(true);

  if (selectedCategory === 'favorites') {
   const token = sessionStorage.getItem('token');

   axios
    .get(`https://halamanan-197e9734b120.herokuapp.com/favorites`, {
     params: { token },
    })
    .then((response) => {
     setItems(response.data);
     setIsLoading(false);
     setFetching(false);
    })
    .catch((error) => {
     setError(error);
    });
  } else {
   axios
    .get(
     `https://halamanan-197e9734b120.herokuapp.com/gallery?page=${page}&limit=12&category=${selectedCategory}&type=${selectedFilters}`
    )
    .then((response) => {
     totalCountRef.current = response.data.totalCount;
     const fetchedItems = response.data.items;
     if (response.data.page < response.data.totalPages) {
      setItems((prevItems) => [...prevItems, ...fetchedItems]);
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

 const filteredItems = items.filter((item) => {
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
    // closeAlert();
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
    // closeAlert();
   }
  } catch {}
 };

 const handleActiveItem = (event, index) => {
  event.stopPropagation();
  if (activeItem !== index) {
   currentIndexRef.current = index;
   setActiveItem(index);
  }
 };
 const handleClose = () => setActiveItem(null);

 const handleKeyDown = (event) => {
  if (event.key === 'ArrowLeft') {
   handlePreviousItem();
  } else if (event.key === 'ArrowRight') {
   handleNextItem();
  }
 };

 useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
  return () => {
   window.removeEventListener('keydown', handleKeyDown);
  };
 }, [activeItem]);

 const handleNextItem = () => {
  if (
   currentIndexRef.current <= totalCountRef.current &&
   currentIndexRef.current !== items.length - 1 &&
   activeItem !== null
  ) {
   currentIndexRef.current = currentIndexRef.current + 1;
   setActiveItem(currentIndexRef.current);
  }
 };

 const handlePreviousItem = () => {
  if (currentIndexRef.current !== 0 && activeItem !== null) {
   currentIndexRef.current = currentIndexRef.current - 1;
   setActiveItem(currentIndexRef.current);
  }
 };

 const handleFilterChange = (filters, category) => {
  setSelectedCategory(category);
  setSelectedFilters(filters);
 };

 const handleSuccess = () => {
  setAlertMessage('Successfully sent request to admin');
  openAlert();
 };

 const CustomAlert = ({ showAlert, closeAlert }) => {
  return (
   <Grow in={showAlert}>
    <Alert
     variant="success"
     onClose={closeAlert}
     sx={{ color: 'primary.main', backgroundColor: 'DDFFBC' }}
    >
     {alertMessage}
    </Alert>
   </Grow>
  );
 };

 return (
  <ThemeProvider theme={theme}>
   <motion.div
    initial={{ opacity: 0, transition: { duration: 0.3 } }}
    animate={{ opacity: 1, transition: { duration: 0.3 } }}
    exit={{ opacity: 0, transition: { duration: 0.3 } }}
   >
    <Container
     maxWidth={'xl'}
     className="main-container"
     disableGutters={true}
    >
     <Box
      sx={{
       mt: 2,
       height: '100%',
       overflowY: 'auto',
       overflowWrap: 'break-word',
       wordBreak: 'break-word',
       hyphens: 'auto',
       //  bgcolor: 'pink',
      }}
     >
      <Box
       sx={{
        width: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 1,
       }}
      >
       <Typography variant="h5">Gallery</Typography>
       <CustomAlert
        showAlert={showAlert}
        closeAlert={closeAlert}
       />
       <Box
        sx={{
         float: 'right',
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'space-around',
        }}
       >
        {isGuest !== true && <AddNewItemButton handleSuccess={handleSuccess} />}
        <Filters
         onFilterChange={handleFilterChange}
         isGuest={true}
        />
       </Box>
      </Box>
      <Container
       maxWidth={'xl'}
       disableGutters={true}
      >
       <Box
        sx={{
         mt: 1,
         borderRadius: 2,
         scrollbarColor: 'primary.main',
        }}
       >
        {fetching === true ? (
         <Box
          sx={{
           display: 'flex',
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%,-50%)',
           flexDirection: 'column',
           alignItems: 'center',
          }}
         >
          <Box
           sx={{
            color: 'primary.main',
            fontSize: '30px',
            mb: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
           }}
          >
           Fetching Items
          </Box>
          <FadeLoader
           color={color}
           loading={fetching}
           size={200}
           aria-label="Loading Spinner"
           data-testid="loader"
          />
         </Box>
        ) : (
         <Box
          ref={mainContainerRef}
          className="object-display"
          display="flex"
          flexWrap="wrap"
          sx={{
           height: 'inherit',
           overflowY: 'scroll',
           m: 3,
          }}
         >
          {filteredItems.length === 0 ? (
           <Box
            sx={{
             position: 'absolute',
             top: '30%',
             left: '50%',
             transform: 'translateX(-50%) translateY(-60%)',
             fontSize: '40px',
             backgroundColor: 'primary.main',
             color: 'white',
             borderRadius: 2,
             p: 2,
            }}
           >
            No Items Found
           </Box>
          ) : (
           <Box
            sx={{
             display: 'flex',
             flexWrap: 'wrap',
             width: '90vw',
             height: '81vh',
             justifyContent: 'space-evenly',
            }}
           >
            {items.map((item, index) => (
             <Grow
              in={filteredItems != null}
              key={index}
             >
              <Box className={'itemContainer'}>
               <Box
                onClick={(event) => handleActiveItem(event, index)}
                sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 flexWrap: 'wrap',
                 borderRadius: 1,
                 mb: 4,
                 px: 2,
                 maxWidth: '300px',
                 pt: isGuest === true ? 3 : null,
                 cursor: 'pointer',
                 bgcolor: 'rgba(255,255,255,0.08)',
                 transition: 'background-color ease-in-out 0.2s',
                 ':hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                }}
               >
                {isGuest !== true && isItemInFavorites(item._id) ? (
                 <Button
                  title="Remove from Favorites"
                  sx={{
                   display: 'flex',
                   zIndex: 1,
                   width: '1px',
                   alignItems: 'center',
                   justifyContent: 'center',
                  }}
                  onClick={(event) => {
                   removeFromFavorites(event, item._id);
                  }}
                 >
                  {' '}
                  <StarIcon
                   sx={{
                    color: 'orange',
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: 'none',
                    transition:
                     'background-color ease-in-out 0.2s, color ease-in-out 0.2s',
                    ':hover': {
                     backgroundColor: 'rgba(0,0,0,0.4)',
                    },
                   }}
                  />
                 </Button>
                ) : (
                 isGuest !== true && (
                  <Button
                   title="Add to Favorites"
                   sx={{
                    display: 'flex',
                    zIndex: 1,
                    width: '1px',
                    alignItems: 'center',
                    justifyContent: 'center',
                   }}
                   onClick={(event) => {
                    addToFavorites(event, item._id);
                   }}
                  >
                   <StarBorderIcon
                    sx={{
                     color: 'orange',
                     p: 1,
                     borderRadius: 1,
                     backgroundColor: 'none',
                     transition:
                      'background-color ease-in-out 0.2s, color ease-in-out 0.2s',
                     ':hover': {
                      backgroundColor: 'rgba(0,0,0,0.4)',
                     },
                    }}
                   />
                  </Button>
                 )
                )}
                <Box
                 sx={{
                  bgcolor: 'white',
                  p: 1,
                  width: '250px',
                  height: '250px',
                 }}
                >
                 <img
                  className="plantImage"
                  src={item.imageUrl}
                  loading="lazy"
                  style={{
                   width: '100%',
                   objectFit: 'contain',
                   height: '100%',
                  }}
                 />
                </Box>
                <Box
                 sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '400px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80px',
                 }}
                >
                 <Box> {item.itemName}</Box>
                 <Box>
                  {item.scientificName && (
                   <strong>
                    <em>{item.scientificName}</em>
                   </strong>
                  )}
                 </Box>
                </Box>
               </Box>

               {/* modal for viewing the item */}
               <Modal
                id="modal"
                open={index === activeItem}
                onClose={handleClose}
               >
                <Box
                 ref={activeItemRef}
                 className="itemContainer"
                 sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  height: ' 750px',
                  overflowY: 'scroll',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'primary.main',
                  color: 'primary.main',
                  borderRadius: 1,
                  borderWidth: '1px',
                  width: '800px',
                  maxWidth: '800px',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  hyphens: 'auto',
                 }}
                >
                 <Box
                  sx={{
                   position: 'absolute',
                   height: '100%',
                   display: 'flex',
                   justifyContent: 'space-between',
                   alignItems: 'center',
                   width: '100%',
                  }}
                 >
                  <Button
                   id="leftArrowButton"
                   disabled={index === 0}
                   title="Previous Item"
                   onClick={handlePreviousItem}
                   sx={{
                    ml: 1,
                    color: 'gray',
                    opacity: index === 0 ? 0 : 1,
                    ':hover': { color: 'white', bgcolor: 'rgba(0,0,0,0.2)' },
                   }}
                  >
                   <KeyboardArrowLeftIcon />
                  </Button>

                  <Button
                   id="rightArrowButton"
                   onClick={handleNextItem}
                   disabled={activeItem === items.length - 1}
                   title="Next Item"
                   sx={{
                    mr: 1,
                    color: 'gray',
                    cursor: 'pointer',
                    opacity: activeItem === items.length - 1 ? 0 : 1,
                    ':hover': { color: 'white', bgcolor: 'rgba(0,0,0,0.2)' },
                   }}
                  >
                   <KeyboardArrowRightIcon />
                  </Button>
                 </Box>
                 {index === activeItem && (
                  <Box
                   sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    p: 4,
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                   }}
                  >
                   <Box
                    sx={{
                     display: 'flex',
                     justifyContent: 'center',
                    }}
                   >
                    <Box sx={{ position: 'absolute', left: 15, top: 15 }}>
                     {isGuest !== true && isItemInFavorites(item._id) ? (
                      <Button
                       title="Remove from Favorites"
                       sx={{
                        transition:
                         'background-color ease-in-out 0.2s, color ease-in-out 0.2s',
                        ':hover': {
                         backgroundColor: 'rgba(255,255,255,0.1)',
                        },
                       }}
                       onClick={(event) => {
                        removeFromFavorites(event, item._id);
                       }}
                      >
                       {' '}
                       <StarIcon
                        sx={{
                         color: 'orange',
                        }}
                       />
                      </Button>
                     ) : (
                      isGuest !== true && (
                       <Button
                        title="Add to Favorites"
                        sx={{
                         transition:
                          'background-color ease-in-out 0.2s, color ease-in-out 0.2s',
                         ':hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                         },
                        }}
                        onClick={(event) => {
                         addToFavorites(event, item._id);
                        }}
                       >
                        <StarBorderIcon
                         sx={{
                          color: 'orange',
                         }}
                        />
                       </Button>
                      )
                     )}
                    </Box>
                    <Box
                     sx={{
                      width: '400px',
                      height: '400px',
                      bgcolor: 'white',
                      p: 1,
                      borderRadius: 1,
                     }}
                    >
                     <img
                      className="plantImage"
                      src={item.imageUrl}
                      loading="lazy"
                      style={{
                       width: '100%',
                       objectFit: 'contain',
                       height: '100%',
                      }}
                     />
                    </Box>
                    <CloseIcon
                     onClick={handleClose}
                     sx={{
                      position: 'absolute',
                      right: 15,
                      top: 15,
                      p: 1,
                      cursor: 'pointer',
                      color: 'white',
                      transition: 'background-color ease-in 0.2s',
                      ':hover': {
                       bgcolor: 'rgba(0,0,0,0.1)',
                       borderRadius: 1,
                      },
                     }}
                    />
                   </Box>
                   <Box>
                    <span style={{ color: 'orange' }}>
                     {' '}
                     <strong> Item Name: </strong>{' '}
                    </span>
                    {item.itemName}
                   </Box>
                   {item.scientificName && (
                    <Box>
                     <span style={{ color: 'orange' }}>
                      {' '}
                      <strong> Scientific Name: </strong>{' '}
                     </span>
                     <em>{item.scientificName}</em>
                    </Box>
                   )}
                   <Box
                    className="itemInformation"
                    sx={{ pb: 1 }}
                   >
                    <span style={{ color: 'orange' }}>
                     <strong>Item Information: </strong>{' '}
                    </span>
                    {item.itemInformation}
                   </Box>
                   <Box className="itemType">
                    <span style={{ color: 'orange' }}>
                     <strong>Item type: </strong>
                    </span>
                    <span>
                     {item.type.map((info, index) => (
                      <span key={index}> {(index ? ', ' : '') + info} </span>
                     ))}
                    </span>
                   </Box>
                   <Box className="info-source">
                    <span style={{ color: 'orange' }}>
                     <strong>Information Source: </strong>
                    </span>
                    <br />
                    {item.informationSource}
                   </Box>
                   <Box className="image-source">
                    <span style={{ color: 'orange' }}>
                     <strong>Image Source: </strong>
                    </span>
                    {item.imageSource}
                   </Box>
                  </Box>
                 )}
                </Box>
               </Modal>
              </Box>
             </Grow>
            ))}
            {isLoading && (
             <Grow in={isLoading}>
              <Box
               sx={{
                my: 2,
                ml: 2,

                color: 'red',
                width: '250px',
                height: '400px',
                bgcolor: 'primary.main',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
               }}
              >
               {' '}
               <Box sx={{ mb: 2, fontSize: '20px', color: 'orange' }}>
                Loading
               </Box>
               <FadeLoader />
              </Box>
             </Grow>
            )}
           </Box>
          )}
         </Box>
        )}
       </Box>
      </Container>
     </Box>
    </Container>
   </motion.div>
  </ThemeProvider>
 );
};
export default PlantGallery;
