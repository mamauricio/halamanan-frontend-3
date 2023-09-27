import React, { useState, useEffect } from 'react';
import { Box, Grow, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';

const AccountInformation = () => {
 const [showProfile, setShowProfile] = useState(false);
 const [editing, setEditing] = useState(false);
 const [user, setUser] = useState('');
 const [userData, setUserData] = useState({
  firstName: '',
  lastName: '',
  email: '',
 });
 const [error, setError] = useState('');

 useEffect(() => {
  const fetchUser = async () => {
   const response = await fetch(
    `https://halamanan-197e9734b120.herokuapp.com/profile/`,
    {
     headers: {
      token: `${sessionStorage.getItem('token')}`,
     },
    }
   );

   try {
    const user = await response.json();
    setUser(user);
    setUserData({
     firstName: user.firstName,
     lastName: user.lastName,
     email: user.email,
    });
   } catch (error) {}
  };

  fetchUser();
  setShowProfile(true);
 }, []);

 const handleCancel = () => {
  setUserData({
   firstName: user.firstName,
   lastName: user.lastName,
   email: user.email,
  });
  setEditing(false);
 };

 const handleSave = async () => {
  const token = sessionStorage.getItem('token');

  try {
   const response = await axios.patch(
    `https://halamanan-197e9734b120.herokuapp.com/profile/${token}`,
    userData
   );
   if (response) {
    const user = response.data;
    setUser(user);
    setEditing(false);
   }
  } catch (response) {
   setError(response.response.data.error);
  }
 };

 const handleFormChange = (event) => {
  setError('');
  setUserData({
   ...userData,
   [event.target.name]: event.target.value,
  });
 };

 const boxStyle = {
  display: 'flex',
  p: 1,
  color: 'orange',
 };

 const textStyle = {
  color: 'rgba(255,255,255,0.8)',
  width: '120px',
  justifyContent: 'right',
  display: 'flex',
  mr: 1,
  //   bgcolor: 'pink',
 };

 return (
  <Box
   sx={{
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
   }}
  >
   <Typography
    variant="h6"
    sx={{ my: 3, color: 'rgba(255,255,255,0.8)' }}
   >
    Account Information
   </Typography>
   <Grow in={showProfile}>
    <Box
     sx={
      {
       //  bgcolor: 'white',
       //  width: '400px',
      }
     }
    >
     <Box sx={boxStyle}>
      <Typography sx={textStyle}>First Name:</Typography>
      {editing && (
       <TextField
        name="firstName"
        value={userData.firstName}
        onChange={handleFormChange}
        inputProps={{
         style: {
          color: 'white',
         },
        }}
        sx={{ width: '300px' }}
       />
      )}
      {!editing && <Typography sx={{ ml: 1 }}>{user.firstName}</Typography>}
     </Box>
     <Box sx={boxStyle}>
      <Typography sx={textStyle}>Last Name:</Typography>
      {editing && (
       <TextField
        name="lastName"
        value={userData.lastName}
        onChange={handleFormChange}
        inputProps={{
         style: {
          color: 'white',
         },
        }}
        sx={{ width: '300px' }}
       />
      )}
      {!editing && <Typography sx={{ ml: 1 }}>{user.lastName}</Typography>}
     </Box>
     <Box sx={boxStyle}>
      <Typography sx={textStyle}>Email:</Typography>
      {editing && (
       <TextField
        name="email"
        required
        email
        error={error}
        helperText={error}
        value={userData.email}
        onChange={handleFormChange}
        inputProps={{
         style: {
          color: 'white',
         },
        }}
        sx={{ width: '300px' }}
       />
      )}
      {!editing && <Typography sx={{ ml: 1 }}>{user.email}</Typography>}
     </Box>
     <Box
      sx={{
       width: '100%',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       mt: 2,
      }}
     >
      {!editing && (
       <Button
        onClick={() => {
         setEditing(true);
        }}
        sx={{
         bgcolor: 'orange',
         ':hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.3)' },
        }}
       >
        {' '}
        Edit Information
       </Button>
      )}
      {editing && (
       <Box
        sx={{
         width: '80%',
         display: 'flex',
         justifyContent: 'space-evenly',
         // bgcolor: 'orange',
        }}
       >
        <Button
         onClick={() => handleCancel()}
         sx={{
          width: '100px',
          bgcolor: 'rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.5)',
          transition:
           'background-color ease-in-out 0.2s, color ease-in-out 0.2s',
          ':hover': { bgcolor: 'red', color: 'white' },
         }}
        >
         cancel
        </Button>
        <Button
         onClick={() => handleSave()}
         sx={{
          width: '100px',
          bgcolor: 'orange',
          ':hover': { bgcolor: 'orange', color: 'white' },
         }}
        >
         save
        </Button>
       </Box>
      )}
     </Box>
    </Box>
   </Grow>
  </Box>
 );
};

export default AccountInformation;
