import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AuthButton } from '../components/AuthButton'
import { Events } from '../components/Events'
import { updateLoggedInStatus } from '../store/auth'
import { getEvents, resetEvents } from '../store/events'
import { withRedux } from '../store/next'

export default withRedux(() => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEvents())
    dispatch(updateLoggedInStatus())
  }, [dispatch])

  return (
    <>
      <h1>Event List</h1>
      <AuthButton />
      <Link href={'/other'}>
        <button type={'button'}>Visit Other Page</button>
      </Link>
      <br />
      <button type={'button'} onClick={() => dispatch(resetEvents())}>
        Clear Events from Redux
      </button>
      <Events />
    </>
  )
})
