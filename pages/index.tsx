import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { People } from '../components/People'
import { login, logout, useLoggedIn } from '../store/auth'
import { withRedux } from '../store/next'
import { getPeople, resetPeople } from '../store/people'

const Home = () => {
  const dispatch = useDispatch()
  const loggedIn = useLoggedIn()

  useEffect(() => {
    dispatch(getPeople())
  }, [dispatch])

  return (
    <>
      <Link href={'/other'}>
        <button type={'button'}>Visit Other Page</button>
      </Link>
      <br />
      <button type={'button'} onClick={() => dispatch(resetPeople())}>
        Clear People from Redux
      </button>
      <br />
      <button type={'button'} onClick={() => dispatch((loggedIn ? logout : login)())}>
        {loggedIn ? 'Logout' : 'Login'}
      </button>
      <People />
    </>
  )
}

export default withRedux(Home)
