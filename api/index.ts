import people from './data/people.json'
import peopleLoggedIn from './data/peopleLoggedIn.json'

let loggedIn = false

export const setLoggedInState = (value: boolean) => (loggedIn = value)

export interface Person {
  name: string
  id: string
  bestFriend?: string
  friends?: string[]
  hobbies?: string[]
}

export type People = { [id: string]: Person }

const fetchData = <T>(data: T, timeout = 100) => {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(data)
    }, timeout)
  })
}

const transformPeopleResponse = (people: Person[]): People => {
  return people.reduce((accumulator, person) => {
    accumulator[person.id] = person

    return accumulator
  }, {})
}

const fetchPeople = (timeout?: number) => {
  if (loggedIn) {
    return fetchData<People>(transformPeopleResponse(peopleLoggedIn), timeout)
  }

  return fetchData<People>(transformPeopleResponse(people), timeout)
}

export { fetchPeople }
