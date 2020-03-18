import React from 'react'

type AuthButtonProps = {
  isLoggedIn: boolean
  username: string
  login(): void
  logout(): void
}

export const AuthButton = ({ isLoggedIn, username, login, logout }: AuthButtonProps) => (
  <>
    <div>
      <div className={'button-container'}>
        <button type={'button'} onClick={() => (isLoggedIn ? logout() : login())}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
      {isLoggedIn && <div className={'user'}>User: {username ?? '<empty>'}</div>}
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
