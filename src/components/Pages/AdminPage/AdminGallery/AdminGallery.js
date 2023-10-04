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
import { FadeLoader } from 'react-spinners';

const AdminGallery = () => {
 const [items, setItems] = useState('');
 const [initialRender, setInitialRender] = useState(false);
 const [page, setPage] = useState(1);
 const [selectedCategory, setSelectedCategory] = useState('all');
 const [selectedFilters, setSelectedFilters] = useState('');
 const [fetchingItems, setFetchingItems] = useState(true);
 const [error, setError] = useState(null);
 const [editing, setEditing] = useState(false);
 const [selectedItem, setSelectedItem] = useState('');
 const [itemIndex, setItemIndex] = useState('');
 const [isSaving, setIsSaving] = useState(false);
 const [itemId, setItemId] = useState('');
 const [isLoading, setIsLoading] = useState(true);
 const [openDeleteModal, setOpenDeleteModal] = useState(false);
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
 const mainContainerRef = useRef(null);
 const totalPageRef = useRef(null);
 let color = '#ECAB00';

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
     setInitialRender(false);
     setIsLoading(false);
    })
    .catch((error) => {
     setError(error.message);
    });
  } catch {
   setError(error.message);
  }
 };

 const handleFormChange = (event) => {
  setItemData({
   ...itemData,
   [event.target.name]: event.target.value,
  });
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

 const handleDelete = async (item) => {
  const itemId = item._id;
  try {
   const deleteResponse = await axios
    .delete(`https://halamanan-197e9734b120.herokuapp.com/admin/gallery`, {
     params: {
      id: itemId,
     },
    })
    .then((deleteResponse) => {
     setItems((items) => items.filter((item) => item._id !== itemId));
     setSelectedItem('');
     setItemIndex('');
     setOpenDeleteModal(false);
    });
  } catch (error) {}
 };

 const handleScroll = useCallback(() => {
  const mainContainer = mainContainerRef.current;

  if (
   mainContainer.scrollTop + mainContainer.clientHeight >=
   mainContainer.scrollHeight - 100
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

 const handleOpenDeleteModal = () => {
  setOpenDeleteModal(true);
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
    <Box>
     <Typography variant="h5"> Gallery Items </Typography>
    </Box>
    <Grow in={!initialRender}>
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
      {items && (
       <>
        {items.map((item, index) => (
         <Box key={index}>
          <Modal
           open={index === itemIndex}
           onClose={handleClose}
          >
           <Box
            sx={{
             width: '900px',
             height: '800px',
             position: 'absolute',
             overflowY: 'auto',
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
                <Box
                 sx={{
                  display: 'flex',
                  flexDirection: 'row',
                 }}
                >
                 <Button
                  onClick={() => cancelEditing(item)}
                  sx={{
                   bgcolor: editing ? 'red' : 'orange',
                   color: editing ? 'white' : 'primary.main',
                   mb: 1,
                   mr: 2,
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
                   mb: 1,
                   ':hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                   },
                  }}
                 >
                  {' '}
                  <Typography sx={{}}> Save Changes </Typography>
                 </Button>
                </Box>
               ) : (
                <Box sx={{ mb: 2 }}>
                 <Modal
                  open={openDeleteModal}
                  onClose={() => setOpenDeleteModal(false)}
                 >
                  <Box
                   sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                   }}
                  >
                   <Box
                    sx={{
                     bgcolor: 'rgba(255,255,255,0.2)',
                     height: '100px',

                     borderRadius: 1,

                     px: 2,
                     pt: 1,
                    }}
                   >
                    <Typography variant="h6">
                     {' '}
                     Are you sure you want to delete {item.itemName}
                    </Typography>
                    <Box
                     sx={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      mt: 1,
                     }}
                    >
                     <Button
                      onClick={() => {
                       handleDelete(item);
                      }}
                      sx={{ bgcolor: 'red', width: '100px' }}
                     >
                      Yes
                     </Button>
                     <Button
                      onClick={() => setOpenDeleteModal(false)}
                      sx={{ width: '100px', bgcolor: 'orange' }}
                     >
                      No
                     </Button>
                    </Box>
                   </Box>
                  </Box>
                 </Modal>
                 <Button
                  onClick={handleOpenDeleteModal}
                  sx={{
                   bgcolor: 'rgba(255,0,0,0.8)',
                   color: 'white',
                   width: '200px',
                   mr: 2,
                  }}
                 >
                  <Typography> Delete Item</Typography>
                 </Button>

                 <Button
                  onClick={() => setEditing(!editing)}
                  sx={{
                   bgcolor: 'orange',
                   width: '200px',
                   ':hover': {
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                   },
                  }}
                 >
                  <Typography>Edit Item</Typography>
                 </Button>
                </Box>
               )}

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

               {!editing ? (
                <Typography>{itemData.itemName}</Typography>
               ) : (
                <TextField
                 name="itemName"
                 value={itemData.itemName}
                 onChange={handleFormChange}
                 disabled={!editing}
                 inputProps={textFieldStyle}
                 sx={textFieldStyle2}
                />
               )}
              </Box>

              {item.scientificName && (
               <Box sx={textStyle}>
                <Typography sx={labelStyle}>Scientific Name:</Typography>
                {!editing ? (
                 <Typography>{itemData.scientificName}</Typography>
                ) : (
                 <TextField
                  name="scientificName"
                  onChange={handleFormChange}
                  disabled={!editing}
                  value={itemData.scientificName}
                  inputProps={textFieldStyle}
                  sx={textFieldStyle2}
                 />
                )}
               </Box>
              )}
              <Box
               className="itemInformation"
               sx={textStyle}
              >
               <Typography sx={labelStyle}>Item Information:</Typography>
               {!editing ? (
                <Typography sx={{ maxWidth: '650px', wordBreak: 'break-word' }}>
                 {itemData.itemInformation}
                </Typography>
               ) : (
                <TextField
                 name="itemInformation"
                 onChange={handleFormChange}
                 multiline
                 rows={4}
                 disabled={!editing}
                 value={itemData.itemInformation}
                 inputProps={textFieldStyle}
                 sx={{ ...textFieldStyle2, width: '600px' }}
                />
               )}
              </Box>
              <Box
               className="itemType"
               sx={textStyle}
              >
               <Typography sx={labelStyle}>Item type:</Typography>
               {!editing ? (
                <Typography>{itemData.type}</Typography>
               ) : (
                <TextField
                 name="type"
                 onChange={handleFormChange}
                 disabled={!editing}
                 value={itemData.type}
                 inputProps={textFieldStyle}
                 sx={textFieldStyle2}
                />
               )}
              </Box>
              <Box
               className="info-source"
               sx={textStyle}
              >
               <Typography sx={labelStyle}>Info Source:</Typography>
               {!editing ? (
                <Typography sx={{ maxWidth: '650px', wordBreak: 'break-word' }}>
                 {' '}
                 {itemData.informationSource}{' '}
                </Typography>
               ) : (
                <TextField
                 name="informationSource"
                 onChange={handleFormChange}
                 multiline
                 rows={2}
                 disabled={!editing}
                 value={itemData.informationSource}
                 sx={{ ...textFieldStyle2, width: '600px' }}
                 inputProps={textFieldStyle}
                />
               )}
              </Box>
              <Box
               className="image-source"
               sx={textStyle}
              >
               <Typography sx={labelStyle}>Image Source:</Typography>
               {!editing ? (
                <Typography sx={{ maxWidth: '650px', wordBreak: 'break-word' }}>
                 {itemData.imageSource}
                </Typography>
               ) : (
                <TextField
                 name="imageSource"
                 onChange={handleFormChange}
                 multiline
                 disabled={!editing}
                 value={itemData.imageSource}
                 inputProps={textFieldStyle}
                 sx={{ ...textFieldStyle2, width: '600px' }}
                />
               )}
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
             bgcolor: 'rgba(255,255,255,0.1)',
             color: 'rgba(255,255,255,0.9)',
             helperText: 'hello',
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
         </Box>
        ))}
        {fetchingItems && (
         <Box>
          {' '}
          <Typography>Fetching Item</Typography>
          <FadeLoader
           color={color}
           loading={fetchingItems}
           size={200}
           aria-label="Loading Spinner"
           data-testid="loader"
          />
         </Box>
        )}
       </>
      )}
     </Box>
    </Grow>
   </Container>
  </motion.div>
 );
};

export default AdminGallery;
