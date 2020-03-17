import React from 'react'
import { useDispatch } from 'react-redux'

import { AuthButton } from '../components/AuthButton'
import { Events } from '../components/Events'
import { withRedux } from '../next-utils/store'
import { resetEvents } from '../store/events'

export default withRedux(() => {
  const dispatch = useDispatch()

  return (
    <>
      <h1>Event List</h1>
      <AuthButton />
      <Events />
      <button type={'button'} onClick={() => dispatch(resetEvents())}>
        Reset events in Redux
      </button>
    </>
  )
})
