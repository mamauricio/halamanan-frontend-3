import { FavoritesContext } from '../context/FavoritesContext';
import { useContext } from 'react';

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw Error('context must be used inside itemsContext provider');
  }

  return context;
};
