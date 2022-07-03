import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { truncateString } from '../../../utils'

export const AccountMenu = () => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <Menu closeOnBlur={true}>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant={'solid'} size="sm">
        {truncateString(address)}
      </MenuButton>
      <MenuList>
        <Link href={`/account/${address}`}>
          <MenuItem as={'a'}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={() => disconnect()}>
          <Flex flexDir={'row'} alignItems="center">
            <Box margin="0" padding="0">
              Disconnect
            </Box>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
