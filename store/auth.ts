import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { fetchLogin, fetchLogout, fetchUserStatus } from '../api'
import { eventSlice, getEvents } from './events'
import { useSelector } from './useSelector'

interface AuthSliceState {
  isLoggedIn: boolean | 'unknown'
  name?: string
}

export const initialAuthState: AuthSliceState = {
  isLoggedIn: 'unknown',
  name: '<loading>',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    checkLoginStatus: (state, action: PayloadAction<{ user?: string }>) => {
      state.isLoggedIn = typeof document !== 'undefined' && document.cookie.includes('Auth=true')
      state.name = action.payload.user
    },
    login: (state, action: PayloadAction<{ user?: string }>) => {
      state.isLoggedIn = true
      state.name = action.payload.user
    },
    logout: state => {
      state.isLoggedIn = false
      delete state.name
    },
  },
})

// actions

export const login = () => async dispatch => {
  dispatch(eventSlice.actions.fetchingEvents())
  dispatch(authSlice.actions.login(await fetchLogin()))
  dispatch(getEvents())
}

export const logout = () => async dispatch => {
  dispatch(eventSlice.actions.fetchingEvents())
  await fetchLogout()
  dispatch(authSlice.actions.logout())
  dispatch(getEvents())
}

export const updateLoggedInStatus = () => async dispatch => {
  dispatch(authSlice.actions.checkLoginStatus(await fetchUserStatus()))
}

// hooks

export const useAuth = () => {
  const loggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  return { loggedIn, login: () => dispatch(login()), logout: () => dispatch(logout()) }
}

export const useUserName = () => {
  return useSelector(state => state.auth.name)
}
