import { chakra, Container, Flex, Input, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getErc1155Balance } from '../../../../utils'
import { useListModal } from '../../context'

const Title = chakra(Flex, {
  baseStyle: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#333',
    fontWeight: 600,
    marginBottom: '12px',
  },
})

const PriceBoxRow = chakra(Flex, {
  baseStyle: {
    border: '2px solid #3B4556',
    height: '40px',
  },
})

export const Amount = () => {
  const { address } = useAccount()
  const toast = useToast({ position: 'top' })
  const {
    setAmount,
    state: {
      amount,
      nft: { contract_address: nft_address, token_id },
    },
  } = useListModal()

  const [balance, setBalance] = useState(1)

  const amountChange = useCallback(
    (evt) => {
      const amount = evt.currentTarget.value
      if (Number(amount) > balance) {
        toast({
          title: 'Exceeds the maximum amount',
          variant: 'solid',
          status: 'error',
          isClosable: true,
        })

        return
      }
      setAmount(evt.currentTarget.value)
    },
    [balance, setAmount, toast],
  )

  useEffect(() => {
    getErc1155Balance({ nftAddress: nft_address, tokenId: token_id, account: address })
      .then((res) => {
        setBalance(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [address, nft_address, token_id])

  return (
    <Container padding={0} marginTop="24px">
      <Title>Amount</Title>
      <PriceBoxRow>
        <Input
          type={'number'}
          placeholder={`Max amount: ${balance}`}
          variant={'Unstyled'}
          bg="transparent"
          h="36px"
          value={amount}
          onChange={amountChange}
        />
      </PriceBoxRow>
    </Container>
  )
}
