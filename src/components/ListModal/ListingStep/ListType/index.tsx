import { chakra, Container, Flex } from '@chakra-ui/react'
import { SellType } from 'niftyconnect-js'
import React from 'react'
import { useListModal } from '../../context'

const Title = chakra(Flex, {
  baseStyle: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#333',
    fontWeight: 600,
    marginBottom: '12px',
  },
})

const TypeTabs = chakra(Flex, {
  baseStyle: {
    border: '1px solid #3B4556',
    padding: '4px',
    borderRadius: '6px',
  },
})

const TypeTab = chakra(Flex, {
  baseStyle: {
    height: '32px',
    width: '50%',
    lineHeight: '32px',
    fontSize: '14px',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: '6px',
  },
})

export const ListType = () => {
  const {
    setSaleType,
    state: { saleType },
  } = useListModal()

  return (
    <Container padding={0} marginTop="40px">
      <Title>Type</Title>
      <TypeTabs>
        <TypeTab
          bg={saleType === SellType.FixedPrice ? '#3B4556' : '#fff'}
          color={saleType === SellType.FixedPrice ? '#fff' : '#3B4556'}
          onClick={() => setSaleType(SellType.FixedPrice)}
        >
          Fixed Price
        </TypeTab>
        <TypeTab
          bg={saleType === SellType.FixedPrice ? '#fff' : '#3B4556'}
          color={saleType === SellType.TimedAuction ? '#fff' : '#3B4556'}
          onClick={() => setSaleType(SellType.TimedAuction)}
        >
          Timed Auction
        </TypeTab>
      </TypeTabs>
    </Container>
  )
}
