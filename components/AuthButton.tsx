import React from 'react'

import { useLoggedIn, useUserName } from '../store/auth'
import { useRenderCount } from '../utils/useRenderCount'

export const AuthButton = () => {
  const { loggedIn, login, logout } = useLoggedIn()
  const userName = useUserName()
  const renderCount = useRenderCount()

  return (
    <>
      <div>
        <div className={'button-container'}>
          <button type={'button'} onClick={() => (loggedIn ? logout() : login())}>
            {loggedIn === 'unknown' ? 'Login' : loggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
        {loggedIn !== 'unknown' && <div className={'user'}>User: {userName ?? '<empty>'}</div>}
        {renderCount && `AuthButton render count: ${renderCount}`}
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
