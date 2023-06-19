import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const AboutPage = () => {
  const boxStyle = {
    display: 'flex',
    color: 'orange',
    fontSize: '20px',
    p: 2,
  };

  return (
    <Container
      sx={{
        p: 5,
        mt: 2,
        backgroundColor: 'primary.main',
        color: 'orange',
        borderRadius: 2,
        height: '90vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'orange',
        }}
      >
        <h1>Halamanan</h1>
      </Box>
      <Box
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          borderRadius: 2,
          overflowY: 'auto',
        }}
      >
        <Box>
          <Box sx={{ fontSize: '25px' }}>Description</Box>
          <Box sx={{ fontSize: '25px' }}>
            This Web Application aims to help homeowners visualize their
            landscape designs. With an initial database composed of common
            plants from different categories (trees, shrubs, flowers,
            groundcover, etc.) that could be found in the Philippines and the
            US, users have a wide selection of materials.{' '}
          </Box>
        </Box>
        <Box
          sx={{
            color: 'orange',
            fontSize: '30px',
            overflowY: 'auto',
            height: '100%',
          }}
        >
          <br />
          Features
          <Box sx={boxStyle}>
            HOME - a slideshow of different design concepts that you could apply
            to your own designs. VIEW existing designs on the sidebar and CREATE
            a new design through the side bar.
          </Box>
          <Box sx={boxStyle}>
            DESIGNS - Access existing designs and see more in depth information
            about each design (item list). EDIT or DELETE existing designs and
            also create new ones.
          </Box>
          <Box sx={{ ...boxStyle, display: 'flex', flexDirection: 'column' }}>
            Main Design Area (MDA) - Through the DESIGNS page, USERS would be
            asked to UPLOAD an IMAGE of a space they would want to design. USERS
            would then be redirected to the MDA and would be shown a sidebar of
            ITEMS on the right.
            <ul>
              <li>
                Each ITEM has an information (i) button that would show the
                SELECTED ITEM's description.
              </li>
              <li>
                When an ITEM is clicked, it is rendered over the DESIGN AREA
                (DA)
              </li>
              <li>ITEMs in the DESIGN AREA could be dragged and deleted.</li>
              <li>
                DESIGNS could be SAVEd manually with the SAVE BUTTON on top of
                the DA, but an AUTOSAVE feature is running on the background
                every minute
              </li>
              <li>
                The TREE ICON on the right of the SAVE BUTTON is a MENU that
                allows the USER to REPLACE the BACKGROUND IMAGE, SAVE the the
                DESIGN to their device (PNG) or RESET the items inside the DA.
              </li>
            </ul>
          </Box>
          <Box sx={boxStyle}>
            GALLERY - VIEW different items within the database and FILTER them
            with different tags (softscape, hardscape, plants, pots, shrubs,
            etc.). REQUEST for new items to be uploaded in the database.{' '}
          </Box>
          <Box sx={boxStyle}>
            PROFILE - VIEW account information through the Information Tab. VIEW
            and/or DELETE pending requests through the Requested Items tab.
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutPage;
