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
  src: '/Sample_blanks/blank8.jpg',
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
  <Box
   sx={{
    height: '450px',
    width: '600px',

    borderTop: 'solid 1px',
    borderBottom: 'solid 1px',
    borderColor: 'primary.main',
    // borderRadius: 1,
    p: 1,
    m: 1,
   }}
  >
   <Box sx={{ overflowY: 'scroll', height: 'inherit' }}>
    <ImageList
     gap={20}
     height={350}
     cols={1}
     // sx={{ m: 1 }}
    >
     {blankDesigns.map((item, index) => (
      <ImageListItem
       key={index}
       sx={{
        cursor: 'pointer',
        bgcolor: 'rgba(255,255,255,0.3)',
        p: 2,
        borderRadius: 1,
        mr: 1,
       }}
      >
       <img
        key={index}
        src={item.src}
        onClick={() => handleTemplate(item.src)}
        style={{
         height: '350px',
         width: 'auto',
         objectFit: 'contain',
        }}
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
  </Box>
 );
};

export default ExistingDesigns;
