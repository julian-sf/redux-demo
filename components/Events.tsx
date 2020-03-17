import React, { useState, useEffect } from 'react'

import { fetchEvents } from '../api'
import { useQuery } from '../api/fetchingLibrary/useQuery'
import { useAuthContext } from '../contexts/AuthContext/useAuthContext'
import { Event } from './Event'

export const Events = () => {
  const { userInfo } = useAuthContext()
  const [events, setEvents] = useState({})
  const { fetch } = useQuery(fetchEvents, { onComplete: setEvents, skip: true })

  useEffect(() => {
    fetch()
  }, [userInfo.isLoggedIn, fetch])

  return (
    <>
      <button type={'button'} onClick={() => setEvents({})}>
        Clear Events
      </button>
      <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '20px 40px' }}>
        {Object.keys(events).map(id => {
          const event = events[id]

          return <Event key={event.id} event={event} />
        })}
      </div>
    </>
  )
}
