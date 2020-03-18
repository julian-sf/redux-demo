import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { call, put, spawn, takeLatest } from 'redux-saga/effects'

import { fetchLogin, fetchLogout, fetchUserStatus } from '../api'
import { CallResult } from '../utils/unpack'
import { useSelector } from './useSelector'

const initialState: { isLoggedIn: boolean | 'unknown'; name?: string } = {
  isLoggedIn: 'unknown',
  name: '<loading>',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkLoginStatus: (state: typeof initialState, action: PayloadAction<{ user?: string }>) => {
      state.isLoggedIn = typeof document !== 'undefined' && document.cookie.includes('Auth=true')
      state.name = action.payload.user
    },
    loggedIn: (state: typeof initialState, action: PayloadAction<{ user?: string }>) => {
      state.isLoggedIn = true
      state.name = action.payload.user
    },
    loggedOut: (state: typeof initialState) => {
      state.isLoggedIn = false
      delete state.name
    },
  },
})

// actions
const login = createAction('auth/login')
const logout = createAction('auth/logout')

// sagas

function* loginSaga() {
  yield takeLatest(login.type, function*() {
    const result: CallResult<typeof fetchLogin> = yield call(fetchLogin)
    yield put(authSlice.actions.loggedIn(result))
  })
}

function* logoutSaga() {
  yield takeLatest(logout.type, function*() {
    yield call(fetchLogout)
    yield put(authSlice.actions.loggedOut())
  })
}

function* checkUserStatusSaga() {
  const data: CallResult<typeof fetchUserStatus> = yield call(fetchUserStatus)
  yield put(authSlice.actions.checkLoginStatus(data))
}

export function* authSagas() {
  // spawn sagas
  yield spawn(checkUserStatusSaga)
  yield spawn(loginSaga)
  yield spawn(logoutSaga)
}

// hooks

export const useLoggedIn = () => {
  const result = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  let loggedIn: boolean | 'unknown' = 'unknown'

  if (typeof window !== 'undefined') {
    loggedIn = result
  }

  return { loggedIn, login: () => dispatch(login()), logout: () => dispatch(logout()) }
}

export const useUserName = () => {
  return useSelector(state => state.auth.name)
}
