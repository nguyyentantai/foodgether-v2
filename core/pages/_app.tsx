import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box marginX="12" height="100%">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
