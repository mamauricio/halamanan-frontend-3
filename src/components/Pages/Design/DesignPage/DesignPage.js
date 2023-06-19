import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';

import UserDesigns from '../UserDesigns/UserDesigns';
import axios from 'axios';
import DeleteRoundedIcon from '@mui/icons-material/DeleteOutline';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { useDesignContext } from '../../../hooks/useDesignContext';

const DesignPage = () => {
  const navigate = useNavigate();
  const [selectedDesign, setSelectedDesign] = useState();
  const [itemList, setItemList] = useState({});
  const [descriptionEdited, setDescriptionEdited] = useState(false);
  const { designs, dispatch } = useDesignContext();
  const [designDescription, setDescription] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDesign, setOpenDesign] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const countItems = () => {
      if (selectedDesign && selectedDesign.items) {
        const count = selectedDesign.items.reduce((acc, item) => {
          acc[item.itemName] = (acc[item.itemName] || 0) + 1;
          return acc;
        }, {});

        setItemList(count);
      }
    };
    countItems();
  }, [selectedDesign]);

  useEffect(() => {
    setDescriptionEdited(false);
  }, [selectedDesign]);

  const handleEditDesign = (design) => {
    //console.log((design._id);
    navigate(`/designs/${design._id}`, { state: { design } });
  };

  const handleSelectedDesign = (design) => {
    if (selectedDesign === design) {
      setOpenDesign(false);
      setSelectedDesign(null);
    } else {
      setOpenDesign(false);
      setSelectedDesign(design);
      setOpenDesign(true);
    }
  };

  const handleDelete = async (design) => {
    const response = await axios
      .delete(
        `https://halamanan-197e9734b120.herokuapp.com/designs/${design._id}`,
        {
          data: { id: design._id },
        }
      )

      .then((response) => {
        dispatch({
          type: 'DELETE_DESIGN',
          payload: design._id,
        });
        handleClose();
        window.location.href = window.location.href;
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <Container disableGutters={true} maxWidth="xl">
        <Grid
          container
          spacing={1}
          sx={{
            backgroundColor: 'background.default',
            mt: 2,
            borderRadius: 2,
            height: '88vh',
          }}
        >
          <Grid item xs={3}>
            <Box>
              <UserDesigns handleSelectedDesign={handleSelectedDesign} />
            </Box>
          </Grid>

          <Grid item xs={9}>
            <Box
              sx={{
                backgroundColor: 'primary.main',
                height: '93%',
                maxHeight: '89vh',
                borderRadius: 2,
                boxShadow: 5,
                mt: 2,
                mr: 2,
              }}
            >
              {selectedDesign ? (
                <Fade in={openDesign}>
                  <Box className="designInformation">
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ ml: 2, py: 2, fontSize: '20px' }}>
                        {selectedDesign.designName}
                      </Box>
                      <Box>
                        <Button
                          sx={{
                            backgroundColor: 'white',
                            my: 1,
                            mr: 2,
                            ':hover': {
                              color: 'primary.main',
                              backgroundColor: 'orange',
                            },
                          }}
                          onClick={() => handleEditDesign(selectedDesign)}
                        >
                          <ModeEditRoundedIcon label="Edit Design" />
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: 'white',
                            my: 1,
                            mr: 2,
                            ':hover': {
                              color: 'white',
                              backgroundColor: 'red',
                            },
                          }}
                          onClick={handleOpen}
                        >
                          <DeleteRoundedIcon />
                        </Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          sx={{}}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',

                              backgroundColor: 'orange',
                              borderRadius: 2,
                              p: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Box
                                sx={{ fontSize: '20px', color: 'primary.main' }}
                              >
                                Are you sure you want to delete Design{' '}
                                {selectedDesign.designName} ?
                              </Box>
                              <Box
                                sx={{
                                  mt: 2,
                                  display: 'flex',
                                  justifyContent: 'space-evenly',
                                }}
                              >
                                <Button
                                  sx={{ ':hover': { backgroundColor: 'red' } }}
                                  onClick={() => handleDelete(selectedDesign)}
                                >
                                  Yes
                                </Button>
                                <Button
                                  sx={{
                                    color: 'white',
                                    backgroundColor: 'primary.main',
                                  }}
                                  onClick={handleClose}
                                >
                                  No
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Modal>
                      </Box>
                    </Box>

                    <Box
                      className="thumbnail-container"
                      sx={{
                        maxWidth: '100%',
                        backgroundColor: 'white',
                        py: 1,
                        alignContent: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: 2,
                        mx: 2,
                        maxHeight: '800px',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                      >
                        <img src={selectedDesign.designThumbnail} width="70%" />
                      </Box>
                    </Box>

                    <Box
                      className="design-info"
                      sx={{
                        mt: 1,
                        display: 'flex',
                        flexWrap: 'true',
                        height: '100%',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Box
                        className="item-list"
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          height: '200px',
                          overflow: 'auto',
                          width: 'auto',
                        }}
                      >
                        <ul style={{ columnCount: 2, columnGap: '30px' }}>
                          <strong>Items: </strong>
                          {Object.entries(itemList).map(([itemName, count]) => (
                            <div key={itemName}>
                              <li>
                                {itemName}: {count}
                              </li>
                            </div>
                          ))}
                        </ul>
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    top: '50%',
                    pt: 20,
                  }}
                >
                  Select A Design to view details{' '}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DesignPage;