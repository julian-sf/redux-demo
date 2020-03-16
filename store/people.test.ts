import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { transformPeopleResponse } from '../api'
import people from '../api/data/people.json'
import { getPeople, peopleSlice, resetPeople } from './people'

import { RootState } from './index'

const mockStore = configureMockStore<Partial<RootState>>([thunk])

describe('people store', () => {
  const store = mockStore({})

  beforeEach(() => {
    store.clearActions()
  })

  describe('resetPeople', () => {
    it('sends the right action', () => {
      return store.dispatch<any>(resetPeople()).then(() => {
        expect(store.getActions()).toEqual([peopleSlice.actions.resetPeople()])
      })
    })
  })

  describe('getPeople', () => {
    it('sends the right action', () => {
      return store.dispatch<any>(getPeople()).then(() => {
        expect(store.getActions()).toEqual([
          {
            ...peopleSlice.actions.fetchPeople(),
            payload: {
              ...transformPeopleResponse(people),
            },
          },
        ])
      })
    })
  })
})
