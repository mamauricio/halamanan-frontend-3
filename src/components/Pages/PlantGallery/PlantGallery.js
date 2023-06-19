import { React, useState, useEffect, useRef } from 'react';
import {
 Box,
 Container,
 useTheme,
 ThemeProvider,
 Grow,
 Alert,
} from '@mui/material/';
import Filters from './Filters';
import './PlantGallery.css';
import axios from 'axios';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import AddNewItemButton from './AddNewItemButton';

const PlantGallery = () => {
 const theme = useTheme();
 const [showAlert, setShowAlert] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
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

 const [items, setItems] = useState([]);
 const [error, setError] = useState([]);
 const [favorites, setFavorites] = useState([]);
 const [activeItem, setActiveItem] = useState(null);
 const [selectedFilters, setSelectedFilters] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState([]);
 const childRef = useRef(null);

 useEffect(() => {
  fetchGalleryItems();

  fetchUserFavorites();
 }, []);

 const fetchGalleryItems = () => {
  axios
   .get('https://halamanan-197e9734b120.herokuapp.com/gallery')
   .then((response) => {
    const fetchedItems = response.data;
    setItems(fetchedItems);
   })
   .catch((error) => {
    //console.log(('Error fetching items: ', error.message);
    setError(error.message);
   });
 };

 const fetchUserFavorites = async () => {
  try {
   const token = sessionStorage.getItem('token');
   const response = await fetch(
    'https://halamanan-197e9734b120.herokuapp.com/favorites',
    {
     headers: {
      token: token,
     },
    }
   );

   const data = await response.json();
   setFavorites(data);
   //console.log((favorites);
  } catch (error) {
   //console.log(('Error fetching user favorites:', error);
   setError(error.message);
  }
 };

 const isItemInFavorites = (itemId) => {
  return favorites.some((favorite) => favorite.itemId === itemId);
 };

 const filteredItems = items.filter((item) => {
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

  if (selectedFilters.length > 0 && !selectedFilters.includes(item.type)) {
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
   //console.log((response);

   if (response.ok) {
    const updated = [...favorites, { itemId }];
    setFavorites(updated);
    setAlertMessage('Successfully added item to favorites');
    openAlert();
    closeAlert();
   } else {
    //console.log(('Error adding item to favorites');
   }
  } catch (error) {
   //console.log(('Error adding item to favorites:', error);
  }
  //console.log(('adding to favorites: ' + itemId);
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
    const updated = favorites.filter((favorite) => favorite.itemId !== itemId);
    setFavorites(updated);
    setAlertMessage('Successfully removed item from favorites');
    openAlert();
    closeAlert();
   }
   //console.log((response);
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
  // setShowAlert(true);
  setAlertMessage('Successfully Added Iten');
  openAlert();
  closeAlert();
  // <CustomAlert showAlert={true} closeAlert/>
 };

 const CustomAlert = ({ showAlert, closeAlert }) => {
  return (
   <Grow in={showAlert}>
    <Alert
     onClose={closeAlert}
     sx={{ color: 'primary.main', backgroundColor: 'orange' }}
    >
     {alertMessage}
    </Alert>
   </Grow>
  );
 };

 return (
  <ThemeProvider theme={theme}>
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
     `
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
        color: 'orange',
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
        overflowY: 'auto',
        borderRadius: 2,
        scrollbarColor: 'primary.main',
        boxShadow: 2,
       }}
      >
       <Box
        className="object-display"
        display="flex"
        flexWrap="wrap"
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
          {filteredItems.map((item, index) => (
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
              <Box
               className={
                index === activeItem
                 ? 'imageContainer active'
                 : 'imageContainer'
               }
              >
               {isItemInFavorites(item._id) ? (
                <Button
                 sx={{
                  top: 7,
                  left: '-40%',
                  width: '10px',
                  height: '20px',
                 }}
                 onClick={(event) => {
                  removeFromFavorites(event, item._id);
                 }}
                >
                 {' '}
                 <StarIcon />
                </Button>
               ) : (
                <Button
                 sx={{
                  top: 7,
                  left: '-40%',
                  width: '10px',
                  height: '20px',
                  zIndex: 1,
                 }}
                 onClick={(event) => {
                  addToFavorites(event, item._id);
                 }}
                >
                 <StarBorderIcon />
                </Button>
               )}

               <img src={item.imageUrl} />
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
         </>
        )}
       </Box>
      </Box>
     </Container>
    </Box>
   </Container>
  </ThemeProvider>
 );
};
export default PlantGallery;
