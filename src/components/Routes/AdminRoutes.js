import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import AdminLanding from '../Pages/AdminPage/AdminLanding';
import LoginPage from '../Pages/UserManagement/Login/LoginPage';

import { NewItemsContextProvider } from '../context/NewItemsContext';
const AdminRoutes = () => {
 const location = useLocation();

 return (
  <Routes
   location={location}
   key={location.pathname}
  >
   <Route
    path={'/admin/dashboard'}
    element={
     <NewItemsContextProvider>
      <AdminLanding />
     </NewItemsContextProvider>
    }
   />

   <Route
    path={'/login'}
    element={<LoginPage />}
   />

   <Route
    path="*"
    element={<Navigate to="/admin/dashboard" />}
   />
  </Routes>
 );
};

export default AdminRoutes;
