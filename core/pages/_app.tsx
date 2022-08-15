import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    fetch('/api/me')
  })
  return (
    <ChakraProvider>
      <Box marginX="12" height="100%">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
