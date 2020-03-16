import Link from 'next/link'
import React from 'react'

import { withRedux } from '../store/next'

const Other = () => {
  return (
    <>
      Some other page
      <Link href={'/'}>
        <button>Back to index</button>
      </Link>
    </>
  )
}

export default withRedux(Other)
