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
import html2canvas from 'html2canvas';
const UserDesigns = ({ handleSelectedDesign, renderAtHome }) => {
 const navigate = useNavigate();
 const { designs, dispatch } = useDesignContext();
 const [designName, setDesignName] = useState();
 const [error, setError] = useState();
 //  const [open, handleOpen]
 const [aspectRatio, setAspectRatio] = useState();
 const [show, setShow] = useState(false);
 useEffect(() => {
  const fetchDesigns = async () => {
   const response = await fetch(
    'https://halamanan-197e9734b120.herokuapp.com/designs',
    {
     headers: {
      'Content-Type': 'application/json',
      token: sessionStorage.getItem('token'),
     },
    }
   );

   try {
    if (response.ok) {
     const text = await response.text();
     const designs = text ? JSON.parse(text) : [];
     dispatch({ type: 'GET_DESIGNS', payload: designs });
     setShow(true);
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

  const designThumbnail = backgroundImage;

  try {
   const user_id = sessionStorage.getItem('token');
   const design = {
    designThumbnail,
    user_id,
    designName: `Design-${designs ? designs.length + 1 : 1}`,
    items: [],
    backgroundImage,
    aspectRatio,
   };
   const response = await fetch(
    `https://halamanan-197e9734b120.herokuapp.com/designs/create`,
    {
     method: 'POST',
     body: JSON.stringify(design),
     headers: {
      'Content-type': 'application/json',
     },
    }
   );
   console.log(response);
   if (!response.ok) {
    return;
   }

   const data = await response.json();
   navigate(`/designs/${data}`);
  } catch (error) {
   console.error(error);
   setError(error);
   setError(null);
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
        width: '80%%',
       }}
      >
       No designs yet
      </Box>
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
