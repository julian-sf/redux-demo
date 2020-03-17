import React from 'react'

import { Event } from './Event'

type EventsProps = {
  events: {}
  clearEvents(): void
}

export const Events = ({ events, clearEvents }: EventsProps) => (
  <>
    <button type={'button'} onClick={clearEvents}>
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
