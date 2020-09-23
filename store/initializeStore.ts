import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authSlice, initialAuthState } from './auth/slice';
import { eventSlice, initialEventsState } from './events/slice';
import { RootState } from './types';

export const initialRootState: RootState = {
  [authSlice.name]: initialAuthState,
  [eventSlice.name]: initialEventsState,
};

export const initializeStore = (preloadedState: RootState = initialRootState) =>
  configureStore({
    reducer: combineReducers<RootState>({
      [authSlice.name]: authSlice.reducer,
      [eventSlice.name]: eventSlice.reducer,
    }),
    ...(preloadedState ? { preloadedState } : {}),
  });
