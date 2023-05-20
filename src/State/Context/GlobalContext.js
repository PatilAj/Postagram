import React, { createContext, useEffect, useReducer } from 'react';
import {GlobalReducer} from '../Reducer/GlobalReducer';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../../Firebase/Config';
import useFetchCurrentUser from '../../Management/useFetchCurrentUser'

const intialState = {
  user: {},
  isAuthenticated: false,
  isOnboarded: false,
  isLoading: true,
  isPostModalOpen: false,
};

export const GlobalContext = createContext(intialState);
export const GlobalDispatchContext = createContext(() => {});

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, intialState);
  const { fetchUser } = useFetchCurrentUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch({
          type: 'SET_IS_AUTHENTICATED',
          payload: {
            isAuthenticated: true,
          },
        });
        const userData = await fetchUser();
        if (userData) {
          dispatch({
            type: 'SET_USER',
            payload: {
              user: userData,
            },
          });
          dispatch({
            type: 'SET_IS_ONBOARDED',
            payload: {
              isOnboarded: true,
            },
          });
        }
      }
      dispatch({
        type: 'SET_LOADING',
        payload: {
          isLoading: false,
        },
      });
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
