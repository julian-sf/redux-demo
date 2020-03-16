import { createAction, createReducer } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { setLoggedInState } from '../api'
import { getPeople } from './people'

import { AppThunk, RootState } from './index'

const loginAction = createAction('auth/login')
const logoutAction = createAction('auth/logout')

const initialState = { loggedIn: false }

export const authReducer = createReducer(initialState, {
  [loginAction.type]: state => {
    setLoggedInState(true)
    state.loggedIn = true
  },
  [logoutAction.type]: state => {
    setLoggedInState(false)
    state.loggedIn = false
  },
})

export const useLoggedIn = () => {
  return useSelector((state: RootState) => state.auth.loggedIn)
}

export const login = (): AppThunk => async dispatch => {
  dispatch(loginAction())
  // ... any other state that requires an update on login should be updated here
  dispatch(getPeople())
}

export const logout = (): AppThunk => async dispatch => {
  dispatch(logoutAction())
  // ... any other state that requires an update on logout should be updated here
  dispatch(getPeople())
}
