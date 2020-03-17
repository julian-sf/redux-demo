import React from 'react'

import { useEvents } from '../store/events'
import { Event } from './Event'

export const Events = () => {
  const events = useEvents()

  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '20px 40px' }}>
      {Object.keys(events).map(id => {
        const event = events[id]

        return <Event key={event.id} event={event} />
      })}
    </div>
  )
}
