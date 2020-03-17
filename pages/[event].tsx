import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { AuthButton } from '../components/AuthButton'
import { Modal } from '../components/Modal'
import { useRouter } from '../next-utils/router'
import { withRedux } from '../next-utils/store'
import { parseStringParam } from '../next-utils/urls'
import { EventData } from '../server/data/events'
import { useEvents } from '../store/events'

export default withRedux(() => {
  const [open, setOpen] = useState(false)
  const { query, pushRoute, ready } = useRouter()
  const { loading, events } = useEvents()
  const [event, setEvent] = useState<EventData>()

  const eventId = parseStringParam(query?.event)

  useEffect(() => {
    console.log('exit', !ready || loading)
    if (!ready || loading) return

    if (!events[eventId]) {
      // go back to index
      pushRoute('/')

      return
    }

    setEvent(events[eventId])
  }, [eventId, loading, events, ready, pushRoute])

  return (
    <>
      <h1>{event?.name}</h1>
      <AuthButton />
      <Link href={'/'}>
        <button>Back to index</button>
      </Link>
      <br />
      <button onClick={() => setOpen(true)}>Open Modal</button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <pre>Box Office Hours: {JSON.stringify(event?.boxOfficeHours, null, 2)}</pre>
          <br />
          <pre>Showtime Descriptions: {JSON.stringify(event?.showTimesDescriptions, null, 2)}</pre>
        </Modal>
      )}
    </>
  )
})
