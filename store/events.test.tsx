import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { Provider } from 'react-redux'

import { transformEventResponse } from '../api'
import { loadEvents } from '../server/data/events'
import { initializeStore } from './config'
import { useEvents } from './events'

jest.mock('../api/index', () => ({
  ...jest.requireActual('../api/index'),
  fetchEvents: jest.fn(),
}))

const apiMock = jest.requireMock('../api/index')
const results = transformEventResponse(loadEvents())

describe('events store', () => {
  describe('useEvents', () => {
    it('fetches when store is not initialized', async () => {
      apiMock.fetchEvents.mockImplementationOnce(() => results)

      const { result } = renderHook(() => useEvents(), {
        wrapper: props => (
          <Provider
            {...props}
            store={initializeStore({
              auth: { isLoggedIn: 'unknown' },
              events: {
                initialized: false,
                loading: false,
                data: {},
              },
            })}
          />
        ),
      })

      // tell react we EXPECT changes to happen on promise resolution and wait for them to finish
      await act(() => Promise.resolve())

      expect(apiMock.fetchEvents).toHaveBeenCalled()
      expect(result.error).toBeUndefined()
      expect(result.current.initialized).toBeTruthy()
      expect(result.current.loading).toBeFalsy()
      expect(result.current.events).toEqual(results)
    })
  })
})
