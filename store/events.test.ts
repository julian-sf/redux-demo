import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { eventSlice, resetEvents } from './events'

import { RootState } from './index'

const mockStore = configureMockStore<Partial<RootState>>([thunk])

describe('events store', () => {
  const store = mockStore({})

  beforeEach(() => {
    store.clearActions()
  })

  // this isn't a very useful test, but it just kinda goes to show how difficult testing redux stores can be with just
  // dispatches and actions
  describe('resetEvents', () => {
    it('sends the right action', () => {
      return store.dispatch<any>(resetEvents()).then(() => {
        expect(store.getActions()).toEqual([eventSlice.actions.resetEvents()])
      })
    })
  })
})
