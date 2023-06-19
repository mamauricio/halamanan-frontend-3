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
import NavBar from './Navbar/NavBar';
import LoginPage from './Pages/UserManagement/Login/LoginPage';
import HomePage from './Pages/Home/Home';
import GalleryPage from './Pages/PlantGallery/PlantGallery';
import AboutPage from './Pages/About/AboutPage';
import MainDesignPage from './Pages/Design/MainDesign/MainDesign';
import DesignPage from './Pages/Design//DesignPage/DesignPage';
import AdminPage2 from './Pages/AdminPage/AdminPage2';

import InvalidURL from './Pages/InvalidURL';
import { ItemsContextProvider } from './context/ItemsContext';
import { DesignsContextProvider } from './context/DesignContext';
import UserProfile from './Pages/UserManagement/Profile/UserProfile';

const App = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(
    sessionStorage.getItem('authenticated')
  );
  const handleAuthenticate = (id) => {
    if (id === 'admin') {
      sessionStorage.setItem('adminAuth', true);
      sessionStorage.setItem('authenticated', true);
      window.location.href = 'http://localhost:3000/admin';
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
      <ThemeProvider theme={theme}>
        {sessionStorage.getItem('adminAuth') ? (
          <>
            <Routes>
              <Route path={'/admin'} element={<AdminPage2 />} />
              <Route path={'/login'} element={<LoginPage />} />
            </Routes>
          </>
        ) : (
          <>
            {isAuthenticated && !sessionStorage.getItem('adminAuth') ? (
              <>
                <NavBar handleLogout={handleLogout} />
                <Routes>
                  {/* Route for home */}
                  <Route
                    exact
                    path="/"
                    element={<Navigate to="/home" />}
                  ></Route>
                  <Route
                    path={`/home`}
                    element={
                      <DesignsContextProvider>
                        <HomePage />
                      </DesignsContextProvider>
                    }
                  />
                  {/* Item Gallery */}
                  <Route path="/gallery" element={<GalleryPage />} />

                  {/* Design page */}

                  <Route
                    path="/designs/"
                    element={
                      <DesignsContextProvider>
                        <DesignPage />
                      </DesignsContextProvider>
                    }
                  />
                  {/* Edit design page */}
                  <Route
                    path="/designs/:id"
                    element={
                      <DesignsContextProvider>
                        <ItemsContextProvider>
                          <MainDesignPage />
                        </ItemsContextProvider>
                      </DesignsContextProvider>
                    }
                  />

                  {/* creating new design page */}
                  <Route
                    path="/designs/create"
                    element={
                      <ItemsContextProvider>
                        <DesignsContextProvider>
                          <MainDesignPage />
                        </DesignsContextProvider>
                      </ItemsContextProvider>
                    }
                  />
                  <Route path="/profile" element={<UserProfile />} />

                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/invalid" element={<InvalidURL />} />
                  <Route path="*" element={<Navigate to="/invalid" />} />
                </Routes>
              </>
            ) : (
              <Routes>
                <Route
                  exact
                  path="/login"
                  element={
                    <LoginPage handleAuthenticate={handleAuthenticate} />
                  }
                />
                <Route path="*" element={<Navigate replace to="/login" />} />
                <Route
                  path="/home"
                  element={
                    <DesignsContextProvider>
                      <HomePage />
                    </DesignsContextProvider>
                  }
                />
              </Routes>
            )}
          </>
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
