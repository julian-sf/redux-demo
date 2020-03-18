import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { call, put, spawn, takeLatest } from 'redux-saga/effects'

import { Events, fetchEvents } from '../api'
import { authSlice } from './auth'
import { useSelector } from './useSelector'

interface EventSliceState {
  data: Events
  loading: boolean
  initialized: boolean
}

const initialState: EventSliceState = { data: {}, loading: false, initialized: false }

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    fetchEvents: state => {
      state.loading = true
    },
    fetchedEvents: (state, action: PayloadAction<Events>) => {
      state.loading = false
      state.initialized = true
      state.data = action.payload
    },
  },
})

// sagas

function* fetchEventSaga() {
  const events = yield call(fetchEvents)
  yield put(eventSlice.actions.fetchedEvents(events))
}

function* fetchEventTriggersSaga() {
  yield takeLatest(
    [authSlice.actions.loggedOut.type, authSlice.actions.loggedIn.type, eventSlice.actions.fetchEvents.type],
    function*() {
      yield call(fetchEventSaga)
    },
  )
}

export function* eventSagas() {
  yield spawn(fetchEventSaga)
  yield spawn(fetchEventTriggersSaga)
}

// hooks

export const useEvents = (skip = false) => {
  const loading = useSelector(state => state.events.loading)
  const initialized = useSelector(state => state.events.initialized)
  const events = useSelector(state => state.events.data)

  if (skip) {
    return {
      loading: false,
      events: null,
      initialized,
    }
  }

  return {
    loading,
    events,
    initialized,
  }
}
