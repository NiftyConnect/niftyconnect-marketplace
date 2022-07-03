import { Box, Button, chakra, Flex, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { NiftyConnectOrder, takeOrder } from 'niftyconnect-js'
import { ZERO_ADDRESS } from '../../constants'
import { useSwitchNetwork } from '../../hooks'
import { NftInfoWithOrder } from '../../types'
import { getErc20Balance, getPaymentSymbol } from '../../utils'
import { CancelModal } from '../CancelModal'
import { ListModal } from '../ListModal'
import { MediaBox } from '../MediaBox'

const NftCardContainer = chakra(Box, {
  baseStyle: {
    position: 'relative',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.04)',
    background: '#fff',
    padding: '8px',
    border: '2px solid transparent',
    _hover: {
      border: '2px solid #3B4556',
      boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
    },
  },
})

const ImageBox = chakra(Box, {
  baseStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
  },
})

const CollectionName = chakra(Text, {
  baseStyle: {
    color: '#3B4556',
    fontSize: '14px',
    lineHeight: '23px',
    fontWeight: 600,
    maxWidth: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
})

const NftName = chakra(Text, {
  baseStyle: {
    color: '#818D9F',
    fontSize: '12px',
    lineHeight: '15px',
    fontWeight: 600,
    maxWidth: '110px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginTop: '4px',
  },
})

type Props = {
  data?: NftInfoWithOrder
  clickable?: boolean
  imgCardWidth?: string
  loading?: boolean
}

export const NftCard = ({ data, imgCardWidth = '100%' }: Props) => {
  const { address } = useAccount()
  const { data: balanceData } = useBalance({ addressOrName: address })
  const [isBuying, setIsBuying] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const switchNetwork = useSwitchNetwork()
  const toast = useToast({ position: 'top' })
  const { isOpen: isOpenCancel, onOpen: onOpenCancel, onClose: cancelOnClose } = useDisclosure()
  const { nft, order } = data

  const clickSell = useCallback(() => {
    onOpen()
  }, [onOpen])

  const clickCancel = useCallback(() => {
    onOpenCancel()
  }, [onOpenCancel])

  const clickBuy = useCallback(async () => {
    setIsBuying(true)
    if (Number(window?.ethereum?.chainId) !== 1) {
      try {
        await switchNetwork('ETH')
      } catch (err) {
        console.log(err)
        return
      } finally {
        setIsBuying(false)
      }
    }

    try {
      const newLocal = order?.payment_token !== ZERO_ADDRESS
      if (newLocal) {
        const erc20Balance = await getErc20Balance({ address: address, tokenAddress: order.payment_token })
        if (new BigNumber(erc20Balance).lt(new BigNumber(order.base_price).div(10 ** 18))) {
          toast({
            title: 'insufficient balance',
            variant: 'solid',
            status: 'warning',
            isClosable: true,
          })
          return
        }
      } else {
        if (balanceData?.value?.lt(order.base_price)) {
          toast({
            title: 'insufficient balance',
            variant: 'solid',
            status: 'warning',
            isClosable: true,
          })
          return
        }
      }

      const niftyOrder: NiftyConnectOrder = {
        orderPrice: Number(order.base_price),
        orderHash: order.order_hash,
        maker: order.maker,
        taker: order.taker,
        makerRelayerFeeRecipient: order.maker_relayer_fee_recipient,
        side: order.sale_side === 'Buy' ? 1 : 0,
        saleKind: order.sale_kind === 'FixedPrice' ? 0 : 1,
        nftAddress: order.nft_address,
        tokenId: Number(order.token_id),
        ipfsHash: order.ipfs_hash,
        calldata: order.calldata,
        replacementPattern: order.replacement_pattern,
        staticTarget: order.static_target,
        staticExtradata: order.static_extradata,
        paymentToken: order.payment_token,
        extra: order.extra,
        listingTime: order.listing_time,
        expirationTime: order.expiration_time,
        salt: order.salt,
        isCancelled: false,
        isFinalized: false,
        txHash: order.tx_hash,
        exchange: order.exchange,
      }

      const tx = await takeOrder({ order: niftyOrder, account: address, chainId: 1 })
      await tx.wait()
      onClose()
    } catch (err) {
      console.log(err)
    } finally {
      setIsBuying(false)
    }
  }, [
    address,
    balanceData?.value,
    onClose,
    order.base_price,
    order.calldata,
    order.exchange,
    order.expiration_time,
    order.extra,
    order.ipfs_hash,
    order.listing_time,
    order.maker,
    order.maker_relayer_fee_recipient,
    order.nft_address,
    order.order_hash,
    order.payment_token,
    order.replacement_pattern,
    order.sale_kind,
    order.sale_side,
    order.salt,
    order.static_extradata,
    order.static_target,
    order.taker,
    order.token_id,
    order.tx_hash,
    switchNetwork,
    toast,
  ])

  const isOwner = useMemo(() => {
    return nft?.owner?.toLowerCase() === address?.toLowerCase()
  }, [address, nft?.owner])

  const pay = useMemo(() => {
    if (!order?.base_price) return null
    return {
      currentPrice: new BigNumber(order?.base_price)
        .div(10 ** 18)
        .dp(8, 1)
        .toFixed(),
      payment: getPaymentSymbol({ paymentContract: order?.payment_token, blockchain: 'ETH' }),
    }
  }, [order])

  return (
    <>
      <NftCardContainer>
        <ImageBox maxH={`${imgCardWidth}px`}>
          <MediaBox media={data.nft} imgCardWidth={imgCardWidth} />
        </ImageBox>
        <Flex marginTop="15px" marginBottom="5px" justifyContent={'space-between'}>
          <Box>
            <Tooltip label={nft?.contract_name}>
              <CollectionName>{nft?.contract_name}</CollectionName>
            </Tooltip>

            <Tooltip label={nft?.name ? `${nft?.name}` : `#${nft?.token_id}`}>
              <NftName>{nft?.name ? `${nft?.name}` : `#${nft?.token_id}`}</NftName>
            </Tooltip>
          </Box>
          {isOwner &&
            (pay ? (
              <Button variant={'outline'} size="sm" onClick={clickCancel}>
                Cancel
              </Button>
            ) : (
              <Button variant={'outline'} size="sm" onClick={clickSell}>
                Sell
              </Button>
            ))}
          {!isOwner && pay && (
            <Button variant={'outline'} size="sm" onClick={clickBuy} isLoading={isBuying}>
              Buy
            </Button>
          )}
        </Flex>

        <Flex color="#3B4556" fontSize={'14px'} marginTop="12px" height={'24px'}>
          <Text fontWeight={'600'} lineHeight="24px" color="#818D9F">
            {pay ? 'Price' : ''}
          </Text>
          <Text fontWeight={'700'} color={'#3B4556'} marginLeft="5px" lineHeight="24px" whiteSpace={'nowrap'}>
            {pay ? `${pay?.currentPrice} ${pay?.payment}` : ''}
          </Text>
        </Flex>
      </NftCardContainer>
      <ListModal isOpen={isOpen} onClose={onClose} nft={data?.nft} />
      <CancelModal isOpen={isOpenCancel} onClose={cancelOnClose} data={data} />
    </>
  )
}
