import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { call, put, select, spawn, takeLatest } from 'redux-saga/effects'

import * as api from '../api'
import { CallResult } from '../utils/unpack'
import { RootState } from './config'
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
    loggedIn: (state, action: PayloadAction<{ user?: string }>) => {
      state.isLoggedIn = true
      state.name = action.payload.user
    },
    loggedOut: state => {
      state.isLoggedIn = false
      delete state.name
    },
  },
})

// actions
export const login = createAction('auth/login')
export const logout = createAction('auth/logout')

// sagas

function* loginSaga() {
  yield takeLatest(login.type, function*() {
    const result: CallResult<typeof api.fetchLogin> = yield call(api.fetchLogin)
    yield put(authSlice.actions.loggedIn(result))
  })
}

function* logoutSaga() {
  yield takeLatest(logout.type, function*() {
    yield call(api.fetchLogout)
    yield put(authSlice.actions.loggedOut())
  })
}

function* checkUserStatusSaga() {
  const data: CallResult<typeof api.fetchUserStatus> = yield call(api.fetchUserStatus)
  yield put(authSlice.actions.checkLoginStatus(data))
}

export function* authSagas() {
  const isLoggedIn: RootState['auth']['isLoggedIn'] = yield select((state: RootState) => state.auth.isLoggedIn)

  if (isLoggedIn === 'unknown') {
    yield spawn(checkUserStatusSaga)
  }

  yield spawn(loginSaga)
  yield spawn(logoutSaga)
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
