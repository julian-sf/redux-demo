import { useQuery } from '@apollo/react-hooks'
import React, { useState, useEffect } from 'react'

import { EVENTS_QUERY } from '../../api'
import { useAuthContext } from '../../contexts/AuthContext/useAuthContext'
import { Events } from './Events'

export const EventsContainer = () => {
  const { userInfo } = useAuthContext()
  const [events, setEvents] = useState({})
  const { refetch: fetchEvents } = useQuery(EVENTS_QUERY, { fetchPolicy: 'cache-first' })

  useEffect(() => {
    fetchEvents().then(({ data }: any) => setEvents(data.events))
  }, [userInfo.isLoggedIn, fetchEvents])

  return <Events events={events} clearEvents={() => setEvents({})} />
}
