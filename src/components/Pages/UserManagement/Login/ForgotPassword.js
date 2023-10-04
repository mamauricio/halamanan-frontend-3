import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ForgotPassword = ({ handleBack }) => {
 const [email, setEmail] = useState('');
 const [confirmationCode, setConfirmationCode] = useState('');
 const [emailSent, setEmailSent] = useState(false);

 const handleReset = (event) => {
  event.preventDefault();
  const response = axios.post(
   `https://halamanan-197e9734b120.herokuapp.com/reset-password?${email}`
  );
  if (response) {
  } else {
  }
 };

 const buttonStyle = {
  bgcolor: 'primary.main',
  color: 'rgba(255,255,255,0.9)',
  px: 2,
  mb: 1,
  ':hover': {
   color: 'primary.main',
   backgroundColor: 'rgba(0,0,0,0.18)',
  },
 };

 return (
  <Box
   component="form"
   onSubmit={handleReset}
   sx={{ color: 'primary.main', bgcolor: 'orange', p: 3, borderRadius: 2 }}
  >
   {emailSent ? (
    <Box
     sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
    >
     <Typography sx={{ alignItems: 'left', color: 'primary.main' }}>
      An message has been sent to your email <strong>{email}</strong>. Please
      check your inbox and follow the instructions to reset your password.
     </Typography>
     <Button
      onClick={handleBack}
      sx={{
       mt: 2,
       bgcolor: 'primary.main',
       color: 'white',
       ':hover': { color: 'primary.main', opacity: 0.9 },
      }}
     >
      Return to Login
     </Button>
    </Box>
   ) : (
    <Box
     sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
     }}
    >
     <Typography
      variant="h5"
      sx={{ mb: 2, color: 'primary.main' }}
     >
      {' '}
      Reset Password{' '}
     </Typography>
     <TextField
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      label="Enter Email Address"
      required
      sx={{ width: '80%' }}
     />
     <Box
      sx={{
       mt: 3,
       width: '90%',
       display: 'flex',
       justifyContent: 'space-around',
      }}
     >
      <Button
       onClick={handleBack}
       sx={buttonStyle}
      >
       Return to Login
      </Button>
      <Button
       type="submit"
       sx={buttonStyle}
      >
       Send Reset Code
      </Button>
     </Box>
    </Box>
   )}
  </Box>
 );
};

export default ForgotPassword;
