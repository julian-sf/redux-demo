import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { setLoggedInState } from '../api'
import { getPeople } from './people'

import { RootState } from './index'

const initialState = { loggedIn: false }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      setLoggedInState(true)
      state.loggedIn = true
    },
    logout: state => {
      setLoggedInState(false)
      state.loggedIn = false
    },
  },
})

export const useLoggedIn = () => {
  return useSelector((state: RootState) => state.auth.loggedIn)
}

export const login = () => async dispatch => {
  dispatch(authSlice.actions.login())
  // ... any other state that requires an update on login should be updated here
  dispatch(getPeople())
}

export const logout = () => async dispatch => {
  dispatch(authSlice.actions.logout())
  // ... any other state that requires an update on logout should be updated here
  dispatch(getPeople())
}
