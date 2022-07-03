import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, chakra, Container, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useSwitchNetwork } from '../../../hooks'

const NetworkContainer = chakra(Container, {
  baseStyle: {
    position: 'absolute',
    top: '-2px',
    right: '0px',
    w: 'auto',
    padding: 0,
  },
})

export const Network = () => {
  const { address: account } = useAccount()
  const switchNetwork = useSwitchNetwork()

  const currentNetwork = useMemo(() => {
    return 'ETH'
  }, [])

  if (!account) return null

  return (
    <NetworkContainer>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {currentNetwork}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => switchNetwork('ETH')}>ETH</MenuItem>
        </MenuList>
      </Menu>
    </NetworkContainer>
  )
}
