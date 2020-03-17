import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { transformEventResponse } from '../api'
import { loadEvents } from '../server/data/events'
import { RootState } from '../store'
import { renderWithRedux } from '../utils/tests'
import { Events } from './Events'

const mockStore = configureMockStore<Partial<RootState>>([thunk])

function mockFetchEvents() {
  const original = jest.requireActual('../api/index')

  return {
    ...original,
    fetchEvents: jest.fn(),
  }
}

jest.mock('../api/index', () => mockFetchEvents())

const apiMock = jest.requireMock('../api/index')

describe('events store', () => {
  const store = mockStore({})

  beforeEach(() => {
    store.clearActions()
  })

  // this isn't a very useful test, but it just kinda goes to show how difficult testing redux stores can be with just
  // dispatches and actions
  describe('Make sure request completes, and links are rendered correctly', () => {
    it('getEvents calls the api functions as expected', async () => {
      // setup mocks
      const results = transformEventResponse(loadEvents())
      apiMock.fetchEvents.mockImplementationOnce(() => results)

      // dispatch actions
      const wrapper = renderWithRedux(<Events />)

      // make sure the mock was called
      expect(apiMock.fetchEvents).toHaveBeenCalled()

      // there should be 5 items on display with names...
      expect(await wrapper.findAllByText(/Name:/)).toHaveLength(5)

      // verify two of the links generated
      expect(await wrapper.findByText('Name: David Copperfield')).toHaveProperty(
        'href',
        'http://localhost/david-copperfield',
      )

      expect(await wrapper.findByText('Name: Entertainment')).toHaveProperty(
        'href',
        'http://localhost/mgm-resorts-entertainment',
      )
    })
  })
})
