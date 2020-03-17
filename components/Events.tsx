import React from 'react'

import { Events as IEvents } from '../api'
import { useEvents } from '../store/events'
import { useRenderCount } from '../utils/useRenderCount'
import { Event } from './Event'

export const Events = ({ providedEvents }: { providedEvents?: IEvents }) => {
  const { loading, events } = useEvents()
  const renderCount = useRenderCount()

  if (!providedEvents && loading) return null

  return (
    <>
      {renderCount && <pre>Events render count: {renderCount}</pre>}
      <div>
        {Object.keys(providedEvents || events).map(id => {
          const event = events[id]

          return <Event key={event.id} event={event} />
        })}
      </div>

      <style jsx>{`
        div {
          display: flex;
          flex-flow: row wrap;

          margin: 20px 40px;
          width: 75vw;
          max-width: 700px;
        }
      `}</style>
    </>
  )
}
