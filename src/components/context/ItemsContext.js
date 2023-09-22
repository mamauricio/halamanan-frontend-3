import { StaticTimePicker } from '@mui/lab';
import { createContext, useReducer } from 'react';

export const ItemsContext = new createContext();

export const itemsReducer = (state, action) => {
 switch (action.type) {
  case 'GET_ITEMS':
   return {
    items: action.payload,
   };

  case 'ADD_NEW_ITEM':
   return {
    items: [...state.items, action.payload],
   };

  case 'REMOVE_ITEM':
   const updatedItems = state.items.filter(
    (item) => item.itemKey !== action.payload.itemKey
   );
   return { ...state, items: updatedItems };
  case 'RESIZE_ITEM':
   return {
    ...state.items,
    items: state.items.map((item) =>
     item.itemKey === action.payload.itemKey
      ? {
         ...item,
         width: action.payload.newData.width,
         height: action.payload.newData.height,
        }
      : item
    ),
   };

  case 'MOVE_ITEM':
   return {
    ...state,
    items: state.items.map((item) =>
     item.itemKey === action.payload.itemKey
      ? {
         ...item,
         x: action.payload.newData.x,
         y: action.payload.newData.y,
        }
      : item
    ),
   };

  case 'FLIP_ITEM': {
   return {
    ...state,
    items: state.items.map((item) =>
     item.itemKey === action.payload.itemKey
      ? {
         ...item,
         flip: action.payload.newData.flip,
        }
      : item
    ),
   };
  }

  case 'ROTATE_ITEM': {
   return {
    ...state,
    items: state.items.map((item) =>
     item.itemKey === action.payload.itemKey
      ? {
         ...item,
         rotate: action.payload.newData.rotate,
        }
      : item
    ),
   };
  }

  case 'SET_SELECTED_ITEM':
   return {
    items: { ...state, itemKey: action.payload },
   };
  case 'RESET_ITEMS':
   return {
    items: [],
   };

  default:
   return Error();
 }
};

export const ItemsContextProvider = ({ children }) => {
 const [state, dispatch] = useReducer(itemsReducer, {
  items: [],
 });

 return (
  <ItemsContext.Provider value={{ ...state, dispatch }}>
   {children}
  </ItemsContext.Provider>
 );
};
