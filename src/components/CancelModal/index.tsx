import React, { useCallback, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  chakra,
  Text,
  Stack,
  Button,
} from '@chakra-ui/react'
import CancelSvg from './cancel.svg'
import { cancelOrder, NiftyConnectOrder } from 'niftyconnect-js'
import { useAccount } from 'wagmi'
import { NftInfoWithOrder } from '../../types'

const CenterBox = chakra(Flex, {
  baseStyle: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '222px',
    w: '340px',
    flex: 1,
  },
})

const Tips = chakra(Text, {
  baseStyle: {
    color: '#1D1D1D',
    fontSize: '24px',
    lineHeight: '36px',
    fontWeight: 600,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '2px',
  },
})

type Props = {
  onClose: () => void
  isOpen: boolean
  data: NftInfoWithOrder
}

export const CancelModal = ({ isOpen, onClose, data }: Props) => {
  const [isCancelling, setIsCancelling] = useState(false)
  const { address } = useAccount()
  const order = data.order
  const clickCancel = useCallback(async () => {
    setIsCancelling(true)
    try {
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
        isCancelled: false, //no return from api
        isFinalized: false, //no return from api
        txHash: order.tx_hash,
        exchange: order.exchange,
      }
      const tx = await cancelOrder({ order: niftyOrder, chainId: 1, account: address })
      await tx.wait()
      onClose()
    } catch (err) {
      console.log(err)
    } finally {
      setIsCancelling(false)
    }
  }, [
    address,
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
  ])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropBlur={'10px'} blur={'10px'} />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody padding="24px" paddingTop="10px">
          <Flex w="100%">
            <CenterBox>
              <CancelSvg />
              <Tips>Cancel listing</Tips>
            </CenterBox>
          </Flex>
          <Flex marginTop="24px" justifyContent={'space-between'} fontSize="14px" lineHeight={'21px'} fontWeight={500}>
            <Text color="#818D9F">
              Canceling your listing will change the order status to cancel from the NiftyConnect protocol and all other
              integrated contracts. A gas fee will be charged to make sure your listing cannot be fulfilled.
            </Text>
          </Flex>
          <Flex justifyContent={'center'} marginTop="18px" fontSize="16px" lineHeight={'24px'} fontWeight={600}>
            <Stack direction={'row'}>
              <Button variant={'outline'} width="172px" onClick={() => onClose()}>
                Do not cancel
              </Button>
              <Button variant={'solid'} width="172px" onClick={clickCancel} isLoading={isCancelling}>
                Cancel listing
              </Button>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
