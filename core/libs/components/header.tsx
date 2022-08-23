import { Box, Flex, Heading, Link as ChakraLink } from '@chakra-ui/react'
import Image from 'next/future/image'
import Link from 'next/link'
import logo from '../../public/logo.svg'

const Header = () => {
  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      borderBottom="1px"
      borderColor="orange.100"
    >
      <Box>
        <Link href="/" passHref>
          <ChakraLink>
            <Flex alignItems="center">
              <Box mr="3" height="9" width="9">
                <Image src={logo} alt="Dev's Rant Blogs Logo" />
              </Box>
              <Heading color="orange.600">FOODGETHER</Heading>
            </Flex>
          </ChakraLink>
        </Link>
      </Box>
    </Flex>
  )
}

export default Header
