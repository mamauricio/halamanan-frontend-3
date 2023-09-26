import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../Pages/UserManagement/Login/LoginPage';
// import HomePage from '../Pages/Home/Home';
import PlantGallery from '../Pages/PlantGallery/PlantGallery';
import HowTo from '../Pages/About/HowTo';
import InvalidURL from '../Pages/InvalidURL';

const GuestRoutes = ({ handleAuthenticate, isGuest }) => {
 return (
  <div>
   <Routes>
    <Route
     exact
     path="/login"
     element={<LoginPage handleAuthenticate={handleAuthenticate} />}
    />
    <Route
     path="*"
     element={
      <Navigate
       replace
       to="/login"
      />
     }
    />

    <Route
     path="/gallery"
     element={<PlantGallery isGuest />}
    />

    <Route
     path="/about"
     element={<HowTo />}
    />

    <Route
     path="/invalid"
     element={<InvalidURL />}
    />
   </Routes>
  </div>
 );
};

export default GuestRoutes;
