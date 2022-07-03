import { chakra, Flex, Icon, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import PPng from './p.png'
import Image from 'next/image'
import { CopyIcon, EditIcon } from '@chakra-ui/icons'
import { useProfile } from '../../context'
import CopyToClipboard from 'react-copy-to-clipboard'
import { SetRoyaltyModal } from '../SetRoyaltyModal'
import { Collection } from '../../types'
import { useQueryCollections } from '../../hooks'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

const NameAddressBox = chakra(Flex, {
  baseStyle: {
    marginLeft: '16px',
    display: 'flex',
    justifyContent: 'center',
  },
})

const ProfileContainer = chakra(Flex, {
  baseStyle: {
    w: '100%',
    h: { base: '150px', md: '88px' },
    background: '#FBFBFD',
    position: 'relative',
  },
})

const ProfileTabs = chakra(Flex, {
  baseStyle: {
    border: '1px solid #3B4556',
    padding: '4px',
    height: '40px',
    borderRadius: '6px',
    alignItems: 'center',
    background: '#fff',
    marginTop: { base: '24px', md: '0' },
    alignSelf: 'center',
    width: { base: '100%', md: 'auto' },
  },
})

const ProfileTab = chakra(Flex, {
  baseStyle: {
    height: '32px',
    lineHeight: '32px',
    padding: '0 32px',
    fontSize: '14px',
    borderRadius: '6px',
    fontWeight: '500',
    justifyContent: 'center',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
})

const Profile = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [collections, setCollections] = useState<Collection[]>([])
  const {
    query: { address },
  } = useRouter()
  const { address: myAddress } = useAccount()
  const toast = useToast({ position: 'top' })
  const {
    state: { tab },
    setTab,
  } = useProfile()
  const queryCollections = useQueryCollections()

  const copyClick = useCallback(() => {
    toast({
      title: `Copy Success!`,
      variant: 'solid',
      status: 'success',
      isClosable: true,
    })
  }, [toast])

  const clickEdit = useCallback(() => {
    onOpen()
  }, [onOpen])

  useEffect(() => {
    queryCollections({ owner_address: myAddress, blockchain: 'ETH' }).then((res: any) => {
      setCollections(res || [])
    })
  }, [myAddress, queryCollections])

  return (
    <>
      <ProfileContainer>
        <>
          <Flex
            maxW={'1200px'}
            width="100%"
            margin="0 auto"
            padding={{ base: '0 20px', lg: '0' }}
            justifyContent={{ base: 'center', md: 'space-between' }}
            flexDir={{ base: 'column', md: 'row' }}
          >
            <Flex alignItems="center">
              <Image src={PPng} />
              <NameAddressBox>
                <Text fontSize={'16px'} lineHeight={'20px'} fontWeight="600" color="#818D9F">
                  {address}
                </Text>
                <Tooltip label="Copy Address" hasArrow>
                  <>
                    <CopyToClipboard text={address as string} onCopy={copyClick}>
                      <Icon as={CopyIcon} color="#818D9F" margin="0 16px" cursor={'pointer'} />
                    </CopyToClipboard>
                  </>
                </Tooltip>

                {collections.length > 0 && (
                  <Tooltip label="Set royalty fee" hasArrow>
                    <Icon as={EditIcon} color="#818D9F" cursor={'pointer'} onClick={clickEdit} />
                  </Tooltip>
                )}
              </NameAddressBox>
            </Flex>
            <ProfileTabs>
              <ProfileTab
                bg={tab === 'Assets' ? '#3B4556' : '#fff'}
                color={tab === 'Assets' ? '#fff' : '#3B4556'}
                onClick={() => setTab('Assets')}
              >
                Assets
              </ProfileTab>
              {/* <ProfileTab
                bg={tab === 'My Orders' ? '#3B4556' : '#fff'}
                color={tab === 'My Orders' ? '#fff' : '#3B4556'}
                onClick={() => setTab('My Orders')}
              >
                My Orders
              </ProfileTab> */}
            </ProfileTabs>
          </Flex>
        </>
      </ProfileContainer>
      {collections.length > 0 && <SetRoyaltyModal onClose={onClose} isOpen={isOpen} />}
    </>
  )
}

export default Profile
