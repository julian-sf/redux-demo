import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { authSlice, initialAuthState } from './auth';
import { eventSlice, initialEventsState } from './events';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  events: eventSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const initialRootState: RootState = {
  auth: initialAuthState,
  events: initialEventsState,
};

export const initializeStore = (preloadedState?: RootState) =>
  configureStore({
    reducer: rootReducer,
    ...(preloadedState ? { preloadedState } : {}),
  });
