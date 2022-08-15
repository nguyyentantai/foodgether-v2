import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { UserContext, userContextInitialValue } from '../libs/context/user'
import useAuth from '../libs/data/auth'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(userContextInitialValue)
  const { fetchedUser, loading, loggedOut } = useAuth()
  useEffect(() => {
    if (loading) {
      setUser((user) => ({ ...user, isLoading: true }))
      return
    }
    if (fetchedUser) {
      setUser((user) => ({ ...user, ...fetchedUser, isLoading: false }))
      return
    }
    if (loggedOut) {
      setUser({ ...userContextInitialValue })
      return
    }
  }, [fetchedUser, loading, loggedOut])
  return (
    <ChakraProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <Box marginX="12" height="100%">
          <Component {...pageProps} />
        </Box>
      </UserContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
