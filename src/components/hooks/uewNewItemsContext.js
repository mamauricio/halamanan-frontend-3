import { NewItemsContext } from '../context/NewItemsContext';
import { useContext } from 'react';

export const useNewItemsContext = () => {
 const context = useContext(NewItemsContext);

 if (!context) {
  throw Error('context must be used inside newItemsContext provider');
 }

 return context;
};
