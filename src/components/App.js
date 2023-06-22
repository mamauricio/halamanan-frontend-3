// App.js
import './App.css';
import React, { useState } from 'react';
import {
 BrowserRouter as Router,
 Routes,
 Route,
 useNavigate,
 Navigate,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './MuiTheme';
import { TransitionGroup } from 'react-transition-group';
import NavBar from './Navbar/NavBar';
import LoginPage from './Pages/UserManagement/Login/LoginPage';
import HomePage from './Pages/Home/Home';
import GalleryPage from './Pages/PlantGallery/PlantGallery';
import AboutPage from './Pages/About/AboutPage';
import MainDesignPage from './Pages/Design/MainDesign/MainDesign';
import DesignPage from './Pages/Design//DesignPage/DesignPage';
import InvalidURL from './Pages/InvalidURL';
//------------------------------ADMIN------------------------------//
import AdminNavBar from './Pages/AdminPage/AdminNavBar';
import Users from './Pages/AdminPage/Users';
import ItemManagement from './Pages/AdminPage/ItemRequests';
import DesignQuotes from './Pages/AdminPage/DesignQuotes';
import AdminDashboard from './Pages/AdminPage/AdminDashboard';

//-------------------------CONTEXT REDUCERS------------------------//
import { ItemsContextProvider } from './context/ItemsContext';
import { DesignsContextProvider } from './context/DesignContext';
import UserProfile from './Pages/UserManagement/Profile/UserProfile';
import { NewItemsContextProvider } from './context/NewItemsContext';
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
