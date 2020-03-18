import { renderHook } from '@testing-library/react-hooks'
import * as events from 'events'
import React from 'react'
import { Provider } from 'react-redux'
import { expectSaga } from 'redux-saga-test-plan'
import { call } from 'redux-saga/effects'

import * as api from '../api'
import { transformEventResponse } from '../api'
import { loadEvents } from '../server/data/events'
import { authSlice, login, logout } from './auth'
import { initializeStore, initialRootState } from './config'
import { eventSagas, eventSlice, eventsLoadingSaga, fetchEvents, fetchEventTriggersSaga, useEvents } from './events'

describe('events', () => {
  describe('useEvents', () => {
    it('returns values from store correctly', async () => {
      const { result } = renderHook(() => useEvents(), {
        wrapper: props => (
          <Provider
            {...props}
            store={initializeStore({
              auth: { isLoggedIn: 'unknown' },
              events: {
                initialized: true,
                loading: false,
                data: {},
              },
            })}
          />
        ),
      })

      expect(result.error).toBeUndefined()
      expect(result.current.initialized).toBeTruthy()
      expect(result.current.loading).toBeFalsy()
      expect(result.current.events).toEqual({})
    })
  })

  describe('event sagas', () => {
    const events = transformEventResponse(loadEvents())

    describe('root saga', () => {
      it('initializes the events', () => {
        // @ts-ignore
        return expectSaga(eventSagas)
          .withReducer(eventSlice.reducer)
          .withState(initialRootState)
          .put(fetchEvents())
          .silentRun()
      })
    })

    describe('fetchEventTriggersSaga', () => {
      it('fires API calls when fetchEvents actions are called', () => {
        return expectSaga(fetchEventTriggersSaga)
          .provide([[call(api.fetchEvents), events]])
          .withReducer(eventSlice.reducer)
          .withState(initialRootState)
          .dispatch(fetchEvents())
          .call(api.fetchEvents)
          .put(eventSlice.actions.fetchedEvents(events))
          .silentRun()
      })
    })

    describe('eventsLoadingSaga', () => {
      it('dispatches fetchingEvents (to track loading) on login', () => {
        return expectSaga(eventsLoadingSaga)
          .put(eventSlice.actions.fetchingEvents())
          .dispatch(login())
          .silentRun()
      })

      it('dispatches fetchingEvents (to track loading) on logout', () => {
        return expectSaga(eventsLoadingSaga)
          .put(eventSlice.actions.fetchingEvents())
          .dispatch(logout())
          .silentRun()
      })

      it('dispatches fetchEvents on loggedIn', () => {
        return expectSaga(eventsLoadingSaga)
          .put(fetchEvents())
          .dispatch(authSlice.actions.loggedIn)
          .silentRun()
      })

      it('dispatches fetchEvents on loggedOut', () => {
        return expectSaga(eventsLoadingSaga)
          .put(fetchEvents())
          .dispatch(authSlice.actions.loggedOut)
          .silentRun()
      })
    })

    describe('fetchEventTriggersSaga', () => {
      it('handles fetchEvent dispatches', () => {
        return expectSaga(fetchEventTriggersSaga)
          .provide([[call(api.fetchEvents), events]])
          .withReducer(eventSlice.reducer)
          .withState(initialRootState)
          .put(eventSlice.actions.fetchedEvents(events))
          .dispatch(fetchEvents())
          .silentRun()
      })
    })
  })
})
