import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { Steps } from './Steps'
import { NftScanNft } from '../../types'
import { UseListModalProvider } from './context'
import { ListBody } from './ListBody'

type Props = {
  onClose: () => void
  isOpen: boolean
  nft: NftScanNft
}

export const ListModal = ({ isOpen, onClose, nft }: Props) => {
  return (
    <UseListModalProvider nft={nft} onClose={onClose}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
        <ModalOverlay backdropFilter={'blur(10px)'} background="rgba(59, 69, 86, 0.5)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody padding="24px">
            <Steps />
            <ListBody />
          </ModalBody>
        </ModalContent>
      </Modal>
    </UseListModalProvider>
  )
}
