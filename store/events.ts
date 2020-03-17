import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { Events, fetchEvents } from '../api'
import { isEmptyObject } from '../utils/isEmptyObject'
import { updateLoggedInStatus } from './auth'

import { RootState } from './index'

const initialState = { data: {} as Events, loading: false }

export const eventSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    fetchingEvents: state => {
      state.loading = true
    },
    fetchedEvents: (state, action: { payload: Events }) => {
      state.loading = false
      state.data = action.payload
    },
    resetEvents: state => {
      state.loading = false
      state.data = {}
    },
  },
})

// dispatchable actions

export const getEvents = () => async dispatch => {
  dispatch(eventSlice.actions.fetchingEvents())
  const events = await fetchEvents()
  dispatch(eventSlice.actions.fetchedEvents(events))
}

export const resetEvents = () => async dispatch => {
  dispatch(eventSlice.actions.resetEvents())
}

// hooks

export const useEvents = () => {
  const loading = useSelector((state: RootState) => state.events.loading)
  const events = useSelector((state: RootState) => state.events.data)
  const dispatch = useDispatch()

  if (!loading && isEmptyObject(events)) {
    dispatch(getEvents())
    dispatch(updateLoggedInStatus())
  }

  return {
    loading,
    events,
  }
}
