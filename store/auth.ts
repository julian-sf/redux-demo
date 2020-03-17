import { createAction, createSlice, PrepareAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { fetchLogin, fetchLogout, fetchUserStatus } from '../api'
import { getEvents } from './events'

import { RootState } from './index'

const seeIfLoggedIn = () => {
  return typeof document !== 'undefined' && document.cookie.includes('Auth=true')
}

const initialState: { isLoggedIn: boolean | 'unknown'; name?: string } = {
  isLoggedIn: 'unknown',
  name: '<loading>',
}

// pulled out from `createSlice` to make typing cleaner
const _checkLoginStatus = createAction<PrepareAction<{ user?: string }>>('checkLoginStatus', result => ({
  payload: result,
}))

const _login = createAction('login', (result: { user: string }) => ({ payload: result }))

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [_checkLoginStatus.type]: (state: typeof initialState, action: ReturnType<typeof _checkLoginStatus>) => {
      state.isLoggedIn = seeIfLoggedIn()
      state.name = action.payload.user
    },
    [_login.type]: (state: typeof initialState, action: ReturnType<typeof _login>) => {
      state.isLoggedIn = true
      state.name = action.payload.user
    },
    logout: (state: typeof initialState) => {
      state.isLoggedIn = false
      delete state.name
    },
  },
})

// actions

export const login = () => async dispatch => {
  dispatch(authSlice.actions.login(await fetchLogin()))
  dispatch(getEvents())
}

export const logout = () => async dispatch => {
  await fetchLogout()
  dispatch(authSlice.actions.logout())
  dispatch(getEvents())
}

export const updateLoggedInStatus = () => async dispatch => {
  dispatch(authSlice.actions.checkLoginStatus(await fetchUserStatus()))
}

// selectors/hooks

export const useLoggedIn = () => {
  const result = useSelector((state: RootState) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  let loggedIn: boolean | 'unknown' = 'unknown'

  if (typeof window !== 'undefined') {
    loggedIn = result
  }

  return { loggedIn, login: () => dispatch(login()), logout: () => dispatch(logout()) }
}

export const useUserName = () => {
  return useSelector((state: RootState) => state.auth.name)
}
