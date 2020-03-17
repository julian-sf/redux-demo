import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { Events, fetchEvents } from '../api'

import { RootState } from './index'

export const eventSlice = createSlice({
  name: 'people',
  initialState: {} as Events,
  reducers: {
    fetchEvents: (state, action: { payload: Events }) => action.payload,
    resetEvents: () => ({}),
  },
})

export const useEvents = () => {
  return useSelector((state: RootState) => state.events)
}

export const getEvents = () => async dispatch => {
  const events = await fetchEvents()
  dispatch(eventSlice.actions.fetchEvents(events))
}

export const resetEvents = () => async dispatch => {
  dispatch(eventSlice.actions.resetEvents())
}
