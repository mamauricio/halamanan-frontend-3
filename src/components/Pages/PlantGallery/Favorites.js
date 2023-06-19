import React, { useState, useEffect } from 'react';
import { useFavoritesContext } from '../../hooks/useFavoritesContext';

const Favorites = (props) => {
 const { favorites, dispatch } = useFavoritesContext();
 // const [favorites, setFavorites] = useState([])
 const [selected, setSelected] = useState('');

 useEffect(() => {
  axios
   .get('https://halamanan-197e9734b120.herokuapp.com/gallery')
   .then((response) => {
    const fetchedItems = response.data;
    dispatch({
     type: 'SET_FAVORITES',
     payload: { fetchedItems },
    });
    //console.log(('tray items fetched');
   })
   .catch((error) => {
    //console.log(('Error fetching items: ', error.data);
   });
 }, []);

 const handleSelectedItem = () => {};

 return <Box></Box>;
};

export default Favorites;
