import React, { useState, useEffect } from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import axios from 'axios';
const blankDesigns = [
 {
  src: '/Sample_blanks/blank1.jpg',
  source: 'Provided by client',
 },
 {
  src: '/Sample_blanks/blank7.JPG',
  source: 'Provided by client',
 },
 {
  src: '/Sample_blanks/blank8.JPG',
  source: 'Provided by client',
 },
 {
  src: '/Sample_blanks/blank3.jpg',
  source: 'https://www.facebook.com/Casteldinelandscapes/',
 },
 {
  src: '/Sample_blanks/blank4.jpg',
  source: 'https://www.facebook.com/Casteldinelandscapes/',
 },
 {
  src: '/Sample_blanks/blank2.jpg',
  source: 'Provided by client',
 },
];
const ExistingDesigns = ({ handleTemplate }) => {
 return (
  <Box sx={{ height: '400px', overflowY: 'scroll', width: '500px' }}>
   <ImageList
    gap={20}
    height={300}
    cols={1}
    sx={{ overflowY: 'auto' }}
   >
    {blankDesigns.map((item, index) => (
     <ImageListItem
      key={index}
      sx={{ cursor: 'pointer' }}
     >
      <img
       key={index}
       src={item.src}
       onClick={() => handleTemplate(item.src)}
      />
      <ImageListItemBar
       position="below"
       sx={{}}
       title={`image source: ` + item.source}
      />
     </ImageListItem>
    ))}
   </ImageList>
  </Box>
 );
};

export default ExistingDesigns;