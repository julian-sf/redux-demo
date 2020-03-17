import { AppProps } from 'next/app'
import React from 'react'

import { AuthContextProvider } from '../contexts/AuthContext/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
