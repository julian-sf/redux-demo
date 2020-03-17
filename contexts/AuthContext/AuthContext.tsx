import React, { createContext, useState } from 'react'

export const AuthContext = createContext(undefined)

const INITIAL_STATE = {
  isLoggedIn: false,
  name: undefined,
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE)

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
