import React, { useState } from 'react';
import {
  Box,
  Modal,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Grid,
  Select,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
const EditButton = ({ newItemData }) => {
  const [itemData, setItemData] = useState(newItemData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFormChange = (event) => {
    setItemData({
      ...itemData,
      [event.target.name]: event.target.value,
    });
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
      setItemData({ ...itemData, newItemUrl: imageBase64 });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (event, itemData) => {
    event.preventDefault();
    const item = {
      itemName: itemData.newItemName,
      scientificName: itemData.newItemScientificName,
      itemInformation: itemData.newItemDescription,
      category: itemData.newItemCategory,
      type: itemData.newItemType,
      informationSource: 'User',
      imageSource: 'User',
      imageUrl: itemData.newItemUrl,
    };
    const response = await fetch(
      `https://halamanan-197e9734b120.herokuapp.com/gallery/add-item`,
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-type': 'application/json',
        },
      }
    );

    const deleteResponse = await axios.delete(
      `https://halamanan-197e9734b120.herokuapp.com/admin/pending/`,
      {
        params: {
          id: itemData._id,
        },
      }
    );
    handleClose();
  };
  return (
    <Box>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'orange',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            borderRadius: 2,
            boxShadow: 10,
          }}
        >
          <FormControl>
            <form onSubmit={(event) => handleEdit(event, itemData)}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="newItemName"
                    label="Item Name"
                    value={itemData.newItemName}
                    onChange={handleFormChange}
                    fullWidth
                    required
                    sx={{ my: 1 }}
                  />
                  <TextField
                    name="newItemDescription"
                    label="Item Description"
                    multiline
                    // rows={2}
                    value={itemData.newItemDescription}
                    onChange={handleFormChange}
                    fullWidth
                    required
                    sx={{ my: 1 }}
                  />
                  <TextField
                    name="newItemScientificName"
                    label="Scientific Name"
                    value={itemData.newItemScientificName}
                    onChange={handleFormChange}
                    fullWidth
                    sx={{ my: 1 }}
                  />
                  <FormControl fullWidth sx={{ color: 'primary.main' }}>
                    <InputLabel id="itemCategoryLabel">
                      Item Category
                    </InputLabel>
                    <Select
                      name="newItemCategory"
                      labelId="itemCategoryLabel"
                      value={itemData.newItemCategory}
                      label="Item Category"
                      required
                      onChange={handleFormChange}
                      sx={{ my: 1 }}
                    >
                      <MenuItem value="" disabled>
                        <em> Select Item Category</em>
                      </MenuItem>
                      <MenuItem value="softscape">Softscape</MenuItem>
                      <MenuItem value="hardscape">Hardscape</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    name="newItemType"
                    label="Item Type"
                    value={itemData.newItemType}
                    onChange={handleFormChange}
                    required
                    fullWidth
                    sx={{ my: 1 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  {' '}
                  {itemData.newItemUrl ? (
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
                          src={itemData.newItemUrl}
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
              <Box
                sx={{ mt: 2, display: 'flex', justifyContent: 'space-evenly' }}
              >
                <Button
                  onClick={handleClose}
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
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ color: 'orange' }}
                >
                  Add to database
                </Button>
              </Box>
            </form>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditButton;
