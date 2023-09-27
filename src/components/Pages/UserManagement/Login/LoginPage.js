import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import Fade from '@mui/material/Fade';
import Container from '@mui/material/Container';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import useTheme from '@mui/material/styles/useTheme';
import axios from 'axios';
import ForgotPassword from './ForgotPassword';

const LoginPage = ({ handleAuthenticate }) => {
 const [userNameError, setuserNameError] = useState(false);
 const [passwordError, setPasswordError] = useState(false);
 const [errorMessage, setErrorMessage] = useState(null);
 const [showLoginForm, setShowLoginForm] = useState(false);
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [open, setOpen] = useState(false);
 const [error, setError] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 const [initialize, setInitialize] = useState(false);
 const [isVisible, setIsVisible] = useState(false);
 const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
   setInitialize(true);
  }, 250);
 }, []);

 const handleOpen = () => {
  setOpen(true);
  const timer = setTimeout(() => {
   setAlertMessage('');
   setOpen(false);
  }, 3000);
 };
 const handleClose = () => {
  setAlertMessage('');
  setOpen(false);
 };

 const handleShowPassword = () => {
  setIsVisible(!isVisible);
 };

 const validatePassword = () => {
  const passwordRegex = /^(?=.*[0-9\W]).{8,}$/;

  if (!passwordRegex.test(password)) {
   setPasswordError(
    'Password should be at least 8 characters long with at least 1 special character'
   );
   return false;
  }

  return true;
 };

 const checkIfSame = () => {
  if (password !== confirmPassword) {
   setPasswordError('Passwords do not match');
   return false;
  }
  return true;
 };

 const handleSignUp = async (event) => {
  event.preventDefault();

  if (validatePassword() != true) {
   return false;
  }
  if (checkIfSame() != true) {
   return false;
  }
  const response = await axios({
   method: 'post',
   data: {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
   },
   withCredentials: true,
   url: 'https://sprightly-douhua-6bb24c.netlify.app/signup',
  })
   .then((response) => {
    setAlertMessage('Signed up succesfully. Loggin in.');
    handleOpen();
    handleLogin(event);
    setShowLoginForm(true);
    setError('');
   })
   .catch((error) => {
    if (error.response) {
     setError(error.response.data.error);
     if (error.response.status === 409) {
      setuserNameError('A user with this email already exists.');
      setErrorMessage('A user with this email already exists.');
     }
     handleOpen();
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
   url: 'https://sprightly-douhua-6bb24c.netlify.app/login',
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
    setError(true);
    setAlertMessage(error.response.data.error);
    setErrorMessage(error.response.data.error);
    return;
   });
 };

 const handleForgotPassword = () => {
  setShowForgotPasswordForm(true);
  setShowLoginForm(false);
 };

 const handleBack = () => {
  setShowForgotPasswordForm(false);
  setShowLoginForm(true);
 };

 const handleEmail = (event) => {
  setuserNameError(false);
  setErrorMessage('');
  setError(false);
  setEmail(event);
 };

 const handlePassword = (event) => {
  setPasswordError(false);
  setErrorMessage('');
  setError(false);
  setPassword(event);
 };
 const handleConfirmPassword = (event) => {
  setPasswordError(false);
  setErrorMessage('');
  setConfirmPassword(event);
 };

 const toggleForm = () => {
  setFirstName('');
  setLastName('');
  setEmail('');
  setPassword('');
  setConfirmPassword('');
  setuserNameError('');

  setShowLoginForm(!showLoginForm);
 };

 const theme = useTheme();

 const buttonStyle = {
  bgcolor: 'primary.main',
  color: 'rgba(255,255,255,0.9)',
  px: 2,
  mb: 1,
  width: '100px',
  ':hover': {
   color: 'primary.main',
   backgroundColor: 'rgba(0,0,0,0.18)',
  },
 };

 return (
  <ThemeProvider theme={theme}>
   <motion.div
    initial={{ opacity: 0, transition: { duration: 0.3 } }}
    animate={{ opacity: 1, transition: { duration: 0.3 } }}
    exit={{ opacity: 0, transition: { duration: 0.3 } }}
   >
    <Box
     className="login-page"
     sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: -1,
     }}
    >
     <Container
      maxWidth="xl"
      disableGutters
      sx={{ width: '100%', height: '100%' }}
     >
      <Grid
       container
       sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
       }}
      >
       <Grid
        item
        xs={8}
       >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
         <img
          src="/images/TreeBranchesWhite.png"
          style={{
           height: '220px',
          }}
         />
         <Box sx={{ ml: 4 }}>
          <Typography
           variant="h1"
           sx={{
            fontFamily: 'Sans Serif',
            letterSpacing: '12px',
            alignItems: 'center',
           }}
          >
           Halamanan
          </Typography>
          <Typography sx={{ width: '80%', fontSize: '20px', color: 'orange' }}>
           Helping homeowners create and visualize their landscaping project
           using our 2D landscape editor and expandable gallery of items.
          </Typography>
         </Box>
        </Box>
       </Grid>
       <Grid
        item
        xs={4}
       >
        {open && (
         <Grow in={open}>
          <Alert
           severity={error ? 'error' : 'success'}
           onClose={handleClose}
           sx={{
            color: error ? 'white' : 'primary.main',
            backgroundColor: error ? 'rgba(255,0,0,0.5)' : 'orange',

            boxShadow: 5,
            mb: 2,
           }}
          >
           {error ? errorMessage : alertMessage}
          </Alert>
         </Grow>
        )}

        {showLoginForm && (
         <Fade in={showLoginForm}>
          <Box
           component="form"
           onSubmit={(event) => handleLogin(event)}
           sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'center',
            bgcolor: 'orange',
            py: 2,
            color: 'white',
            borderRadius: 2,
            boxShadow: 5,
            position: 'relative',
           }}
          >
           <Box
            sx={{
             width: '100%',
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
            }}
           >
            <Typography
             variant="h6"
             sx={{
              color: 'primary.main',
              mb: 2,
             }}
            >
             Login
            </Typography>
           </Box>
           <Box
            sx={{
             width: '100%',
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center',
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
             sx={{ my: 2, width: '80%' }}
            />
            <TextField
             error={passwordError}
             helperText={errorMessage}
             type={!isVisible ? 'password' : 'text'}
             label="Password"
             value={password}
             onChange={(e) => {
              handlePassword(e.target.value);
             }}
             required
             sx={{ width: '80%' }}
             InputProps={{
              endAdornment: (
               <IconButton onClick={handleShowPassword}>
                {!isVisible ? (
                 <Visibility sx={{ color: 'primary.main' }} />
                ) : (
                 <VisibilityOff sx={{ color: 'primary.main' }} />
                )}
               </IconButton>
              ),
             }}
            />
           </Box>

           <Box
            sx={{
             justifyContent: 'center',
             display: 'flex',
             mt: 3,
            }}
           >
            <Box
             sx={{
              width: '45%',
              display: 'flex',
              justifyContent: 'space-between',
             }}
            >
             <Button
              title="Create an account"
              color="primary"
              type="button"
              onClick={toggleForm}
              sx={buttonStyle}
             >
              Register
             </Button>

             <Button
              type="submit"
              sx={buttonStyle}
             >
              Login
             </Button>
            </Box>
           </Box>
          </Box>
         </Fade>
        )}

        {!showLoginForm && !showForgotPasswordForm && (
         <Fade in={!showLoginForm}>
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
            alignItems: 'left',
            boxShadow: 5,
           }}
          >
           <Box
            sx={{
             display: 'flex',
             justifyContent: 'center',
             width: '100%',
             pt: 1,
            }}
           >
            <Typography
             variant="h6"
             sx={{
              mb: 1,
              color: 'primary.main',
             }}
            >
             Join Now
            </Typography>
           </Box>
           <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mb: 2 }}>
            <TextField
             type="text"
             label="First Name"
             value={firstName}
             onChange={(e) => setFirstName(e.target.value)}
             required
             sx={{ mr: 1 }}
            />
            <TextField
             type="text"
             label="Last Name"
             value={lastName}
             onChange={(e) => setLastName(e.target.value)}
             required
            />
           </Box>
           <TextField
            error={userNameError ? true : false}
            type="email"
            label="Email"
            helperText={userNameError}
            value={email}
            onChange={(e) => handleEmail(e.target.value)}
            required
           />
           <TextField
            error={passwordError ? true : false}
            type={!isVisible ? 'password' : 'text'}
            label="Password"
            helperText={passwordError}
            value={password}
            onChange={(e) => handlePassword(e.target.value)}
            required
            sx={{ my: 2 }}
            InputProps={{
             endAdornment: (
              <IconButton onClick={handleShowPassword}>
               {!isVisible ? (
                <Visibility sx={{ color: 'primary.main' }} />
               ) : (
                <VisibilityOff sx={{ color: 'primary.main' }} />
               )}
              </IconButton>
             ),
            }}
           />

           <TextField
            error={passwordError ? true : false}
            type={!isVisible ? 'password' : 'text'}
            label="Confirm Password"
            helperText={passwordError}
            value={confirmPassword}
            onChange={(e) => handleConfirmPassword(e.target.value)}
            required
            InputProps={{
             endAdornment: (
              <IconButton onClick={handleShowPassword}>
               {!isVisible ? (
                <Visibility sx={{ color: 'primary.main' }} />
               ) : (
                <VisibilityOff sx={{ color: 'primary.main' }} />
               )}
              </IconButton>
             ),
            }}
           />
           <Box
            sx={{
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center',
            }}
           >
            <Typography
             onClick={toggleForm}
             sx={{
              color: 'primary.main',
              my: 2,
              p: 1,
              bgcolor: 'transparent',
              borderRadius: 1,
              transition:
               'background-color ease-in-out 0.2s, color ease-in-out 0.2s',
              color: 'rgba(0,0,0,0.6)',
              ':hover': {
               bgcolor: 'rgba(0,0,0,0.2)',
               color: 'primary.main',
               color: 'white',
              },
             }}
            >
             Already have an account? Click here to login
            </Typography>

            <Button
             title="Create an account"
             type="submit"
             sx={buttonStyle}
            >
             <Typography variant="body">Register</Typography>
            </Button>
           </Box>
          </Box>
         </Fade>
        )}

        {showForgotPasswordForm && (
         <Fade in={showForgotPasswordForm}>
          <Box>
           <ForgotPassword handleBack={handleBack} />
          </Box>
         </Fade>
        )}
       </Grid>
      </Grid>
     </Container>
    </Box>
   </motion.div>
   {/* </Fade> */}
  </ThemeProvider>
 );
};

export default LoginPage;
