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
  const { loading, events } = useEvents()
  const [event, setEvent] = useState<EventData>()
  const renderCount = useRenderCount()

  const eventId = parseStringParam(query?.event)

  useEffect(() => {
    if (!ready || loading) return

    setEvent(events[eventId])

    if (events[eventId]) {
      return () => {}
    }

    // set a timeout to go back to the index
    const timeout = setTimeout(() => pushRoute('/'), 3000)

    // and add a cleanup method if we unmount before then
    return () => {
      clearTimeout(timeout)
    }
  }, [eventId, loading, events, ready, pushRoute])

  if (!event) {
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
      <h1>{event?.name}</h1>
      <pre>
        {event?.name} detail render count: {renderCount}
      </pre>
      <AuthButton />
      <Link href={'/'}>
        <button>Back to index</button>
      </Link>
      <h2>Related Events</h2>
      <Events
        providedEvents={event.relatedEvents.reduce((acc, id) => {
          const event = events[id]

          if (event) {
            acc[id] = events[id]
          }

          return acc
        }, {})}
      />
      <h2>Event Details</h2>
      <pre>{JSON.stringify(event ?? {}, null, 2)}</pre>
    </>
  )
})
