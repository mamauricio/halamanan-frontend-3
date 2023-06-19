import { NewDesignContext } from '../context/NewDesignContext';
import { useContext } from 'react';

export const useNewDesignContext = () => {
  const context = useContext(NewDesignContext);

  if (!context) {
    throw Error('context must be used inside itemsContext provider');
  }

  return context;
};
