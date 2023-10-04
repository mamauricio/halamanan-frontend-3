import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Grow from '@mui/material/Grow';
import CreateNewDesignButton from '../../MainDesign/Buttons/CreateNewDesignButton';
import { useDesignContext } from '../../../../hooks/useDesignContext';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';
import DesignThumbnail from './DesignThumbnail';

const UserDesigns = ({ handleSelectedDesign }) => {
 const navigate = useNavigate();
 const { designs, dispatch } = useDesignContext();
 const [error, setError] = useState();
 let color = '#ECAB00';
 const [fetching, setFetching] = useState(true);
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
     setFetching(false);
    }
   } catch (error) {
    console.error('Error fetching designs:', error);
   }
  };

  fetchDesigns();
 }, []);

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
    .post('https://halamanan-197e9734b120.herokuapp.com/designs/create', {
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
     height: '84vh',
     borderRadius: 2,
     maxWidth: '40vw',
    }}
   >
    <Box
     className="designsContainer"
     sx={{
      pt: 1,
      pb: 2,
      height: '80%',
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
       <CreateNewDesignButton handleCreateNewDesign={handleCreateNewDesign} />
       {designs && designs.length !== 0 ? (
        <Grow in={show}>
         <Box
          sx={{
           height: '75vh',
           display: 'flex',
           flexDirection: 'column',
           justifyContent: 'center',
           borderRadius: 1,
           alignItems: 'center',
          }}
         >
          <Box sx={{ height: '100%', overflowY: 'auto', mt: 2 }}>
           {designs.map((design, index) => (
            <DesignThumbnail
             design={design}
             index={index}
             handleClick={handleClick}
            />
           ))}
          </Box>
         </Box>
        </Grow>
       ) : (
        <Box
         sx={{
          height: ' 100%',
          display: 'flex',
          justifyContent: 'center',
          mt: 3,
         }}
        >
         <Box
          sx={{
           height: '220px',
           width: '300px',
           bgcolor: 'rgba(0,0,0,0.1)',
           bgcolor: 'rgba(255,255,255,0.1)',

           p: 5,
           borderRadius: 1,
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
          }}
         >
          <Typography
           variant="h5"
           sx={{ color: 'rgba(255,255,255,0.7)' }}
          >
           No designs yet
          </Typography>
         </Box>
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
     ></Box>
    </Box>
   </Box>
  </Container>
 );
};

export default UserDesigns;
