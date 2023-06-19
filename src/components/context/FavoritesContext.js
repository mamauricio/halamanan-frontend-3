import { createContext, useReducer } from 'react';

export const FavoritesContext = new createContext();

export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'GET_FAVORITES':
      return {
        favorites: action.payload,
      };

    case 'ADD_TO_FAVORITES':
      return {
        favorites: [action.payload, ...state.favorites],
      };

    default:
      return state;
  }
};

export const FavoritesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, {
    favorites: null,
  });

  return (
    <FavoritesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
