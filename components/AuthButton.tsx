import React from 'react'

import { fetchLogin, fetchLogout } from '../api'
import { useQuery } from '../api/fetchingLibrary/useQuery'
import { useAuthContext } from '../contexts/AuthContext/useAuthContext'

export const AuthButton = () => {
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

  return (
    <>
      <div>
        <div className={'button-container'}>
          <button type={'button'} onClick={() => (isLoggedIn ? logout() : login())}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
        {isLoggedIn && <div className={'user'}>User: {name ?? '<empty>'}</div>}
      </div>
      <style jsx>{`
        div {
          display: flex;
        }
        .button-container {
          width: 150px;
        }

        .user {
          flex: 1;
        }
      `}</style>
    </>
  )
}
