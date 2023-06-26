import { React, useState, useEffect, useRef, useCallback } from 'react';
import {
 Box,
 Container,
 useTheme,
 ThemeProvider,
 Grow,
 Alert,
 Fade,
} from '@mui/material/';
import Filters from './Filters';
import './PlantGallery.css';
import axios from 'axios';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import AddNewItemButton from './AddNewItemButton';
import FadeLoader from 'react-spinners/FadeLoader';
const PlantGallery = () => {
 const theme = useTheme();
 const [showAlert, setShowAlert] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 const [fetching, setFetching] = useState(true);
 const [favoritesId, setFavoritesId] = useState();
 const [items, setItems] = useState([]);
 const [page, setPage] = useState(1);
 const isInitialRender = useRef(true);

 const totalPageRef = useRef(null);
 const [isLoading, setIsLoading] = useState(false);
 const [favorites, setFavorites] = useState([]);
 const [activeItem, setActiveItem] = useState(null);
 const [selectedFilters, setSelectedFilters] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState('all');
 const [openMain, setOpenMain] = useState(false);
 const childRef = useRef(null);
 const [color, setColor] = useState('#ECAB00');
 const [error, setError] = useState([]);
 const mainContainerRef = useRef(null);

 const openAlert = () => {
  setShowAlert(true);
 };
 const closeAlert = () => {
  const timer = setTimeout(() => {
   setShowAlert(false);
  }, 4 * 1000);

  return () => {
   clearTimeout(timer);
  };
 };

 useEffect(() => {
  // fetchGalleryItems();
  fetchUserFavoritesId();
  const timer = setTimeout(() => {
   setOpenMain(true);
  }, 100);
 }, []);

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
     `https://halamanan-197e9734b120.herokuapp.com/gallery?page=${page}&limit=10&category=${selectedCategory}&type=${selectedFilters}`
    )
    .then((response) => {
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

 useEffect(() => {
  setItems([]);
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

 const handleActiveItem = (event, index) => {
  event.stopPropagation();
  if (activeItem === index) {
   setActiveItem(null);
  } else {
   setActiveItem(index);
  }
 };

 const handleFilterChange = (filters, category) => {
  setSelectedCategory(category);
  setSelectedFilters(filters);
 };

 const handleSuccess = () => {
  setAlertMessage('Successfully sent request to admin');
  openAlert();
  closeAlert();
 };

 const CustomAlert = ({ showAlert, closeAlert }) => {
  return (
   <Grow in={showAlert}>
    <Alert
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
   <Fade in={openMain}>
    <Container
     maxWidth={'xl'}
     className="main-container"
     disableGutters={true}
    >
     <Box
      sx={{
       mt: 2,
       height: '90vh',
       backgroundColor: 'primary.main',
       borderRadius: 2,
       boxShadow: 2,
       overflowY: 'auto',
       overflowWrap: 'break-word',
       wordBreak: 'break-word',
       hyphens: 'auto',
      }}
     >
      <Box
       sx={{
        width: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 1,
        mx: 6,
       }}
      >
       <Box
        sx={{
         fontSize: '30px',
         color: 'DDFFBC',
        }}
       >
        Gallery
       </Box>
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
        <AddNewItemButton handleSuccess={handleSuccess} />
        <Filters onFilterChange={handleFilterChange} />
       </Box>
      </Box>
      <Container maxWidth={'xl'}>
       <Box
        sx={{
         backgroundColor: 'background.default',
         height: '80vh',
         mt: 1,
         //  overflowY: 'auto',
         borderRadius: 2,
         scrollbarColor: 'primary.main',
         boxShadow: 2,
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
          {/* <br /> */}
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
          sx={{ height: 'inherit', overflowY: 'scroll' }}
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
           <>
            {items.map((item, index) => (
             <Grow
              in={filteredItems != null}
              key={index}
             >
              <div
               key={index}
               className={
                index === activeItem ? 'itemContainer active' : 'itemContainer'
               }
               onClick={(event) => handleActiveItem(event, index)}
              >
               <Box
                className={
                 index === activeItem
                  ? 'imageContainerContainer active'
                  : 'imageContainerContainer'
                }
                sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 flexWrap: 'wrap',
                 width: '100%',
                 alignContent: 'left',
                 justifyContent: 'center',
                }}
               >
                {isItemInFavorites(item._id) ? (
                 <Button
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
                    color:
                     activeItem && activeItem.index === item.index
                      ? 'orange'
                      : 'orange',
                   }}
                  />
                 </Button>
                ) : (
                 <Button
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
                    color:
                     activeItem && activeItem.index === item.index
                      ? 'primary.main'
                      : 'orange',
                   }}
                  />
                 </Button>
                )}
                <Box
                 className={
                  index === activeItem
                   ? 'imageContainer active'
                   : 'imageContainer'
                 }
                >
                 <img
                  src={item.imageUrl}
                  loading="lazy"
                 />
                </Box>

                <div className="itemLabel">
                 {item.itemName}
                 <br />
                 {item.scientificName && (
                  <strong>
                   <em>{item.scientificName}</em>
                  </strong>
                 )}
                </div>
               </Box>

               <Box
                className={
                 index === activeItem
                  ? 'informationContainer active'
                  : 'informationContainer'
                }
               >
                <br />
                {index === activeItem ? (
                 <div className="conditional">
                  <div
                   ref={childRef}
                   className="itemInformation"
                  >
                   <strong>Item Information: </strong>
                   {item.itemInformation}
                  </div>

                  <div className="itemType">
                   <strong>Item type: </strong>
                   <span>
                    {item.type.map((info, index) => (
                     <span> {(index ? ', ' : '') + info} </span>
                    ))}
                   </span>
                  </div>

                  <div className="info-source">
                   <strong>Information Source: </strong>
                   <br />
                   {item.informationSource}
                  </div>
                  <div className="image-source">
                   <strong>Image Source: </strong>
                   {item.imageSource}
                  </div>
                 </div>
                ) : null}
               </Box>
              </div>
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
           </>
          )}
         </Box>
        )}
       </Box>
      </Container>
     </Box>
    </Container>
   </Fade>
  </ThemeProvider>
 );
};
export default PlantGallery;
