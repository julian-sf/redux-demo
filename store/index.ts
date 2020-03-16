import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authReducer } from './auth'
import { peopleReducer } from './people'

export const rootReducer = combineReducers({
  auth: authReducer,
  people: peopleReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const initializeStore = (preloadedState?: RootState) => {
  const defaultOptions = {
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    ...(preloadedState ? { preloadedState } : {}),
  }

  const isSSR = typeof window === 'undefined'

  if (isSSR) {
    return configureStore(defaultOptions)
  }

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const store = configureStore({
    ...defaultOptions,
    reducer: persistReducer(persistConfig, rootReducer),
  })

  // @ts-ignore
  store.__PERSISTOR = persistStore(store)

  return store
}
