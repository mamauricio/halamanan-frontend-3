import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Grid,
  Select,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const AddNewItemButton = () => {
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

    //console.log((event.target.name + ':' + event.target.value);
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageBase64 = reader.result;
      setItemData({ ...itemData, imageUrl: imageBase64 });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setItemData({
      itemName: '',
      scientificName: '',
      itemInformation: '',
      category: '',
      type: '',
      informationSource: '',
      imageSource: '',
      imageUrl: '',
    });
  };

  const handleEdit = async (event, itemData) => {
    event.preventDefault();
    //console.log((itemData);
    const item = {
      itemName: itemData.itemName,
      scientificName: itemData.scientificName,
      itemInformation: itemData.itemInformation,
      category: itemData.itemCategory,
      type: itemData.itemType,
      informationSource: itemData.informationSource,
      imageSource: itemData.imageSource,
      imageUrl: itemData.imageUrl,
    };
    const response = await fetch(
      `https://halamanan-197e9734b120.herokuapp.com/gallery/add-item`,
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          // 'Content-type': 'application/json',
        },
      }
    );

    setItemData({
      itemName: '',
      scientificName: '',
      itemInformation: '',
      category: '',
      type: '',
      informationSource: '',
      imageSource: '',
      imageUrl: '',
    });
  };

  return (
    <FormControl sx={{ backgroundColor: 'orange' }}>
      <form onSubmit={(event) => handleEdit(event, itemData)}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="itemName"
              label="Item Name"
              value={itemData.itemName}
              onChange={handleFormChange}
              fullWidth
              required
              sx={{ my: 1 }}
            />
            <TextField
              name="itemInformation"
              label="Item Description"
              multiline
              value={itemData.itemInformation}
              onChange={handleFormChange}
              fullWidth
              required
              sx={{ my: 1 }}
            />
            <TextField
              name="scientificName"
              label="Scientific Name"
              value={itemData.scientificName}
              onChange={handleFormChange}
              fullWidth
              sx={{ my: 1 }}
            />
            <FormControl fullWidth sx={{ color: 'primary.main' }}>
              <InputLabel id="itemCategoryLabel">Item Category</InputLabel>
              <Select
                name="itemCategory"
                labelId="itemCategoryLabel"
                value={itemData.category}
                label="Item Category"
                required
                onChange={handleFormChange}
                sx={{ my: 1 }}
              >
                <MenuItem value={itemData.category} disabled>
                  <em> Select Item Category</em>
                </MenuItem>
                <MenuItem value="Softscape">Softscape</MenuItem>
                <MenuItem value="Hardscape">Hardscape</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="type"
              label="Item Type"
              value={itemData.type}
              onChange={handleFormChange}
              required
              fullWidth
              sx={{ my: 1 }}
            />
            <TextField
              name="informationSource"
              label="Information Source"
              multiline
              value={itemData.informationSource}
              onChange={handleFormChange}
              fullWidth
              required
              sx={{ my: 1 }}
            />
            <TextField
              name="imageSource"
              label="Image Source"
              multiline
              value={itemData.imageSource}
              onChange={handleFormChange}
              fullWidth
              required
              sx={{ my: 1 }}
            />
          </Grid>
          <Grid item xs={6}>
            {' '}
            {itemData.imageUrl ? (
              <Box
                sx={{
                  width: '100%',
                  objectFit: 'contain',
                  overFlow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    objectFit: 'contain',
                    overFlow: 'hidden',
                    border: 'solid 1px',
                    borderColor: 'primary.main',
                    p: 1,
                  }}
                >
                  <img
                    src={itemData.imageUrl}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </Box>

                <Button
                  variant="contained"
                  onClick={handleButtonClick}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'orange',
                    width: '100%',
                    mt: 1,
                  }}
                >
                  Replace Image
                </Button>
                <input
                  name="image"
                  type="file"
                  id="fileInput"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </Box>
            ) : (
              <>
                <Button onClick={handleButtonClick}>
                  <Box
                    sx={{
                      color: 'orange',
                      fontSize: '50px',
                      backgroundColor: 'primary.main',
                      p: 3,
                      m: 2,
                      borderRadius: 2,
                      boxShadow: 10,
                      ':hover': { opacity: 0.9, marginBottom: 1 },
                    }}
                  >
                    <AddIcon fontSize="large" />

                    <Box sx={{ color: 'inherit' }}>Add Image</Box>
                  </Box>
                </Button>
                <input
                  type="file"
                  id="fileInput"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </>
            )}
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-evenly' }}>
          <Button
            onClick={handleReset}
            sx={{
              bgcolor: 'red',
              color: 'white',
              ':hover': {
                bgcolor: 'red',
                color: 'white',
                opacity: '0.5',
              },
            }}
          >
            Reset
          </Button>
          <Button type="submit" variant="contained" sx={{ color: 'orange' }}>
            Add to database
          </Button>
        </Box>
      </form>
    </FormControl>
  );
};

export default AddNewItemButton;
