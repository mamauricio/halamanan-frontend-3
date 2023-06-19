import { createContext, useReducer } from 'react';

export const NewDesignContext = new createContext();

export const newDesignReducer = (state, action) => {
  switch (action.type) {
    case 'create':
      return { new: true };

    case 'edit':
      return { new: false };
  }
};

export const DesignsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newDesignReducer, {
    designs: null,
  });

  return (
    <NewDesignContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NewDesignContext.Provider>
  );
};
