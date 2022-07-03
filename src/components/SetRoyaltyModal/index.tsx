import React, { useCallback, useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Stack,
  Button,
  ModalHeader,
  Select,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useQueryCollections } from '../../hooks'
import BigNumber from 'bignumber.js'
import { setRoyalty } from 'niftyconnect-js'
import { useAccount, useNetwork } from 'wagmi'

type Props = {
  onClose: () => void
  isOpen: boolean
}

export const SetRoyaltyModal = ({ isOpen, onClose }: Props) => {
  const [isCancelling, setIsCancelling] = useState(false)
  const { activeChain } = useNetwork()
  const {
    data: { address: account },
  } = useAccount()
  const [collections, setCollections] = useState([])
  const [nftAddress, setNftAddress] = useState('')
  const [royalty, setRoyaltyValue] = useState('')
  const queryCollections = useQueryCollections()
  const toast = useToast({ position: 'top' })

  const collectionChange = useCallback((evt) => {
    setNftAddress(evt.target.value)
  }, [])

  const clickSetRoyalty = useCallback(async () => {
    setIsCancelling(true)
    try {
      const royaltyBig = new BigNumber(royalty)
      if (royaltyBig.lt(0) || royaltyBig.gt(10)) {
        toast({
          title: 'Invalid royalty value, it should be 0~10',
          variant: 'solid',
          status: 'warning',
          isClosable: true,
        })
        return
      }

      const tx = await setRoyalty({
        nftAddress,
        chainId: activeChain?.id,
        royaltyReceiverAddress: account,
        royaltyRate: royaltyBig.toString(),
      })

      await tx.wait()
      toast({
        title: 'Set royalty success!',
        variant: 'solid',
        status: 'success',
        isClosable: true,
      })
      onClose()
    } catch (err) {
      console.log(err)
    } finally {
      setIsCancelling(false)
    }
  }, [account, activeChain?.id, nftAddress, onClose, royalty, toast])

  const royaltyChange = useCallback((evt) => {
    const royalty = evt.currentTarget.value
    setRoyaltyValue(royalty)
  }, [])

  useEffect(() => {
    if (!account) return
    queryCollections({ owner_address: account as string }).then((res) => {
      if (res) {
        setCollections(res)
      }
    })
  }, [account, queryCollections])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropBlur={'10px'} blur={'10px'} />
      <ModalContent minW={{ base: '300px', sm: '500px' }}>
        <ModalCloseButton />
        <ModalBody padding="24px" paddingTop="10px">
          <ModalHeader padding="0" marginBottom={'60px'} fontSize="20px" lineHeight={'30px'}>
            Set up royalty
          </ModalHeader>

          <Stack>
            <Text color="#272E39" fontSize={'16px'} fontWeight="600" lineHeight={'24px'}>
              Collections
            </Text>
            <Select placeholder="Collections" onChange={collectionChange}>
              {collections.map((item, index) => (
                <option key={index} value={item.nft_address}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Stack>
          <Stack marginTop="24px">
            <Flex>
              <Text color="#272E39" fontSize={'16px'} fontWeight="600" lineHeight={'24px'}>
                Royalty
              </Text>
              <Text color="gray.300" marginLeft="10px">{` (0~10)`}</Text>
            </Flex>
            <Input placeholder="0~10" onChange={royaltyChange} />
          </Stack>
          <Flex justifyContent={'flex-end'} marginTop="40px" fontSize="16px" lineHeight={'24px'} fontWeight={600}>
            <Stack direction={'row'}>
              <Button variant={'outline'} width="172px" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button variant={'solid'} width="172px" onClick={clickSetRoyalty} isLoading={isCancelling}>
                Confirm
              </Button>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
