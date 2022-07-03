import { Button, Flex, Stack, useToast } from '@chakra-ui/react'
import BigNumber from 'bignumber.js'
import { NiftyConnectOrder, takeOrder } from 'niftyconnect-js'
import React, { useCallback, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { ZERO_ADDRESS } from '../../../constants'
import { useSwitchNetwork } from '../../../hooks'
import { getErc20Balance } from '../../../utils'

export const BuyButtonGroup = ({ onClose, order }: { onClose: () => void; order: NiftyConnectOrder }) => {
  const switchNetwork = useSwitchNetwork()
  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAccount()
  const { data: balance } = useBalance({
    addressOrName: address,
  })
  const toast = useToast({ position: 'top' })

  const clickComplete = useCallback(async () => {
    setIsLoading(true)
    if (Number(window?.ethereum?.chainId) !== 1) {
      try {
        await switchNetwork('ETH')
      } catch (err) {
        console.log(err)
        return
      } finally {
        setIsLoading(false)
      }
    }

    try {
      const newLocal = order?.paymentToken !== ZERO_ADDRESS
      if (newLocal) {
        const erc20Balance = await getErc20Balance({ address: address, tokenAddress: order.paymentToken })
        if (new BigNumber(erc20Balance).lt(new BigNumber(order.orderPrice).div(10 ** 18))) {
          toast({
            title: 'insufficient balance',
            variant: 'solid',
            status: 'warning',
            isClosable: true,
          })
          return
        }
      } else {
        if (balance.value.lt(order.orderPrice)) {
          toast({
            title: 'insufficient balance',
            variant: 'solid',
            status: 'warning',
            isClosable: true,
          })
          return
        }
      }

      const tx = await takeOrder({ order, account: address, chainId: 1 })
      await tx.wait()
      onClose()
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [address, balance, onClose, order, switchNetwork, toast])

  return (
    <Flex justifyContent={'flex-end'} margin="30px 0 20px 0">
      <Stack width={{ base: '100%', sm: '350px' }} spacing={4} direction={{ base: 'column', sm: 'row' }}>
        <Button variant={'outline'} width={{ base: '100%', sm: '170px' }} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={'solid'} width={{ base: '100%', sm: '170px' }} onClick={clickComplete} isLoading={isLoading}>
          Confirm
        </Button>
      </Stack>
    </Flex>
  )
}
