import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../Pages/UserManagement/Login/LoginPage';
import HomePage from '../Pages/Home/Home';
import { DesignsContextProvider } from '../context/DesignContext';

const GuestRoutes = ({ handleAuthenticate }) => {
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
     path="/home"
     element={
      <DesignsContextProvider>
       <HomePage />
      </DesignsContextProvider>
     }
    />
   </Routes>
  </div>
 );
};

export default GuestRoutes;
