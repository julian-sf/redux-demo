import React from 'react'

import { EventData } from '../../server/data/events'
import { Event } from './Event'

type EventsProps = {
  events: EventData[]
  clearEvents(): void
}

export const Events = ({ events, clearEvents }: EventsProps) => (
  <>
    <button type={'button'} onClick={clearEvents} data-testid={'clearEvents'}>
      Clear Events
    </button>
    <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '20px 40px' }}>
      {events.map((event, i) => (
        <Event key={i} event={event} />
      ))}
    </div>
  </>
)
