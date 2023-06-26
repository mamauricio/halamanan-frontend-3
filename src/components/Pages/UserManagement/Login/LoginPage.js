import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import Fade from '@mui/material/Fade';

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import useTheme from '@mui/material/styles/useTheme';
import axios from 'axios';

const LoginPage = ({ handleAuthenticate }) => {
 const [userNameError, setuserNameError] = useState(false);
 const [passwordError, setPasswordError] = useState(false);
 const [errorMessage, setErrorMessage] = useState(null);
 const [showLoginForm, setShowLoginForm] = useState(true);
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [open, setOpen] = useState(false);
 const [error, setError] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 const [initialize, setInitialize] = useState(false);
 const handleOpen = () => {
  setOpen(true);
 };
 const handleClose = () => {
  setOpen(false);
 };

 useEffect(() => {
  const timer = setTimeout(() => {
   setInitialize(true);
  }, 250);
 }, []);

 const handleSignUp = async (event) => {
  event.preventDefault();
  const response = await axios({
   method: 'post',
   data: {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
   },
   withCredentials: true,
   url: 'https://halamanan-197e9734b120.herokuapp.com/signup',
  })
   .then((response) => {
    setAlertMessage('Signed up succesfully. Proceed to login.');
    handleOpen();
    setShowLoginForm(true);
    handleClose();
   })
   .catch((error) => {
    if (error.response) {
     setError(error.response.data.error);
     handleOpen();
     handleClose();
    } else {
    }
   });
 };

 const handleLogin = async (event) => {
  event.preventDefault();
  setAlertMessage('Attempting to log in.');
  handleOpen();

  const response = await axios({
   method: 'post',
   data: {
    email: email,
    password: password,
   },
   withCredentials: true,
   credentials: 'include',
   url: 'https://halamanan-197e9734b120.herokuapp.com/login',
  })
   .then((response) => {
    setAlertMessage('Authenticating');
    if (response.data === 'admin') {
     handleAuthenticate('admin');
    } else if (response.data) {
     const hashedUserId = response.data.userId;
     setAlertMessage('Authenticating');
     const timer = setTimeout(() => {
      handleAuthenticate(hashedUserId);
     }, 1200);
    } else {
    }
   })
   .catch((error) => {
    setErrorMessage(error.response.data.error);

    return;
   });
 };

 const handleEmail = (event) => {
  setuserNameError(false);
  setErrorMessage('');
  setEmail(event);
 };

 const handlePassword = (event) => {
  setPasswordError(false);

  setErrorMessage('');
  setPassword(event);
 };

 const toggleForm = () => {
  setFirstName('');
  setLastName('');
  setEmail('');
  setPassword('');
  setShowLoginForm(!showLoginForm);
 };

 const theme = useTheme();

 return (
  <ThemeProvider theme={theme}>
   <Fade in={initialize}>
    <Box
     className="login-page"
     sx={{
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'orange',
      borderRadius: 2,
      boxShadow: 5,
      // p: 3,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'primary.main',
     }}
    >
     {open && (
      <Grow in={open}>
       <Alert
        severity={error ? 'error' : 'success'}
        onClose={handleClose}
        sx={{
         color: 'primary.main',
         backgroundColor: error ? 'red' : 'orange',
         boxShadow: 5,
        }}
       >
        {error ? error : alertMessage}
       </Alert>
      </Grow>
     )}
     <Box sx={{ color: 'inherit' }}>
      <h1>Halamanan </h1>
     </Box>
     {showLoginForm ? (
      <>
       <Box
        component="form"
        onSubmit={(event) => handleLogin(event)}
        sx={{
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         bgcolor: 'orange',
         p: 1,
         color: 'white',
         borderRadius: 2,
         boxShadow: 5,
        }}
       >
        <TextField
         error={userNameError}
         helperText={errorMessage}
         type="email"
         value={email}
         label="Email"
         onChange={(e) => {
          handleEmail(e.target.value);
         }}
         required
         sx={{ my: 2 }}
        />
        <TextField
         error={passwordError}
         helperText={errorMessage}
         type="password"
         label="Password"
         value={password}
         onChange={(e) => {
          handlePassword(e.target.value);
         }}
         required
        />
        <Box
         sx={{
          pt: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
         }}
        >
         <Button
          color="primary"
          type="button"
          onClick={toggleForm}
          sx={{
           bgcolor: 'primary.main',
           mr: 1,
           color: 'white',
           ':hover': {
            color: 'primary.main',
            border: 'solid 1px',
            borderColor: 'primary.main',
            color: 'primary.main',
           },
          }}
         >
          Sign Up
         </Button>
         <Button
          type="submit"
          variant="contained"
          sx={{
           backgroundColor: 'primary.main',
           color: 'white',
           ml: 2,
           ':hover': {
            // color: 'orange',
            border: 'solid 1px',
            borderColor: 'primary.main',
           },
          }}
         >
          Login
         </Button>
        </Box>
       </Box>
      </>
     ) : (
      <>
       {' '}
       <Box sx={{ color: 'orange', mb: 1 }}>Sign Up</Box>
       <Box
        component="form"
        onSubmit={handleSignUp}
        sx={{
         bgcolor: 'orange',
         p: 2,
         borderRadius: 2,
         display: 'flex',
         flexDirection: 'column',
         justifyConent: 'center',
         alignItems: 'center',
         width: '400px',
         boxShadow: 5,
        }}
       >
        <TextField
         type="text"
         label="First Name"
         value={firstName}
         onChange={(e) => setFirstName(e.target.value)}
         required
         sx={{
          py: 2,
         }}
        />
        <TextField
         type="text"
         label="Last Name"
         value={lastName}
         onChange={(e) => setLastName(e.target.value)}
         required
        />
        <TextField
         type="email"
         label="Email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
         sx={{
          py: 2,
         }}
        />
        <TextField
         type="password"
         label="Password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
        />
        <Box
         sx={{
          m: 2,
          width: '50%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
         }}
        >
         <Button
          type="button"
          onClick={toggleForm}
          sx={{
           bgcolor: 'primary.main',
           color: 'white',

           ':hover': {
            border: 'solid 1px',
            borderColor: 'primary.main',
            color: 'primary.main',
           },
          }}
         >
          Back
         </Button>
         <Button
          variant="contained"
          type="submit"
         >
          Submit
         </Button>
        </Box>
       </Box>
      </>
     )}
    </Box>
   </Fade>
  </ThemeProvider>
 );
};

export default LoginPage;
