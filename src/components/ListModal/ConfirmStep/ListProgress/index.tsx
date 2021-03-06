import { Box, CircularProgress, Container, Flex, Spinner, Stack, Text, useToast } from '@chakra-ui/react'
import moment from 'moment'
import { makeOrder } from 'niftyconnect-js'
import React, { useCallback, useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { contracts, FEE_ADDRESS } from '../../../../constants'
import { useApproveForAll, useIsApprovedForAll } from '../../../../hooks'
import { Side, TokenStandard } from '../../../../types'
import { useListModal } from '../../context'
import ApprovedSvg from './approved.svg'

export const ListProgress = () => {
  const [isApproved, setIsApproved] = useState(false)
  const toast = useToast({ position: 'top' })
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const {
    state: {
      salePrice,
      payment,
      expireTime,
      saleType,
      amount,
      nft: { contract_address: nft_address, token_id, erc_type: token_standard },
    },
    setStep,
  } = useListModal()

  const approveForAll = useApproveForAll(nft_address)
  const isApprovedForAll = useIsApprovedForAll(nft_address)

  const makeNiftyOrder = useCallback(() => {
    makeOrder({
      nftAddress: nft_address,
      paymentToken: payment.contractAddress,
      makerRelayerFeeRecipient: FEE_ADDRESS,
      listPrice: salePrice,
      expireTime: expireTime,
      tokenId: token_id,
      amount: amount,
      side: Side.Sell,
      saleKind: saleType,
      tokenStandard: token_standard === 'erc1155' ? TokenStandard.erc1155 : TokenStandard.erc721,
      listTime: moment(),
      chainId: 1,
      makerAddress: address,
    })
      .then((tx) => {
        tx.wait()
          .then(() => {
            setStep('Success')
          })
          .catch((err) => {
            toast({
              title: err.message,
              variant: 'solid',
              status: 'error',
              isClosable: true,
            })
            setStep('List')
          })
      })
      .catch((err) => {
        toast({
          title: err.message,
          variant: 'solid',
          status: 'error',
          isClosable: true,
        })
        setStep('List')
      })
  }, [
    address,
    amount,
    expireTime,
    nft_address,
    payment.contractAddress,
    salePrice,
    saleType,
    setStep,
    toast,
    token_id,
    token_standard,
  ])

  useEffect(() => {
    if (!signer) return
    isApprovedForAll({ operator: contracts.NiftyConnectExchange[1], owner: address })
      .then((approved) => {
        setIsApproved(approved)

        if (!approved) {
          approveForAll({ contractAddress: contracts.NiftyConnectExchange[1], approved: true })
            .then((res) => {
              setIsApproved(res)
              makeNiftyOrder()
            })
            .catch((err) => {
              console.log(err)
              if (err?.message?.includes('User denied transaction signature')) {
                setStep('List')
              }
            })
        } else {
          makeNiftyOrder()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [address, approveForAll, isApprovedForAll, makeNiftyOrder, setStep, signer])

  return (
    <Container padding="0" marginTop="30px">
      <Flex>
        <Flex>{isApproved ? <ApprovedSvg /> : <CircularProgress isIndeterminate color="#5EBA83" size="32px" />}</Flex>
        <Flex marginLeft="12px">
          <Stack>
            <Text fontSize={'16px'} fontWeight="600" lineHeight="24px" color={isApproved ? '#5EBA83' : '#333'}>
              Approve this item for sale
            </Text>
            {!isApproved && (
              <Text fontSize={'16px'} lineHeight="24px" color={'#818D9F'} marginTop="10px">
                To get set up for auction listings for the first time, you must approve this item for sale, which
                requires a one-time gas fee.
              </Text>
            )}
          </Stack>
        </Flex>
      </Flex>
      <Box
        borderWidth={1}
        borderStyle={'solid'}
        borderColor={isApproved ? '#5EBA83' : '#EDEDED'}
        height={'40px'}
        width={'0px'}
        marginTop={'12px'}
        marginBottom={'20px'}
        marginLeft={'12px'}
      />
      <Flex>
        <Flex>
          {!isApproved && <Spinner thickness="3px" speed="0.65s" emptyColor="#818D9F" color="#3B4556" size="lg" />}
          {isApproved && <CircularProgress isIndeterminate color="#5EBA83" size="32px" />}
        </Flex>
        <Flex marginLeft="12px">
          <Stack>
            <Text
              fontSize={'16px'}
              fontWeight="600"
              lineHeight="24px"
              color={'#333'}
            >{`Cofirming ${salePrice} ${payment.symbol} listing`}</Text>
            <Text fontSize={'16px'} lineHeight="24px" color={'#818D9F'} marginTop="10px">
              Accept the signature request in your wallet and wait for your listing to process. Waiting for signature...
            </Text>
          </Stack>
        </Flex>
      </Flex>
    </Container>
  )
}
