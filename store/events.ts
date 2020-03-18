import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { call, put, select, spawn, takeLatest } from 'redux-saga/effects'

import * as api from '../api'
import { authSlice, login, logout } from './auth'
import { RootState } from './config'
import { useSelector } from './useSelector'

interface EventSliceState {
  data: api.Events
  loading: boolean
  initialized: boolean
}

export const initialEventsState: EventSliceState = { data: {}, loading: false, initialized: false }

export const eventSlice = createSlice({
  name: 'event',
  initialState: initialEventsState,
  reducers: {
    fetchingEvents: state => {
      state.loading = true
    },
    fetchedEvents: (state, action: PayloadAction<api.Events>) => {
      state.loading = false
      state.initialized = true
      state.data = action.payload
    },
  },
})

export const fetchEvents = createAction('event/fetchEvents')

// sagas

export function* eventsLoadingSaga() {
  yield takeLatest([login.type, logout.type], function*() {
    yield put(eventSlice.actions.fetchingEvents())
  })

  yield takeLatest([authSlice.actions.loggedOut.type, authSlice.actions.loggedIn.type], function*() {
    yield put(fetchEvents())
  })
}

export function* fetchEventTriggersSaga() {
  yield takeLatest(fetchEvents.type, function*() {
    const events = yield call(api.fetchEvents)
    yield put(eventSlice.actions.fetchedEvents(events))
  })
}

export function* eventSagas() {
  // spawn sagas
  yield spawn(fetchEventTriggersSaga)
  yield spawn(eventsLoadingSaga)

  // initialize
  const initialized: RootState['events']['initialized'] = yield select((state: RootState) => state.events.initialized)

  if (!initialized) {
    yield put(fetchEvents())
  }
}

// hooks

export const useEvents = () => {
  return {
    loading: useSelector(state => state.events.loading),
    events: useSelector(state => state.events.data),
    initialized: useSelector(state => state.events.initialized),
  }
}
