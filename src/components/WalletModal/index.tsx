import React, { useCallback, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/react'
import MetamaskSvg from './metamask.svg'
import WalletConnectSvg from './walletconnect.svg'
import CoinbaseSvg from './coinbase.svg'
import { useSwitchNetwork } from '../../hooks'
import { useConnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

export const WalletModal = ({
  isOpen,
  onClose,
  onOpen,
}: {
  onClose: () => void
  isOpen: boolean
  onOpen: () => void
}) => {
  const { connect, error, connectors } = useConnect({
    connector: new MetaMaskConnector(),
  })

  const switchNetwork = useSwitchNetwork()
  const toast = useToast({ position: 'top' })

  const clickConnect = useCallback(async () => {
    try {
      await connect({ connector: connectors[0] })
      onClose()
    } catch (err) {
      onOpen()
    }
  }, [connect, connectors, onClose, onOpen])

  const clickConnectCoinbaseWallet = useCallback(async () => {
    try {
      await connect({ connector: connectors[1] })
      onClose()
    } catch (err) {
      onOpen()
    }
  }, [connect, connectors, onClose, onOpen])

  const clickConnectWalletConnect = useCallback(async () => {
    try {
      await connect({ connector: connectors[2] })
      onClose()
    } catch (err) {
      onOpen()
    }
  }, [connect, connectors, onClose, onOpen])

  useEffect(() => {
    if (error) {
      if (error.message.includes('Unsupported chain id')) {
        switchNetwork('ETH')
          .then(() => {
            onClose()
            connect()
          })
          .catch((err) => {
            toast({
              title: err.message,
              variant: 'solid',
              status: 'error',
              isClosable: true,
            })
            onOpen()
          })
      }

      window.localStorage.removeItem('connected')
    }
  }, [connect, error, onClose, onOpen, switchNetwork, toast])

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay backdropFilter={'blur(4px)'} background="rgba(59, 69, 86, 0.5)" />
      <ModalContent>
        <ModalHeader>Connect Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Connect with one of our available wallet providers or create a new one.</Text>
          <Flex padding="30px 0 5px 0">
            <Button w={'100%'} colorScheme="blue" variant={'solid'} leftIcon={<MetamaskSvg />} onClick={clickConnect}>
              Metamask
            </Button>
          </Flex>
          <Flex padding="10px 0 5px 0">
            <Button
              w={'100%'}
              leftIcon={<CoinbaseSvg style={{ width: '24px' }} />}
              colorScheme="blue"
              variant={'solid'}
              onClick={clickConnectCoinbaseWallet}
            >
              Coinbase Wallet
            </Button>
          </Flex>
          <Flex padding="10px 0 30px 0">
            <Button
              w={'100%'}
              colorScheme="blue"
              variant={'solid'}
              leftIcon={<WalletConnectSvg />}
              onClick={clickConnectWalletConnect}
            >
              WalletConnect
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
