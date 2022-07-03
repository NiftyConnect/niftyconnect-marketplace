import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Stack,
  Spinner,
  chakra,
  Flex,
} from '@chakra-ui/react'
import { DetailHeader } from './DetailHeader'
import { Details } from './Details'
import { Attribute, MintveseNft } from '../../types'
import { Properties } from './Properties'
import { BuyButtonGroup } from './BuyButtonGroup'
import { NiftyConnectOrder } from 'niftyconnect-js'

const LoadingContainer = chakra(Flex, {
  baseStyle: {
    padding: '50px 0',
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
})

export const NftDetailModal = ({
  isOpen,
  onClose,
  data,
  order,
  properties,
}: {
  onClose: () => void
  isOpen: boolean
  data: MintveseNft
  order: NiftyConnectOrder
  properties: Array<Attribute>
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size={'4xl'}>
      <ModalOverlay backdropFilter={'blur(4px)'} background="rgba(59, 69, 86, 0.5)" />
      <ModalContent width={'800px'}>
        <ModalCloseButton />
        <ModalBody>
          {data ? (
            <>
              <Stack marginTop="40px">
                <DetailHeader data={data} />
                <Details data={data} />
              </Stack>
              <Properties properties={properties} />
              <BuyButtonGroup order={order} onClose={onClose} />
            </>
          ) : (
            <LoadingContainer>
              <Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="#3B4556" size="lg" />
            </LoadingContainer>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
