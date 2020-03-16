import { createAction, createReducer } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { fetchPeople, People } from '../api'

import { AppThunk, RootState } from './index'

const fetchPeopleAction = createAction('people/fetchPeople', (people: People) => ({ payload: people }))
const resetPeopleAction = createAction('people/resetPeople')

const initialState = {} as People

export const peopleReducer = createReducer(initialState, {
  [fetchPeopleAction.type]: (state, action: ReturnType<typeof fetchPeopleAction>) => action.payload,
  [resetPeopleAction.type]: () => initialState,
})

export const usePeople = () => {
  return useSelector((state: RootState) => state.people)
}

export const getPeople = (): AppThunk => async dispatch => {
  const people = await fetchPeople()
  dispatch(fetchPeopleAction(people))
}

export const resetPeople = (): AppThunk => async dispatch => {
  dispatch(resetPeopleAction())
}
