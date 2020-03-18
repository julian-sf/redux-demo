import { useMutation } from '@apollo/react-hooks'
import React from 'react'

import { LOGIN_MUTATION, LOGOUT_MUTATION } from '../../api'
import { useAuthContext } from '../../contexts/AuthContext/useAuthContext'
import { AuthButton } from './AuthButton'

export const AuthButtonContainer = () => {
  const {
    userInfo: { isLoggedIn, name },
    setUserInfo,
  } = useAuthContext()

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: { user } }) => setUserInfo({ isLoggedIn: true, name: user }),
  })

  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => setUserInfo({ isLoggedIn: false, name: undefined }),
  })

  return <AuthButton isLoggedIn={isLoggedIn} username={name} login={login} logout={logout} />
}
