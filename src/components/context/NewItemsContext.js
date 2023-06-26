import React, { createContext, useReducer } from 'react';

export const NewItemsContext = createContext();

export const newItemsReducer = (state, action) => {
 switch (action.type) {
  case 'GET_NEW_ITEMS':
   return {
    newItems: action.payload,
   };

  case 'REMOVE_NEW_ITEM':
   const updatedItems = state.newItems.filter(
    (item) => item._id !== action.payload
   );
   return { ...state, newItems: updatedItems };

  case 'SET_SELECTED_ITEM':
   return {
    ...state,
    selectedItem: action.payload,
   };

  default:
   throw new Error('Unknown action type');
 }
};

export const NewItemsContextProvider = ({ children }) => {
 const [state, dispatch] = useReducer(newItemsReducer, {
  newItems: [],
  selectedItem: null,
 });

 return (
  <NewItemsContext.Provider value={{ ...state, dispatch }}>
   {children}
  </NewItemsContext.Provider>
 );
};
