import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
 Box,
 Typography,
 Container,
 Modal,
 Button,
 TextField,
 Grow,
 Alert,
} from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
// import { makeStyles } from '@mui/styles';
// import { SchemaTypeOptions } from 'mongoose';

const AdminGallery = () => {
 const [items, setItems] = useState('');
 const [page, setPage] = useState(1);
 const [selectedCategory, setSelectedCategory] = useState('all');
 const [selectedFilters, setSelectedFilters] = useState('');
 const [fetchingItems, setFetchingItems] = useState(false);
 const [error, setError] = useState(null);
 const [editing, setEditing] = useState(false);
 const [selectedItem, setSelectedItem] = useState('');
 const [itemIndex, setItemIndex] = useState('');
 const [isSaving, setIsSaving] = useState(false);
 const [itemId, setItemId] = useState('');
 const [isLoading, setIsLoading] = useState(true);

 const mainContainerRef = useRef(null);
 const totalPageRef = useRef(null);

 const [itemData, setItemData] = useState({
  itemName: '',
  scientificName: '',
  itemInformation: '',
  category: '',
  type: '',
  informationSource: '',
  imageSource: '',
  imageUrl: '',
 });

 const handleFormChange = (event) => {
  setItemData({
   ...itemData,
   [event.target.name]: event.target.value,
  });
 };

 //  const classes = useStyles();
 //  useEffect(() => {
 //   fetchGallery();
 //  }, []);

 useEffect(() => {
  fetchGallery();
 }, [page]);

 const fetchGallery = () => {
  try {
   axios
    .get(
     `https://halamanan-197e9734b120.herokuapp.com/gallery?page=${page}&limit=12&category=${selectedCategory}&type=${selectedFilters}`
    )

    .then((response) => {
     const fetchedItems = response.data.items;
     if (response.data.page < response.data.totalPages) {
      setItems((prevItems) => [...prevItems, ...fetchedItems]);
     }
     totalPageRef.current = response.data.totalPages;
     setFetchingItems(false);
     setIsLoading(false);
    })
    .catch((error) => {
     setError(error.message);
    });
  } catch {
   setError(error.message);
  }
 };

 const handleSelectedItem = (item, itemIndex) => {
  if (selectedItem === item) {
   setItemIndex('');
   setSelectedItem('');
   setItemId('');
  } else {
   setItemIndex(itemIndex);
   setSelectedItem(item);
   setItemData({
    itemName: item.itemName,
    scientificName: item.scientificName,
    itemInformation: item.itemInformation,
    category: item.category,
    type: item.type,
    informationSource: item.informationSource,
    imageSource: item.imageSource,
    imageUrl: item.imageUrl,
   });
   setItemId(item._id);
  }
 };

 const cancelEditing = (item) => {
  setSelectedItem(item);
  setEditing(false);
  setItemData({
   itemName: item.itemName,
   scientificName: item.scientificName,
   itemInformation: item.itemInformation,
   category: item.category,
   type: item.type,
   informationSource: item.informationSource,
   imageSource: item.imageSource,
   imageUrl: item.imageUrl,
  });
  setItemId(item._id);
 };

 const handleClose = () => {
  setItemIndex('');
  setSelectedItem('');
  setEditing(false);
 };

 const handleAlert = () => {
  setIsSaving(true);
  const timer = setTimeout(() => {
   setIsSaving(false);
  }, 3 * 1000);
 };

 const handleSaveChanges = () => {
  try {
   const response = axios.patch(
    `https://halamanan-197e9734b120.herokuapp.com/gallery/edit/${itemId}`,
    itemData
   );
   if (response) {
    setItems((items) =>
     items.map((item) =>
      item._id === itemId ? { ...item, ...itemData } : item
     )
    );
    handleAlert();
    setSelectedItem('');
    setEditing(false);
   }
  } catch (error) {
   //setError(error)
  }
 };

 const textStyle = {
  display: 'flex',
  alignItems: 'right',
  mb: 1,
 };
 const labelStyle = {
  color: 'orange',
  mr: 1,
  width: '150px',
  display: 'flex',
  justifyContent: 'right',
 };
 const textFieldStyle = {
  style: {
   color: 'white',
  },
 };
 const textFieldStyle2 = {
  bgcolor: editing ? null : 'white',
  borderRadius: 1,
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
 }, [fetchingItems, handleScroll]);

 return (
  <motion.div
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Container
    maxWidth="xl"
    disableGutters
    sx={{ p: 2 }}
   >
    <Typography variant="h5"> Gallery Items </Typography>
    <Grow in={!fetchingItems}>
     <Box
      ref={mainContainerRef}
      sx={{
       height: '85vh',
       display: 'flex',
       flexDirecion: 'column',
       flexWrap: 'wrap',
       overflowY: 'auto',
       justifyContent: 'space-evenly',
       mt: 2,
      }}
     >
      {items &&
       items.map((item, index) => (
        <>
         <Modal
          open={index === itemIndex}
          onClose={handleClose}
         >
          <Box
           sx={{
            width: '900px',
            height: '800px',
            position: 'absolute',
            overflowY: 'scroll',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'primary.main',

            borderRadius: 1,
           }}
          >
           {isSaving && (
            <Grow in={isSaving}>
             <Box
              sx={{
               width: '100%',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
              }}
             >
              <Alert
               onClose={() => setIsSaving(false)}
               sx={{
                bgcolor: 'primary.main',
                position: 'absolute',
                top: 10,

                zIndex: 99999,
               }}
              >
               Successfully edited item
              </Alert>
             </Box>
            </Grow>
           )}
           <Box
            sx={{
             bgcolor: 'rgba(255,255,255,0.2)',
             p: 4,
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'space-between',
             borderRadius: 1,
            }}
           >
            <Box
             sx={{
              display: 'flex',
              justifyContent: 'center',
             }}
            >
             <Box
              sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
              }}
             >
              {editing ? (
               //  <Box>hello</Box>
               <>
                <Button
                 onClick={() => cancelEditing(item)}
                 sx={{
                  bgcolor: editing ? 'red' : 'orange',
                  color: editing ? 'white' : 'primary.main',
                  mb: editing ? 1 : 2,
                  width: '200px',
                  ':hover': {
                   color: 'white',
                   bgcolor: 'rgba(255,255,255,0.2)',
                  },
                 }}
                >
                 <Typography>Cancel</Typography>
                </Button>

                <Button
                 onClick={() => handleSaveChanges()}
                 sx={{
                  bgcolor: 'orange',
                  width: '200px',
                  mb: 2,
                  ':hover': {
                   bgcolor: 'rgba(255,255,255,0.3)',
                   color: 'white',
                  },
                 }}
                >
                 {' '}
                 <Typography sx={{}}> Save Changes </Typography>
                </Button>
               </>
              ) : (
               <Button
                onClick={() => setEditing(!editing)}
                sx={{
                 bgcolor: 'orange',
                 width: '200px',
                 mb: 2,
                 ':hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                 },
                }}
               >
                <Typography>Edit Item</Typography>
               </Button>
              )}

              {/* <EditButton itemData={item} /> */}
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
            <Box sx={{ mt: 3 }}>
             <Box sx={textStyle}>
              <Typography sx={labelStyle}>Item Name:</Typography>
              <TextField
               name="itemName"
               value={itemData.itemName}
               onChange={handleFormChange}
               disabled={!editing}
               inputProps={textFieldStyle}
               sx={textFieldStyle2}
              />
             </Box>

             {item.scientificName && (
              <Box sx={textStyle}>
               <Typography sx={labelStyle}>Scientific Name:</Typography>
               <TextField
                name="scientificName"
                onChange={handleFormChange}
                disabled={!editing}
                value={itemData.scientificName}
                inputProps={textFieldStyle}
                sx={textFieldStyle2}
               />
               {/* <em>{item.scientificName}</em> */}
              </Box>
             )}
             <Box
              className="itemInformation"
              sx={textStyle}
             >
              <Typography sx={labelStyle}>Item Information:</Typography>
              <TextField
               name="itemInformation"
               onChange={handleFormChange}
               multiline
               rows={4}
               //  fullWidth
               disabled={!editing}
               value={itemData.itemInformation}
               inputProps={textFieldStyle}
               sx={{ ...textFieldStyle2, width: '600px' }}
              />
             </Box>
             <Box
              className="itemType"
              sx={textStyle}
             >
              <Typography sx={labelStyle}>Item type:</Typography>
              <TextField
               name="type"
               onChange={handleFormChange}
               disabled={!editing}
               value={itemData.type}
               inputProps={textFieldStyle}
               sx={textFieldStyle2}
               //  value={itemData.type.map((info, index) => (
               //   <span> {(index ? ', ' : '') + info} </span>
               //  ))}
              />
             </Box>
             <Box
              className="info-source"
              sx={textStyle}
             >
              <Typography sx={labelStyle}>Info Source:</Typography>
              <TextField
               name="informationSource"
               onChange={handleFormChange}
               //  fullWidth
               multiline
               rows={2}
               disabled={!editing}
               value={itemData.informationSource}
               sx={{ ...textFieldStyle2, width: '600px' }}
               inputProps={textFieldStyle}
              />
             </Box>
             <Box
              className="image-source"
              sx={textStyle}
             >
              <Typography sx={labelStyle}>Image Source:</Typography>
              <TextField
               name="imageSource"
               onChange={handleFormChange}
               multiline
               disabled={!editing}
               value={itemData.imageSource}
               inputProps={textFieldStyle}
               sx={{ ...textFieldStyle2, width: '600px' }}
              />
             </Box>
            </Box>
           </Box>
          </Box>
         </Modal>
         <Box
          key={index}
          onClick={() => handleSelectedItem(item, index)}
          sx={{
           width: '300px',
           height: 'auto',
           bgcolor: 'rgba(255,255,255,0.2)',
           p: 2,
           m: 1,
           borderRadius: 1,
           cursor: 'pointer',
           transition:
            'background-color ease-in-out 0.2s, color ease-in-out 0.2s',
           ':hover': {
            bgcolor: 'rgba(0,0,0,0.1)',
            bgcolor: 'orange',
            color: 'primary.main',
           },
          }}
         >
          <Box
           sx={{
            width: 'auto',
            height: '250px',
            bgcolor: 'white',
            p: 2,
            borderRadius: 1,
           }}
          >
           <img
            src={item.imageUrl}
            style={{
             objectFit: 'contain',
             height: '100%',
             width: '100%',
            }}
           />
          </Box>
          <Typography
           sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 1,
            fontSize: '22px',
           }}
          >
           {' '}
           {item.itemName}
          </Typography>
         </Box>
        </>
       ))}
     </Box>
    </Grow>
   </Container>
  </motion.div>
 );
};

export default AdminGallery;
