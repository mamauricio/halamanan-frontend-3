import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import createTheme from '@mui/material/styles/createTheme';
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

 const handleOpen = () => {
  //console.log(('opening alert');
  setOpen(true);
 };
 const handleClose = () => {
  const timer = setTimeout(() => {
   setOpen(false);
  }, 4 * 1000);

  return () => {
   clearTimeout(timer);
  };
 };

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
    console.log('signed up');
   })
   .catch((error) => {
    if (error.response) {
     setError(error.response.data.error);
     handleOpen();
     handleClose();
    } else {
     console.log(error.response);
    }
   });
 };

 const handleLogin = async (event) => {
  event.preventDefault();
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
    if (response.data === 'admin') {
     handleAuthenticate('admin');
    } else if (response.data.userId) {
     const hashedUserId = response.data.userId;
     handleAuthenticate(hashedUserId);
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
   <Box
    className="login-page"
    sx={{
     position: 'absolute',
     display: 'flex',
     flexDirection: 'column',
     width: 300,
     height: 600,
     left: '50%',
     top: '50%',
     transform: 'translate(-50%, -50%)',
     color: 'orange',
     borderRadius: 2,
     boxShadow: 5,
     p: 3,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: 'primary.main',
    }}
   >
    <Box sx={{ color: 'inherit', mb: 2 }}>
     <h1>Halamanan </h1>
    </Box>
    <Grow in={open}>
     <Alert
      severity={error ? 'error' : 'success'}
      onClose={handleClose}
      sx={{ color: 'primary.main', backgroundColor: error ? 'red' : 'orange' }}
     >
      {error ? error : alertMessage}
     </Alert>
    </Grow>
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
        mb: 3,
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
        sx={{
         py: 2,
        }}
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
         width: '200px',
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
         sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          ml: 2,
          ':hover': {
           color: 'primary.main',
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
      <h3>SignUp</h3>
      <Box
       component="form"
       onSubmit={handleSignUp}
       sx={{ bgcolor: 'orange', p: 2, borderRadius: 2 }}
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
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'space-evenly',
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
  </ThemeProvider>
 );
};

export default LoginPage;
