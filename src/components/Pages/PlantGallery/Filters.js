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
 Typography,
} from '@mui/material';

import TuneIcon from '@mui/icons-material/Tune';

const categories = {
 softscape: [
  'Shrub',
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
  'Tree',
 ],
 hardscape: ['Pots', 'Lights', 'Fixtures', 'Stone', 'Pavers', 'Wood'],
};

const allSubcategories = Object.values(categories).flat();
categories.all = allSubcategories;

const Filters = ({ onFilterChange, isGuest }) => {
 const [anchorEl, setAnchorEl] = React.useState(null);
 const open = Boolean(anchorEl);
 const isAuthenticated = sessionStorage.getItem('authenticated');
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
   sx={{ alignItems: 'right', height: '50px' }}
  >
   <Button
    onClick={handleShowFilters}
    title="Filters"
    aria-controls={open ? 'basic-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    sx={{
     backgroundColor: 'white',
     mt: 1,
     float: 'right',
     ':hover': {
      color: 'white',
      borderColor: 'white',
     },
    }}
   >
    {/* Filters */}
    <TuneIcon sx={{ height: 30 }} />
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
     <Box sx={{ display: 'flex', flexDirection: 'column', width: '450px' }}>
      <FormControl sx={{ width: '100%' }}>
       <InputLabel id="categorys"> Category </InputLabel>
       <Select
        labelId="category-label"
        id="category-selector"
        value={selectedCategory}
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
        {isAuthenticated && (
         <MenuItem
          key="favorites"
          value="favorites"
         >
          Favorites
         </MenuItem>
        )}
       </Select>
      </FormControl>
     </Box>
    </MenuItem>
    <Box>
     <Box
      sx={{
       display: 'flex',
       flexDirection: 'column',
       maxWidth: '480px',
      }}
     >
      {selectedCategory !== 'all' ? (
       <Box sx={{ maxWidth: ' inherit' }}>
        {selectedFilters.length >= 1 && (
         <Box
          sx={{
           mb: 2,
           mt: 1,
           display: 'flex',
           flexDirection: 'column',
          }}
         >
          <Typography
           variant="h7"
           sx={{ ml: 1, color: 'primary.main' }}
          >
           Selected Filters:{' '}
          </Typography>
          <Box>
           {selectedFilters.map((filter, index) => (
            <Chip
             key={index}
             label={filter}
             onDelete={() => handleChipDelete(filter)}
             color="primary"
             variant="filed"
             sx={{
              m: 1,
              width: '30%',
             }}
            />
           ))}
          </Box>
         </Box>
        )}
        <Box
         sx={{
          justifyContent: 'space-between',
         }}
        >
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
            width: '30%',
            m: 1,
            backgroundColor: 'white',
            py: 0.5,
           }}
          />
         ))}
        </Box>
       </Box>
      ) : null}
     </Box>
    </Box>
   </Menu>
  </Box>
 );
};

export default Filters;
