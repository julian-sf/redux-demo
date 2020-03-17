import React, { useState } from 'react'

import { fetchEvents } from '../api'
import { useQuery } from '../api/fetchingLibrary/useQuery'
import { Event } from './Event'

export const Events = () => {
  const [events, setEvents] = useState({})
  useQuery(fetchEvents, { onComplete: setEvents })

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
