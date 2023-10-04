import {
 BrowserRouter as Router,
 Routes,
 Route,
 Navigate,
} from 'react-router-dom';
import React from 'react';
// import HomePage from '../Pages/Home/Home';
import GalleryPage from '../Pages/PlantGallery/PlantGallery';
import HowTo from '../Pages/About/HowTo';
import MainDesignPage from '../Pages/Design/MainDesign/MainDesign';
import DesignPage from '../Pages/Design//DesignPage/DesignPage';
import InvalidURL from '../Pages/InvalidURL';
import { ItemsContextProvider } from '../context/ItemsContext';
import { DesignsContextProvider } from '../context/DesignContext';
import UserProfile from '../Pages/UserManagement/Profile/UserProfile';
const UserRoutes = () => {
 return (
  <Routes>
   {/* Route for home */}
   <Route
    exact
    path="/"
    element={<Navigate to="/designs" />}
   ></Route>
   {/* <Route
    path={`/home`}
    element={
     <DesignsContextProvider>
      <HomePage />
     </DesignsContextProvider>
    }
   /> */}
   {/* Item Gallery */}
   <Route
    path="/gallery"
    element={<GalleryPage />}
   />

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
    path="/profile"
    element={<UserProfile />}
   />

   <Route
    path="/about"
    element={<HowTo />}
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
export default UserRoutes;
