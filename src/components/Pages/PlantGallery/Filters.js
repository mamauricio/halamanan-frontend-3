import React, { useState, useEffect } from 'react';
import {
 FormControl,
 Chip,
 MenuItem,
 InputLabel,
 Select,
 Button,
 Box,
 Menu,
} from '@mui/material';

const categories = {
 softscape: [
  'Shrub',
  'Tree',
  'Grass',
  'Flower',
  'Vegetative',
  'Ornamental',
  'Mulch',
  'Perennial',
  'Houseplant',
  'Palm',
  'Succulent',
  'Fern',
 ],
 hardscape: ['Pots', 'Lights', 'Fixtures', 'Stone', 'Pavers', 'Wood'],
};

const allSubcategories = Object.values(categories).flat();
categories.all = allSubcategories;

const Filters = ({ onFilterChange }) => {
 const [anchorEl, setAnchorEl] = React.useState(null);
 const open = Boolean(anchorEl);

 const [showFilter, setShowFilters] = useState(false);
 const [selectedFilters, setSelectedFilters] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState('all');
 const subCategories =
  selectedCategory !== 'favorites'
   ? categories[selectedCategory].filter(
      (filter) => !selectedFilters.includes(filter)
     )
   : [];

 const [isClicked, setClicked] = useState(false);

 useEffect(() => {
  onFilterChange(selectedFilters, selectedCategory);
 }, [selectedFilters, selectedCategory, onFilterChange]);

 const handleCategoryChange = (event) => {
  setSelectedCategory(event.target.value);
  setSelectedFilters([]);
  setShowFilters(false);
  //console.log((event.target.value);
 };

 const handleFilterChange = (event) => {
  const selectedFilter = event;
  setSelectedFilters((prevFilters) => {
   if (prevFilters.includes(selectedFilter)) {
    setClicked(!isClicked);
    return prevFilters.filter((filter) => filter !== selectedFilter);
   } else {
    return [...prevFilters, selectedFilter];
   }
  });
 };

 const handleChipDelete = (filter) => {
  setSelectedFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
 };

 const handleShowFilters = (event) => {
  setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
  setAnchorEl(null);
 };

 return (
  <Box
   className="categories-filters"
   sx={{ display: 'flex', flexWrap: 'true' }}
  >
   <Button
    onClick={handleShowFilters}
    aria-controls={open ? 'basic-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    sx={{
     backgroundColor: 'white',
     ':hover': {
      border: 'solid',
      borderWidth: 1,
      color: 'white',
      borderColor: 'white',
     },
    }}
   >
    Filters
   </Button>
   <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    MenuListProps={{
     'aria-labelledby': 'basic-button',
    }}
   >
    <MenuItem>
     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControl sx={{ width: '300px' }}>
       <InputLabel id="categorys"> Category </InputLabel>
       <Select
        labelId="category-label"
        id="category-selector"
        value={selectedCategory}
        // defaultValue={'all'}
        label={selectedCategory}
        onChange={handleCategoryChange}
       >
        <MenuItem
         key="all"
         value="all"
        >
         All
        </MenuItem>
        <MenuItem
         key="softscape"
         value="softscape"
        >
         Softscape
        </MenuItem>
        <MenuItem
         key="hardscape"
         value="hardscape"
        >
         Hardscape
        </MenuItem>
        <MenuItem
         key="favorites"
         value="favorites"
        >
         Favorites
        </MenuItem>
       </Select>
      </FormControl>
     </Box>
    </MenuItem>
    <Box>
     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {selectedCategory !== 'all' ? (
       <>
        {selectedFilters.map((filter, index) => (
         <Chip
          key={index}
          label={filter}
          onDelete={() => handleChipDelete(filter)}
          color="primary"
          variant="outlined"
          sx={{
           backgroundColor: 'white',
           width: 'fullWidth',
          }}
         />
        ))}

        {subCategories?.map((filter, index) => (
         <Chip
          key={index}
          label={filter}
          value={filter}
          onClick={() => {
           handleFilterChange(filter);
          }}
          variant="outlined"
          sx={{
           backgroundColor: 'white',
           py: 0.5,
          }}
         />
        ))}
       </>
      ) : null}
     </Box>
    </Box>
   </Menu>
  </Box>
 );
};

export default Filters;
