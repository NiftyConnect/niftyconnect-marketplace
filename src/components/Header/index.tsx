import { Box, Button, chakra, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import LogoSvg from './logo.svg'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { WalletModal } from '../WalletModal'
import { AccountMenu } from './AccountMenu'

const HeaderContainer = chakra(Flex, {
  baseStyle: {
    h: '64px',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: '#EDEDED',
    borderStyle: 'solid',
    borderBottom: 1,
    position: 'relative',
  },
})

const ListButtonBox = chakra(Flex, {
  baseStyle: {
    h: '64px',
    alignItems: 'center',
    padding: '0 20px',
    cursor: 'pointer',
    right: '150px',
  },
})

export const Header = () => {
  const { address } = useAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <HeaderContainer>
        <Flex alignItems={'center'}>
          <Link href={'/'} passHref>
            <a>
              <Box cursor={'pointer'}>
                <LogoSvg />
              </Box>
            </a>
          </Link>
          {/* <Box
            marginLeft={'40px'}
            _hover={{ color: '' }}
            fontWeight={600}
            color="#3B4556"
            fontSize={'14px'}
            lineHeight={'21px'}
          >
            <Link href={'/explore'}>Explore</Link>
          </Box> */}
        </Flex>

        <Flex alignItems={'center'}>
          <ListButtonBox>
            {address ? (
              <AccountMenu />
            ) : (
              <Button variant={'solid'} size="sm" onClick={() => onOpen()}>
                Connect Wallet
              </Button>
            )}
          </ListButtonBox>
        </Flex>
      </HeaderContainer>
      <WalletModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
    </>
  )
}
