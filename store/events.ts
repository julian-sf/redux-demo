import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { Events, fetchEvents } from '../api'
import { isEmptyObject } from '../utils/isEmptyObject'
import { updateLoggedInStatus } from './auth'

import { RootState } from './index'

const initialState = { data: {} as Events, loading: false, initialized: false }

export const eventSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    fetchingEvents: state => {
      state.loading = true
    },
    fetchedEvents: (state, action: { payload: Events }) => {
      state.loading = false
      state.initialized = true
      state.data = action.payload
    },
  },
})

// dispatchable actions

export const getEvents = () => async dispatch => {
  dispatch(eventSlice.actions.fetchingEvents())
  const events = await fetchEvents()
  dispatch(eventSlice.actions.fetchedEvents(events))
}

// hooks

export const useEvents = (skip = false) => {
  const loading = useSelector((state: RootState) => state.events.loading)
  const initialized = useSelector((state: RootState) => state.events.initialized)
  const events = useSelector((state: RootState) => state.events.data)
  const dispatch = useDispatch()

  if (skip) {
    return {
      loading: false,
      events: null,
      initialized,
    }
  }

  if (!loading && isEmptyObject(events)) {
    dispatch(getEvents())
    dispatch(updateLoggedInStatus())
  }

  return {
    loading,
    events,
    initialized,
  }
}
