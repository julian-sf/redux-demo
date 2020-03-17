import { EventData } from '../server/data/events'

const HOST = 'http://localhost:3333'

export interface Events {
  [id: string]: EventData
}

export const transformEventResponse = (events: EventData[]): Events => {
  return events.reduce((accumulator, event) => {
    accumulator[event.id] = event

    return accumulator
  }, {})
}

export const fetchEvents = async () => {
  const response = await fetch(`${HOST}/events`, { credentials: 'include' })

  return transformEventResponse(await response.json())
}

export const fetchLogin = async () => {
  const response = await fetch(`${HOST}/login`, { method: 'POST', credentials: 'include' })

  return await response.json()
}

export const fetchLogout = async () => {
  return await fetch(`${HOST}/logout`, { method: 'POST', credentials: 'include' })
}

export const fetchUserStatus = async () => {
  const response = await fetch(`${HOST}/user`, { credentials: 'include' })

  if (!response.ok) {
    return {}
  }

  return await response.json()
}
