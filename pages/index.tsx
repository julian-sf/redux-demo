import React from 'react'
import { useDispatch } from 'react-redux'

import { AuthButton } from '../components/AuthButton'
import { Events } from '../components/Events'
import { withRedux } from '../next-utils/store'
import { resetEvents } from '../store/events'
import { useRenderCount } from '../utils/useRenderCount'

export default withRedux(() => {
  const renderCount = useRenderCount()
  const dispatch = useDispatch()

  return (
    <>
      <h1>Event List</h1>
      <pre>Index render count: {renderCount}</pre>
      <AuthButton />
      <Events />
      <button type={'button'} onClick={() => dispatch(resetEvents())}>
        Reset events in Redux
      </button>
    </>
  )
})
