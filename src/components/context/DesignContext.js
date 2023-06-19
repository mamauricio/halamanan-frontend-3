import { createContext, useReducer } from 'react';

export const DesignsContext = new createContext();

export const designsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DESIGNS':
      return {
        designs: action.payload,
      };

    case 'CREATE_DESIGN':
      return {
        designs: [action.payload, ...state.designs],
      };

    case 'EDIT_DESIGN':
      return {
        ...state.designs,
        designs: state.designs.map((design) =>
          design.designId === action.payload.designId
            ? {
                ...design,
                designThumbnail: action.payload.newData.designName,
                backgroundImage: action.payload.newData.backgroundImage,
                designDescription: action.payload.newData.designDescription,
                items: action.payload.newData.items,
                designName: action.payload.newData.designName,
              }
            : design
        ),
      };

    default:
      return state;
  }
};

export const DesignsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(designsReducer, {
    designs: null,
  });

  return (
    <DesignsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DesignsContext.Provider>
  );
};
