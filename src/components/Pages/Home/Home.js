import { React } from 'react';
import GardenCarousel from './Carousel/GardenCarousel';
import { Container, Box, Grid } from '@mui/material';
import UserDesigns from '../Design/UserDesigns/UserDesigns';

const Home = () => {
  return (
    <Container
      maxWidth={'xl'}
      disableGutters={true}
      sx={{ bgcolor: 'background.default', borderRadius: 2 }}
    >
      <Grid
        container
        className="mainContainer"
        sx={{ backgroundColor: 'background.default', mt: 2, borderRadius: 2 }}
      >
        <Grid item xs={8} className="middleContainer">
          <Box
            className="carousel"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: 10,
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >
            <GardenCarousel />
          </Box>
        </Grid>

        <Grid item xs={4}>
          <UserDesigns />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
