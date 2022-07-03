import { useDisclosure } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { Container } from '../../../components/Container'
import { UseOrderProvider, UseProfileProvider } from '../../../context'
import { SellContent } from '../../../components/SellContent'
import { WalletModal } from '../../../components/WalletModal'

const Profile = dynamic(() => import('../../../components/Profile'), {
  ssr: false,
})

const ProfilePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <UseOrderProvider>
        <UseProfileProvider>
          <Container padding={0}>
            <Profile />
            <SellContent />
            <WalletModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
          </Container>
        </UseProfileProvider>
      </UseOrderProvider>
    </>
  )
}

export default ProfilePage
