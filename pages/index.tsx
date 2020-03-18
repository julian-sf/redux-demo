import React from 'react'

import { AuthButton } from '../components/AuthButton'
import { Events } from '../components/Events'
import { withRedux } from '../next-utils/withRedux'
import { useRenderCount } from '../utils/useRenderCount'

export default withRedux(() => {
  const renderCount = useRenderCount()

  return (
    <>
      <h1>Event List</h1>
      {renderCount && <pre>Index render count: {renderCount}</pre>}
      <AuthButton />
      <Events />
    </>
  )
})
