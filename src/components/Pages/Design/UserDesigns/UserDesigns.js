import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grow from '@mui/material/Grow';
import CreateNewDesignButton from '../MainDesign/Buttons/CreateNewDesignButton';
import './UserDesigns.css';
import { useDesignContext } from '../../../hooks/useDesignContext';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';

const UserDesigns = ({ handleSelectedDesign, renderAtHome }) => {
 const navigate = useNavigate();
 const { designs, dispatch } = useDesignContext();
 const [error, setError] = useState();
 const [color, setColor] = useState('#ECAB00');
 const [fetching, setFetching] = useState(true);
 const [aspectRatio, setAspectRatio] = useState();
 const [show, setShow] = useState(false);
 useEffect(() => {
  const fetchDesigns = async () => {
   const response = await fetch('http://localhost:3001/designs', {
    headers: {
     'Content-Type': 'application/json',
     token: sessionStorage.getItem('token'),
    },
   });

   try {
    if (response.ok) {
     const text = await response.text();
     const designs = text ? JSON.parse(text) : [];
     dispatch({ type: 'GET_DESIGNS', payload: designs });
     setShow(true);
     setFetching(false);
    }
   } catch (error) {
    console.error('Error fetching designs:', error);
   }
  };

  fetchDesigns();
 }, []);

 const imageListItemStyle = {
  backgroundColor: 'white',
  borderRadius: 2,
  p: 1,
  mb: 1,
  cursor: 'pointer',
 };

 const renderAtHomeStyle = {
  cursor: 'cursor',
  backgroundColor: 'white',
  borderRadius: 2,
  p: 1,
  mb: 1,
 };

 const handleClick = (design) => {
  handleSelectedDesign(design);
 };

 const handleCreateNewDesign = async () => {
  const backgroundImage = localStorage.getItem('backgroundImage');

  const image = new Image();
  image.src = backgroundImage;
  image.onload = () => {
   const aspectRatio = image.width / image.height;
   setAspectRatio(aspectRatio);
  };

  try {
   const user_id = sessionStorage.getItem('token').toString();

   const response = await axios
    .post('http://localhost:3001/designs/create', {
     designThumbnail: backgroundImage,
     user_id: user_id,
     designName: `Design-${user_id + (designs ? designs.length + 1 : 1)}`,
     items: [],
     backgroundImage,
    })
    .then((response) => {
     const timer = setTimeout(() => {
      navigate(`/designs/${response.data}`);
     }, 500);
     console.log('Response:', response.data);
    })
    .catch(function (error) {
     console.error('Error:', error);
    });
  } catch (error) {
   setError(error.message);
  }
 };

 return (
  <Container
   maxWidth={'xl'}
   disableGutters={true}
  >
   <Box
    sx={{
     backgroundColor: 'primary.main',
     height: '84vh',
     borderRadius: 2,
     m: 2,
     boxShadow: 10,
     maxWidth: '40vw',
    }}
   >
    <Box
     sx={{
      fontSize: 30,
      textAlign: 'center',
      pt: 2,
      height: '5%',
      color: 'orange',
     }}
    >
     Designs
    </Box>

    <Box
     className="designsContainer"
     sx={{
      m: 1,
      pb: 2,
      height: '70%',
     }}
    >
     {fetching === true ? (
      <Box
       sx={{
        display: 'flex',
        mt: 10,
        top: '50%',
        flexDirection: 'column',
        alignItems: 'center',
       }}
      >
       <Box
        sx={{
         color: '#ECAB00',
         fontSize: '30px',
         mb: 2,
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
        }}
       >
        Fetching Designs
       </Box>
       {/* <br /> */}
       <FadeLoader
        color={color}
        loading={fetching}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
       />
      </Box>
     ) : (
      <>
       {designs && designs.length !== 0 ? (
        <ImageList
         cols={1}
         gap={5}
         rowHeight={200}
         sx={{ mt: 2, height: '100%' }}
        >
         {designs.map((design, index) => (
          <Grow
           in={show}
           key={index}
          >
           <ImageListItem
            className="image"
            key={index}
            onClick={() => handleClick(design)}
            sx={renderAtHome ? renderAtHomeStyle : imageListItemStyle}
           >
            <img
             src={design.designThumbnail}
             alt={design.designName}
             loading="lazy"
             style={{
              boxSizing: 'border-box',
              height: '100%',
             }}
            />
            <ImageListItemBar
             title={design.designName}
             position="bottom"
             sx={{
              borderBottomRightRadius: 2,
              borderBottomLeftRadius: 2,
             }}
            />
           </ImageListItem>
          </Grow>
         ))}
        </ImageList>
       ) : (
        <Box
         sx={{
          color: 'white',
          textAlign: 'center',
          justifyContent: 'center',
          fontSize: '25px',
          borderRadius: 1,
          p: 1,
          position: 'relative',
          width: '80%',
         }}
        >
         No designs yet
        </Box>
       )}
      </>
     )}

     <Box
      sx={{
       display: 'flex',
       mt: 3,
       justifyContent: 'center',
       alignContent: 'center',
      }}
     >
      <CreateNewDesignButton handleCreateNewDesign={handleCreateNewDesign} />
     </Box>
    </Box>
   </Box>
  </Container>
 );
};

export default UserDesigns;
