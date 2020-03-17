import React from 'react'

import { fetchLogin, fetchLogout } from '../../api'
import { useQuery } from '../../api/fetchingLibrary/useQuery'
import { useAuthContext } from '../../contexts/AuthContext/useAuthContext'
import { AuthButton } from './AuthButton'

export const AuthButtonContainer = () => {
  const {
    userInfo: { isLoggedIn, name },
    setUserInfo,
  } = useAuthContext()

  const { fetch: login } = useQuery(fetchLogin, {
    onComplete: ({ user }) => setUserInfo({ isLoggedIn: true, name: user }),
    skip: true,
  })

  const { fetch: logout } = useQuery(fetchLogout, {
    onComplete: () => setUserInfo({ isLoggedIn: false, name: undefined }),
    skip: true,
  })

  return <AuthButton isLoggedIn={isLoggedIn} username={name} login={login} logout={logout} />
}
