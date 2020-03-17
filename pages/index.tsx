import Link from 'next/link'
import React from 'react'

import { AuthButtonContainer } from '../components/AuthButton/AuthButtonContainer'
import { Events } from '../components/Events'

const index = () => (
  <>
    <h1>Event List</h1>
    <AuthButtonContainer />
    <Link href={'/other'}>
      <button type={'button'}>Visit Other Page</button>
    </Link>
    <br />
    <Events />
  </>
)

export default index
