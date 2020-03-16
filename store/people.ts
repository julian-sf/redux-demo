import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { fetchPeople, People } from '../api'
import { RootState } from './root'

const initialState = {} as People

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    fetchPeople: (state, action: { payload: People }) => action.payload,
    resetPeople: () => initialState,
  },
})

export const usePeople = () => {
  return useSelector((state: RootState) => state.people)
}

export const getPeople = () => async dispatch => {
  const people = await fetchPeople()
  dispatch(peopleSlice.actions.fetchPeople(people))
}

export const resetPeople = () => async dispatch => {
  dispatch(peopleSlice.actions.resetPeople())
}
