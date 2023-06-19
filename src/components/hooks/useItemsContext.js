import { ItemsContext } from '../context/ItemsContext';
import { useContext } from 'react';

export const useItemsContext = () => {
  const context = useContext(ItemsContext);

  if (!context) {
    throw Error('context must be used inside itemsContext provider');
  }

  return context;
};
