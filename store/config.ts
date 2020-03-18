import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { authSlice, initialAuthState } from './auth'
import { eventSlice, initialEventsState } from './events'

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  events: eventSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const initialRootState: RootState = {
  auth: initialAuthState,
  events: initialEventsState,
}

export const sagaMiddleware = createSagaMiddleware()

export const initializeStore = (preloadedState?: RootState) => {
  const defaultOptions = {
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
    ...(preloadedState ? { preloadedState } : {}),
  }

  return configureStore(defaultOptions)
}
