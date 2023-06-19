import { DesignsContext } from '../context/DesignContext';
import { useContext } from 'react';

export const useDesignContext = () => {
  const context = useContext(DesignsContext);

  if (!context) {
    throw Error('context must be used inside designcontext provider');
  }

  return context;
};
