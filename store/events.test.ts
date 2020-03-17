import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { eventSlice, getEvents, resetEvents } from './events'

import { RootState } from './index'

const mockStore = configureMockStore<Partial<RootState>>([thunk])

describe('people store', () => {
  const store = mockStore({})

  beforeEach(() => {
    store.clearActions()
  })

  describe('resetPeople', () => {
    it('sends the right action', () => {
      return store.dispatch<any>(resetEvents()).then(() => {
        expect(store.getActions()).toEqual([eventSlice.actions.resetEvents()])
      })
    })
  })

  describe('getPeople', () => {
    it('sends the right action', () => {
      return store.dispatch<any>(getEvents()).then(() => {
        expect(store.getActions()).toEqual([
          {
            ...eventSlice.actions.fetchEvents(),
          },
        ])
      })
    })
  })
})
