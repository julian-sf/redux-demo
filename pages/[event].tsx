import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { AuthButton } from '../components/AuthButton'
import { Events } from '../components/Events'
import { useRouter } from '../next-utils/router'
import { withRedux } from '../next-utils/store'
import { parseStringParam } from '../next-utils/urls'
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

    setDisplayedEvent(eventData)

    if (eventData) return

    // set a timeout to go back to the index
    const timeout = setTimeout(() => pushRoute('/'), 3000)

    // and add a cleanup method if we unmount before then
    return () => {
      clearTimeout(timeout)
    }
  }, [eventData, initialized, ready, pushRoute])

  if (!displayedEvent) {
    return (
      <>
        <div>Sorry you don't have access to this event. Taking you back to event selection...</div>
        <style jsx>{`
          div {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
          }
        `}</style>
      </>
    )
  }

  return (
    <>
      <h1>{displayedEvent?.name}</h1>
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
        providedEvents={displayedEvent.relatedEvents.reduce((acc, id) => {
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
