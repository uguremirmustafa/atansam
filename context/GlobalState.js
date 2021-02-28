import React, { createContext, useReducer } from 'react';
import reducers from './Reducers';
export const AppContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    tercihler: [],
    modalOpen: false,
    searchTerm: '',
    province: '',
    city: '',
    clicked: false,
    il: '',
  };
  const [state, dispatch] = useReducer(reducers, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
