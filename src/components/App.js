// App.js
import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './MuiTheme';
import { TransitionGroup } from 'react-transition-group';
import NavBar from './Navbar/NavBar';

//------------------------------ADMIN------------------------------//
import AdminNavBar from './Pages/AdminPage/AdminNavBar';

//-------------------------CONTEXT REDUCERS------------------------//

import AdminRoutes from './Routes/AdminRoutes';
import GuestRoutes from './Routes/GuestRoutes';
import UserRoutes from './Routes/UserRoutes';
const App = () => {
 const navigate = useNavigate();
 const [isAuthenticated, setAuthenticated] = useState(
  sessionStorage.getItem('authenticated')
 );
 const handleAuthenticate = (id) => {
  if (id === 'admin') {
   sessionStorage.setItem('adminAuth', true);
   sessionStorage.setItem('authenticated', true);
   window.location.href = 'http://localhost:3000/admin/dashboard';
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

  navigate('/home');
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
      <>
       <AdminNavBar handleLogout={handleLogout} />
       <AdminRoutes />
      </>
     ) : (
      <>
       {isAuthenticated && !sessionStorage.getItem('adminAuth') ? (
        <>
         <NavBar handleLogout={handleLogout} />
         <UserRoutes />
        </>
       ) : (
        <GuestRoutes handleAuthenticate={handleAuthenticate} />
       )}
      </>
     )}
    </ThemeProvider>
   </TransitionGroup>
  </>
 );
};

export default App;
