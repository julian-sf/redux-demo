import React, { useState, useEffect } from 'react'

import { fetchEvents } from '../../api'
import { useQuery } from '../../api/fetchingLibrary/useQuery'
import { useAuthContext } from '../../contexts/AuthContext/useAuthContext'
import { Events } from './Events'

export const EventsContainer = () => {
  const { userInfo } = useAuthContext()
  const [events, setEvents] = useState({})
  const { fetch } = useQuery(fetchEvents, { onComplete: setEvents, skip: true })

  useEffect(() => {
    fetch()
  }, [userInfo.isLoggedIn, fetch])

  return <Events events={events} clearEvents={() => setEvents({})} />
}
