import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
const images = [
 {
  name: 'Xeriscape',
  description: `Xeriscapes are water-conserving landscaping designs using drought-tolerant plants and efficient irrigation systems. They prioritize water conservation and reduce the need for excessive watering. By incorporating native or adapted plants, xeriscapes require minimal additional watering once established. They employ strategies like mulching, grouping plants with similar water needs, and using drip irrigation to conserve water. Xeriscapes offer visually appealing and low-maintenance landscapes that benefit the environment by reducing water usage and supporting local biodiversity.`,
  informationSource:
   'https://education.nationalgeographic.org/resource/xeriscaping/',
  imageSource: 'https://education.nationalgeographic.org/resource/xeriscaping/',
  imgUrl: '/Sample_landscapes/Xeriscape2.jpg',
 },

 {
  name: 'Tropical Landscaping',
  description:
   'Tropical landscaping is a captivating and vibrant approach to garden design, characterized by lush foliage, exotic plants, and a harmonious blend of colors and textures. Drawing inspiration from the tropical regions, this style embraces the beauty of the natural environment, incorporating elements such as water features, indigenous materials, and striking architectural accents. With a focus on sustainability, tropical landscaping promotes eco-friendly practices, harnessing the abundance of the tropical climate to create lush and thriving gardens. From palm trees and vibrant flowering plants to cascading waterfalls and meandering pathways, tropical landscaping invites you into a lush paradise where you can escape and immerse yourself in the beauty and serenity of the tropics.',
  informationSource: `Reyes, E., & O'Boyle, L. G. (2012). Tropical Gardens of the Philippines. City, Tuttle Publishing.`,
  imageSource:
   'https://www.hgtv.com/outdoors/landscaping-and-hardscaping/design/tropical-landscaping-design-ideas',
  imgUrl: '/Sample_landscapes/tropicalLandscaping.jpeg',
 },
 {
  name: 'Butterfly Garden',
  description:
   'Butterfly landscaping is a captivating garden design that attracts and supports butterflies by incorporating nectar-rich flowers, host plants for caterpillars, and essential features like water sources and resting areas. It creates a beautiful and nurturing environment for butterflies throughout their life cycles, contributing to their conservation and providing a delightful spectacle of fluttering wings in the garden.',
  infromationSource: 'https://gardencenterohio.com/butterfly-garden/',
  imageSource:
   'https://www.twulasso.com/butterfly-garden-dedicated-to-enthusiast-and-professor-jeff-robb/',
  imgUrl: '/Sample_landscapes/butterfly.jpg',
 },
 {
  name: 'Client Project',
  description:
   'This is one of the project sites of the client based in New Jersey, USA',
  informationSource: 'client',
  imageSource:
   'https://www.provenwinners.com/plants/thuja/north-pole-arborvitae-thuja-occidentalis',
  imgUrl: '/Sample_landscapes/NJProj2.JPG',
 },
];

const styles = {
 color: 'primary.main',
 m: 1,
 '&::first-letter': {
  fontWeight: 'bold',
 },
};

const GardenCarousel = () => {
 const sample_landscapes = images;
 return (
  <Container
   disableGutters={true}
   sx={{
    height: '100%',
    bgcolor: 'black',
    backgroundColor: 'background.default',

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
   }}
  >
   <Carousel
    autoPlay={true}
    showThumbs={false}
    showIndicators={false}
    infiniteLoop={true}
    interval={7000}
    dynamicHeight={false}
   >
    {sample_landscapes.map((landscape, index) => (
     <Box
      key={index}
      sx={{
       display: 'flex',
       mt: 2,
       mx: 1,
       height: '580px',
       backgroundColor: 'primary.main',
       alignItems: 'center',
       justifyContent: 'center',

       borderRadius: 2,
      }}
     >
      <Box
       className="image-container"
       sx={{ width: '60%', bgcolor: 'yellow', m: 1 }}
      >
       <img
        alt={landscape.name}
        loading="lazy"
        src={landscape.imgUrl}
        // alt="Image 1"
        style={{ width: '100%' }}
       />
      </Box>
      <Box
       className="info-container"
       sx={{
        width: '40%',
        height: '100%',
        mr: 1,
        py: 1,
       }}
      >
       <Box
        className="inline-text"
        sx={{
         overflow: 'auto',
         fontSize: '15px',
         height: '100%',
         p: 5,
         bgcolor: 'orange',
         color: 'primary.main',
         borderRadius: 2,
         justifyContent: 'top',
         overflowWrap: 'break-word',
         wordBreak: 'break-word',
         hyphens: 'auto',
        }}
       >
        <Box sx={styles}>{landscape.name}</Box>

        <Box sx={styles}>Description: {landscape.description}</Box>
        <Box sx={styles}>Information source: {landscape.informationSource}</Box>
        <Box sx={styles}>Image source: {landscape.imageSource}</Box>
       </Box>
      </Box>
     </Box>
    ))}
   </Carousel>
  </Container>
 );
};

export default GardenCarousel;
