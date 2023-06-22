import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Users from '../Pages/AdminPage/Users';
import ItemManagement from '../Pages/AdminPage/ItemRequests';
import DesignQuotes from '../Pages/AdminPage/DesignQuotes';
import AdminDashboard from '../Pages/AdminPage/AdminDashboard';
import LoginPage from '../Pages/UserManagement/Login/LoginPage';
import InvalidURL from '../Pages/InvalidURL';

import MainDesignPage from '../Pages/Design/MainDesign/MainDesign';
import DesignPage from '../Pages/Design//DesignPage/DesignPage';

import { NewItemsContextProvider } from '../context/NewItemsContext';
import { ItemsContextProvider } from '../context/ItemsContext';
import { DesignsContextProvider } from '../context/DesignContext';
const AdminRoutes = () => {
 const location = useLocation();

 return (
  <Routes
   location={location}
   key={location.pathname}
  >
   <Route
    path={'/admin/dashboard'}
    element={<AdminDashboard />}
   />
   <Route
    path="/admin/users"
    element={<Users />}
   />
   <Route
    path="/admin/items"
    element={
     <NewItemsContextProvider>
      <ItemManagement />
     </NewItemsContextProvider>
    }
   />
   <Route
    path="/admin/design-quotes"
    element={<DesignQuotes />}
   />
   <Route
    path={'/login'}
    element={<LoginPage />}
   />
   <Route
    path="/invalid"
    element={<InvalidURL />}
   />
   <Route
    path="*"
    element={<Navigate to="/invalid" />}
   />
  </Routes>
 );
};

export default AdminRoutes;
