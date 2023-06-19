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

const UserDesigns = ({ handleSelectedDesign }) => {
  const navigate = useNavigate();
  const { designs, dispatch } = useDesignContext();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fetchDesigns = async () => {
      const response = await fetch(
        `https://halamanan-197e9734b120.herokuapp.com/designs`,
        {
          headers: {
            // 'content-type': 'text/json',
            token: `${sessionStorage.getItem('token')}`,
          },
        }
      );

      try {
        if (response.ok) {
          const designs = await response.json();
          // console.log('designs:' + designs);
          dispatch({ type: 'GET_DESIGNS', payload: designs });
          setShow(true);
        }
        // console.log(designs);
      } catch (error) {
        console.error('Error fetching designs:', error);
      }
    };

    fetchDesigns();
  }, []);

  const handleClick = (design) => {
    handleSelectedDesign(design);
  };

  const handleCreateNewDesign = async ({ designName }) => {
    navigate(`/designs/create`, {
      state: {
        backgroundImage: localStorage.getItem('backgroundImage'),
        showDesign: true,
        designName: designName,
      },
    });
  };

  //console.log((designs);

  return (
    <Container maxWidth={'xl'} disableGutters={true}>
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
                <Grow in={show} key={index}>
                  <ImageListItem
                    className="image"
                    key={index}
                    onClick={() => handleClick(design)}
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: 2,
                      p: 1,
                      mb: 1,
                      cursor: 'pointer',
                      ':hover': { opacity: 0.8 },
                    }}
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
            <CreateNewDesignButton
              handleCreateNewDesign={handleCreateNewDesign}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UserDesigns;
