import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { AuthButton } from '../components/AuthButton'
import { Events } from '../components/Events'
import { useRouter } from '../next-utils/router'
import { parseStringParam } from '../next-utils/urls'
import { withRedux } from '../next-utils/withRedux'
import { EventData } from '../server/data/events'
import { useEvents } from '../store/events'
import { useRenderCount } from '../utils/useRenderCount'

export default withRedux(() => {
  const { query, pushRoute, ready } = useRouter()
  const { initialized, events } = useEvents()
  const [displayedEvent, setDisplayedEvent] = useState<EventData>()
  const renderCount = useRenderCount()

  const eventId = parseStringParam(query?.event)
  const eventData = events[eventId]

  useEffect(() => {
    if (!ready || !initialized) return

    if (!eventData) pushRoute('/')

    setDisplayedEvent(eventData)
  }, [eventData, initialized, ready, pushRoute])

  return (
    <>
      <h1>{displayedEvent?.name || 'Event List'}</h1>
      {renderCount && (
        <pre>
          {displayedEvent?.name} detail render count: {renderCount}
        </pre>
      )}
      <AuthButton />
      <Link href={'/'}>
        <button>Back to index</button>
      </Link>
      <h2>Related Events</h2>
      <Events
        providedEvents={displayedEvent?.relatedEvents.reduce((acc, id) => {
          const event = events[id]

          if (event) {
            acc[id] = events[id]
          }

          return acc
        }, {})}
      />
      <h2>Event Details</h2>
      <pre>{JSON.stringify(displayedEvent ?? {}, null, 2)}</pre>
    </>
  )
})
