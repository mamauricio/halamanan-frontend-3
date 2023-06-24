import React, { useEffect, useState } from 'react';
import {
 Box,
 Container,
 TableContainer,
 Paper,
 Table,
 TableHead,
 TableRow,
 TableCell,
 TableBody,
 Button,
 Modal,
 Grow,
 Alert,
 FormControl,
 TextField,
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
const Users = () => {
 const [error, setError] = useState('');
 const [userList, setUserList] = useState('');
 const [selectedUser, setSelectedUser] = useState('');
 const [userData, setUserData] = useState({
  firstName: selectedUser.firstName,
  lastName: selectedUser.lastName,
  email: selectedUser.email,
 });
 const [promoteUser, setPromoteUser] = useState(false);
 const [demoteUser, setDemoteUser] = useState(false);
 const [deleteUser, setDeleteUser] = useState(false);
 const [openMain, setOpenMain] = useState(false);

 useEffect(() => {
  fetchAllUsers();
  const timer = setTimeout(() => {
   setOpenMain(true);
  }, 200);
 }, []);

 useEffect(() => {
  setUserData({
   firstName: selectedUser ? selectedUser.firstName : '',
   lastName: selectedUser ? selectedUser.lastName : '',
   email: selectedUser ? selectedUser.email : '',
   role: selectedUser ? selectedUser.role : 'user',
  });
 }, [selectedUser]);

 const handleFormChange = (event) => {
  setUserData({
   ...userData,
   [event.target.name]: event.target.value,
  });
 };

 //---------------------Edit modal handlers-------------------//

 //---------------------------------------------Modal and alert handlers-----------------------------------------//

 const [open, setOpen] = useState(false);
 const [modalMessage, setMessage] = useState('');
 const [openAlert, setOpenAlert] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 const [openEdit, setOpenEdit] = useState(false);

 const handleOpenEdit = (user) => {
  setSelectedUser(user);
  setOpenEdit(true);
 };

 const handleCloseEdit = () => {
  setOpenEdit(false);
 };
 const handleOpenAlert = () => {
  setOpenAlert(true);
  const timer = setTimeout(() => {
   setOpenAlert(false);
  }, 4 * 1000);

  return () => {
   clearTimeout(timer);
  };
 };
 const handleCloseAlert = () => {
  setOpenAlert(false);
 };
 const handleOpen = (message, user) => {
  if (message === 'delete') {
   setDeleteUser(true);
   setSelectedUser(user);
   setMessage(`Are you sure you want to delete ${user.email} from user list`);
  }

  if (message === 'promote') {
   setPromoteUser(true);
   setSelectedUser(user);
   setMessage(`Are you sure you want to promote ${user.email} to admin role`);
  }

  if (message === 'demote') {
   setDemoteUser(true);
   setSelectedUser(user);
   setMessage(`Are you sure you want to demote ${user.email} to user role`);
  }

  setOpen(true);
 };
 const handleClose = () => {
  setMessage('');
  setDeleteUser(false);
  setDemoteUser(false);
  setPromoteUser(false);
  setOpen(false);
 };

 const fetchAllUsers = async () => {
  try {
   const response = await fetch(
    ' https://halamanan-197e9734b120.herokuapp.com/admin/users',
    {
     headers: {
      token: 'admin',
     },
    }
   );

   const data = await response.json();

   if (data) {
    setUserList(data);
   } else {
   }
  } catch (error) {
   setError(error.response.data.error);
  }
 };

 //-------------------------------------------COMPONENT STYLING------------------------------------------------//

 const style = {
  display: 'flex',
  alignItems: 'center',
  mt: 2,
  justifyContent: 'space-evenly',
 };

 const yesButton = {
  color: 'white',
  bgcolor: 'red',
 };

 const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  color: 'primary.main',
  height: 'auto',
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  p: 3,
  borderRadius: 3,
  bgcolor: 'orange',
  boxShadow: 10,
 };

 const textFieldStyle = {
  mt: 1,
 };

 //---------------------------END OF COMPONENT STYLING-----------------------------  //

 //----------------------------------------BACKEND REQUESTS--------------------------//

 const handleEdit = async (event) => {
  event.preventDefault();
  try {
   await axios.patch(
    ` https://halamanan-197e9734b120.herokuapp.com/admin/users/${selectedUser._id}/edit`,
    { userData }
   );
   setUserList((userList) =>
    userList.map((user) =>
     user._id === selectedUser._id ? { ...user, ...userData } : user
    )
   );

   handleCloseEdit();
   setAlertMessage('Successfully edited user.');
   handleOpenAlert();
  } catch (error) {
   setError(error.response.data.error);
   handleOpenAlert();
  }
 };

 const handlePromote = async (userId) => {
  try {
   await axios.patch(
    ` https://halamanan-197e9734b120.herokuapp.com/admin/users/${userId}/promote`
   );
   setUserList((userList) =>
    userList.map((user) =>
     user._id === userId ? { ...user, role: 'admin' } : user
    )
   );
   setAlertMessage('Successfully promoted user.');

   handleOpenAlert();
   handleClose();
  } catch (error) {
   setError(error);
  }
 };

 const handleDemote = async (userId) => {
  try {
   const response = await axios.patch(
    ` https://halamanan-197e9734b120.herokuapp.com/admin/users/${userId}/demote`
   );
   setUserList((userList) =>
    userList.map((user) =>
     user._id === userId ? { ...user, role: 'user' } : user
    )
   );
   setAlertMessage('Successfully demoted user.');

   handleOpenAlert();
   handleClose();
  } catch (error) {
   setError(error);
  }
 };

 const handleDelete = async (userId) => {
  try {
   await axios.delete(
    ` https://halamanan-197e9734b120.herokuapp.com/admin/users/${userId}`
   );
   setUserList((userList) => userList.filter((user) => user._id !== userId));

   handleClose();
   setAlertMessage('Successfully deleted user.');
   handleOpenAlert();
  } catch (error) {
   console.error(error.response.data.message);
  }
 };

 //-------------------------------------------END OF BACKEND REQUESTS-----------------------------//

 return (
  <motion.div
   initial={{ opacity: 0, transition: { duration: 0.3 } }}
   animate={{ opacity: 1, transition: { duration: 0.3 } }}
   exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
   <Container
    maxWidth="lg"
    sx={{ alignItems: 'center', mt: 2 }}
   >
    <Grow in={openMain}>
     <div>
      {openAlert && (
       <Grow in={openAlert}>
        <Alert
         onClose={handleCloseAlert}
         sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          bgcolor: 'primary.main',
          color: 'orange',
          zIndex: 2,
         }}
        >
         {alertMessage}
        </Alert>
       </Grow>
      )}
      <TableContainer component={Paper}>
       <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
       >
        <TableHead>
         <TableRow>
          <TableCell>User Email</TableCell>
          <TableCell align="right">First Name</TableCell>
          <TableCell align="right">Last Name</TableCell>
          <TableCell align="right">Role</TableCell>

          <TableCell
           sx={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
           }}
          >
           Actions
          </TableCell>
         </TableRow>
        </TableHead>
        <TableBody>
         {userList &&
          userList.map((user) => (
           <>
            {user._id === selectedUser._id && (
             <>
              <Modal
               open={open}
               onClose={handleClose}
              >
               <Box sx={modalStyle}>
                {modalMessage}

                {deleteUser && (
                 <Box sx={style}>
                  <Button
                   onClick={() => handleDelete(user._id)}
                   sx={yesButton}
                  >
                   Yes
                  </Button>
                  <Button onClick={handleClose}>No</Button>
                 </Box>
                )}

                {demoteUser && (
                 <Box sx={style}>
                  <Button
                   onClick={() => handleDemote(user._id)}
                   sx={yesButton}
                  >
                   Yes
                  </Button>
                  <Button onClick={handleClose}>No</Button>
                 </Box>
                )}
                {promoteUser && (
                 <Box sx={{ style }}>
                  <Button
                   onClick={() => handlePromote(user._id)}
                   sx={yesButton}
                  >
                   Yes
                  </Button>
                  <Button onClick={handleClose}>No</Button>
                 </Box>
                )}
               </Box>
              </Modal>
             </>
            )}

            <TableRow
             key={user.email}
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             <TableCell
              component="th"
              scope="row"
             >
              {user.email}
             </TableCell>
             <TableCell align="right">{user.firstName}</TableCell>
             <TableCell align="right">{user.lastName}</TableCell>
             <TableCell align="right">{user.role}</TableCell>
             <TableCell
              align="right"
              sx={{
               justifyContent: 'center',
               alignItems: 'center',
               display: 'flex',
              }}
             >
              {user.email !== 'admin@admin.com' && (
               <>
                <Button
                 onClick={() => handleOpen('delete', user)}
                 sx={{ bgcolor: 'red', color: 'white' }}
                >
                 Delete
                </Button>
                <Button onClick={() => handleOpenEdit(user)}>Edit</Button>
                {selectedUser._id === user._id && (
                 <Modal
                  open={openEdit}
                  onClose={handleCloseEdit}
                 >
                  <Box
                   sx={modalStyle}
                   component="form"
                   onSubmit={handleEdit}
                  >
                   <TextField
                    name="firstName"
                    value={userData.firstName}
                    label="First Name"
                    required
                    onChange={(event) => handleFormChange(event)}
                    sx={textFieldStyle}
                   />
                   <TextField
                    name="lastName"
                    value={userData.lastName}
                    label="Last Name"
                    required
                    onChange={(event) => handleFormChange(event)}
                    sx={textFieldStyle}
                   />
                   <TextField
                    name="email"
                    value={userData.email}
                    label="Email"
                    required
                    type="email"
                    onChange={(event) => handleFormChange(event)}
                    sx={textFieldStyle}
                   />

                   <Button
                    type="submit"
                    sx={{
                     mt: 2,
                     bgcolor: 'primary.main',
                     color: 'orange',
                     ':hover': {
                      color: 'orange',
                      bgcolor: 'primary.main',
                      opacity: 0.9,
                     },
                    }}
                   >
                    {' '}
                    Submit{' '}
                   </Button>
                   <Button onClick={handleCloseEdit}>Cancel</Button>
                  </Box>
                 </Modal>
                )}
                {user.role !== 'admin' ? (
                 <Button
                  onClick={() => handleOpen('promote', user)}
                  sx={{ bgcolor: 'green', color: 'white' }}
                 >
                  Promote to Admin
                 </Button>
                ) : (
                 <Button
                  onClick={() => handleOpen('demote', user)}
                  sx={{ bgcolor: 'orange', color: 'white' }}
                 >
                  {' '}
                  Remove as Admin
                 </Button>
                )}
               </>
              )}
             </TableCell>
            </TableRow>
           </>
          ))}
        </TableBody>
       </Table>
      </TableContainer>
     </div>
    </Grow>
   </Container>
  </motion.div>
 );
};

export default Users;
