import { ButtonGroup, chakra, Container, Flex, Text, Button, Box } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useAccount } from 'wagmi'

const DescContainer = chakra(Flex, {
  baseStyle: {
    w: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#FBFBFD',
    padding: '80px 0',
  },
})

export const Description = () => {
  const { address } = useAccount()
  return (
    <DescContainer>
      <Container
        maxW="1200px"
        display={'flex'}
        justifyContent={{ base: 'flex-start', md: 'space-between' }}
        alignItems={{ base: 'flex-start', md: 'center' }}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Box margin={{ base: '20px 0', md: '0' }}>
          <Text fontWeight={'600'} fontSize="40px" lineHeight={'60px'} maxW="420px">
            A step further into the real Web3 NFT market.
          </Text>
          <ButtonGroup marginTop="40px" spacing={6}>
            <Button variant={'solid'}>Explore</Button>
            <Link href="https://docs.niftyconnect.org/">
              <a target={'_blank'}>
                <Button variant={'outline'}>Docs</Button>
              </a>
            </Link>
          </ButtonGroup>
        </Box>
        <Box>
          <Text maxW={'270px'} fontSize="18px" color="#818D9F">
            Trading fee based on governance, starting from 0%
          </Text>
          <Flex fontSize="18px" color="#3B4556" marginTop="32px">
            <Link href={`/account/${address}`}>
              <a> {`List now  ->`}</a>
            </Link>
          </Flex>
        </Box>
        <Box>
          <Text maxW={'270px'} fontSize="18px" color="#818D9F">
            Check out our code & docs on Github and start to build
          </Text>
          <Flex fontSize="18px" color="#3B4556" marginTop="32px">
            <Link href="https://github.com/NiftyConnect">
              <a target={'_blank'}>{`Github   ->`}</a>
            </Link>
          </Flex>
        </Box>
      </Container>
    </DescContainer>
  )
}
