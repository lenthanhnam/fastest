// import React, { createContext, useContext, useReducer } from 'react';

// export const StateContext = createContext();

// export const StateProvider = ({ reducer, initialState, children }) => (
//     <StateContext.Provider value={useReducer(reducer, initialState)}>
//       {children}
//     </StateContext.Provider>
//   );

// export const useStateValue = () => useContext(StateContext);


import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchUser } from "../utils/fetchLocalStorage";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const userInfo = fetchUser();
    if (userInfo) {
      dispatch({ type: "SET_USER", payload: userInfo });
    }
  }, []);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);