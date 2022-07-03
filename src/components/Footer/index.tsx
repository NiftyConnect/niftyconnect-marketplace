import { Box, Center, chakra, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
// eslint-disable-next-line import/no-internal-modules
import LogoSvg from './logo.svg'

const MenuItem = chakra(Box, {
  baseStyle: {
    color: '#3B4556',
    fontWeight: 600,
    fontSize: { base: '12px', md: '16px' },
    lineHeight: '24px',
    cursor: 'pointer',
    marginRight: '40px',
    whiteSpace: 'nowrap',
    _hover: {
      color: '#5A88B0',
    },
  },
})

export const Footer = () => {
  return (
    <Flex w="100%" bg="#FBFBFD" flexDir={'column'} padding={{ base: '0 20px', md: '0' }}>
      <Flex
        w="100%"
        maxW="1200px"
        m="0 auto"
        alignItems={{ base: 'flex-start', md: 'center' }}
        flexDirection={{ base: 'column', md: 'row' }}
        height="168px"
        borderBottom={'1px solid #E1E2E8'}
        justifyContent={{ base: 'center', md: 'space-between' }}
      >
        <LogoSvg />
        <Flex marginTop={{ base: '20px', md: '0' }} flexWrap="wrap">
          <MenuItem>
            <Link
              href="https://mirror.xyz/0x9Df5040F71dA65F6693395040350bfc2a13DF6DE/-hhwX3lNN_iu9KORQlrnxa9oxl6KdHdsKBvLXNzuXO4"
              passHref
            >
              <a target={'_blank'}> White Paper</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="https://github.com/NiftyConnect/document" passHref>
              <a target={'_blank'}>Developers</a>
            </Link>
          </MenuItem>
          <MenuItem>Ecosystem</MenuItem>
          <MenuItem>
            <Link href="/tos" passHref>
              <a target={'_blank'}>Protocal Disclaimer </a>
            </Link>
          </MenuItem>
        </Flex>
      </Flex>
      <Center w="100%" maxW="1200px" m="0 auto" alignItems={'center'} height="64px">
        <Text color="#818D9F" fontSize={'14px'}>{`© ${new Date().getFullYear()} NiftyConnect , Inc`}</Text>
      </Center>
    </Flex>
  )
}
