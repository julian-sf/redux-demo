import React from 'react'
import { useDispatch } from 'react-redux'

import { People } from '../components/People'
import { login, logout, useLoggedIn } from '../store/auth'
import { withRedux } from '../store/next'
import { getPeople, resetPeople } from '../store/people'

const Home = () => {
  const dispatch = useDispatch()
  const loggedIn = useLoggedIn()

  return (
    <>
      <button type={'button'} onClick={() => dispatch(getPeople())}>
        Download People
      </button>
      <button type={'button'} onClick={() => dispatch(resetPeople())}>
        Reset People
      </button>
      <div>
        <button type={'button'} onClick={() => dispatch(login())}>
          Login
        </button>
        <button type={'button'} onClick={() => dispatch(logout())}>
          Logout
        </button>
        Logged in: {`${loggedIn}`}
      </div>
      <People />
    </>
  )
}

export default withRedux(Home)
