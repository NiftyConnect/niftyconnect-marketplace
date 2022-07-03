import { chakra, Container } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { useProfile } from '../../context'
import { OrderList } from './OrderList'

const NftList = dynamic(() => import('./NftList'), {
  ssr: false,
})

const Content = chakra(Container, {
  baseStyle: {
    marginTop: '36px',
    maxW: '1200px',
    minH: '600px',
    w: '100%',
    padding: 0,
    position: 'relative',
    paddingBottom: '50px',
  },
})

export const SellContent = () => {
  const {
    state: { tab },
  } = useProfile()
  return <Content>{tab === 'Assets' ? <NftList /> : <OrderList />}</Content>
}
