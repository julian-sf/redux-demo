import Link from 'next/link'
import React from 'react'

import { AuthButtonContainer } from '../components/AuthButton/AuthButtonContainer'
import { EventsContainer } from '../components/Events/EventsContainer'

const index = () => (
  <>
    <h1>Event List</h1>
    <AuthButtonContainer />
    <Link href={'/other'}>
      <button type={'button'}>Visit Other Page</button>
    </Link>
    <br />
    <EventsContainer />
  </>
)

export default index
