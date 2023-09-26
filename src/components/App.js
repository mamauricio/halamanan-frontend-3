// App.js
import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './MuiTheme';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import NavBar from './Navbar/NavBar';
import AdminNavBar from './Pages/AdminPage/AdminNavBar';
import AdminRoutes from './Routes/AdminRoutes';
import GuestRoutes from './Routes/GuestRoutes';
import UserRoutes from './Routes/UserRoutes';
import Box from '@mui/material/Box';

const App = () => {
 const navigate = useNavigate();
 const [isAuthenticated, setAuthenticated] = useState(
  sessionStorage.getItem('authenticated')
 );
 const handleAuthenticate = (id) => {
  //   console.log(id);
  if (id === 'admin') {
   sessionStorage.setItem('adminAuth', true);
   sessionStorage.setItem('authenticated', true);
   window.location.href = 'https://halamanan.netlify.app/admin/dashboard';
   return;
  }

  if (!sessionStorage.getItem('token')) {
   sessionStorage.setItem('token', id);
  } else {
   navigate('/login');
  }

  if (!sessionStorage.getItem('authenticated')) {
   sessionStorage.setItem('authenticated', true);
   setAuthenticated(true);
  } else {
   navigate('/login');
  }

  navigate('/designs');
 };

 const handleLogout = () => {
  setAuthenticated(false);
  localStorage.clear();
  sessionStorage.clear();
  navigate('/login');
 };

 return (
  <>
   <TransitionGroup>
    <ThemeProvider theme={theme}>
     {sessionStorage.getItem('adminAuth') ? (
      <Box
       sx={{
        bgcolor: 'primary.main',
        height: '100%',
        width: '100%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        overflowY: 'hidden',
       }}
      >
       <AdminNavBar handleLogout={handleLogout} />
       <AdminRoutes />
      </Box>
     ) : (
      <>
       {isAuthenticated && !sessionStorage.getItem('adminAuth') ? (
        <Box
         sx={{
          bgcolor: 'primary.main',
          height: '100%',
          width: '100%',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          //   overflowY: 'hidden',
         }}
        >
         <NavBar handleLogout={handleLogout} />
         <UserRoutes />
        </Box>
       ) : (
        <Box
         sx={{
          bgcolor: 'primary.main',
          height: '100%',
          width: '100%',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          overflowY: 'hidden',
         }}
        >
         <NavBar isGuest />
         <GuestRoutes
          handleAuthenticate={handleAuthenticate}
          isGuest
         />
        </Box>
       )}
      </>
     )}
    </ThemeProvider>
   </TransitionGroup>
  </>
 );
};

export default App;
