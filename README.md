# Halamanan 

## Information
Halamanan, filipino word for garden, is a CRUD web application that was built to help homeowners in visualizing 
their landscaping projects. 
The web application could be accessed using a browser that supports modern javascript through 
https://sprightly-douhua-6bb24c.netlify.app/ using a laptop, desktop, or tablet (that is equipped with a mouse). 

## Features
### Account creation
   
   Halamanan allows guests to create accounts which then allows them to create their designs.
   The web application has two types of users -- *admin* and *user*. Passport.js was used for implementing
   user management.
   
### Design creation
   
   After creating an account, *users* are given the privilege to create their designs. They could upload
   an image of a landscape from their device OR select an image from the *templates*. Designs created by users
   could be edited, deleted, or saved onto their devices with a PNG format.
   
### Drag and Drop
   
   Upon creating a design, the user would be able to drag and drop items from an item tray. These items are
   draggable and resizable. The package called react-rnd was utilized for the development of this feature.

   
### Expandable gallery
   
   Halamanan only has an initial database composed of 40 items. Thirty softscape items and ten hardscape items.
   Most items in the database are common ornamental plants that are used and found in the Philippines.
   To fully help *users* virtualize their designs, they could submit images of their own items that they
   wish to be added onto the databse.

   Items are then reviewed by *admins* to ensure information accuracy. After approval, it would then be added
   onto the database, which could then be used by all *users*. 

## Technologies used
Halamanan was created using the MERN stack. 
React JS was used for the frontend. 
Express and Node.js for the backend. 
MongoDB Atlas was used for database management. 
Postman was used for testing all the routes.
Github was used for project management.
The frontend of the application is deployed on Netlify.
The backend is deployed on Heroku.
