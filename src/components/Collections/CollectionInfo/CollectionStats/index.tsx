import { Box, chakra, Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useCollection } from '../../../../context'
import { formatNum } from '../../../../utils'

const Title = chakra(Text, {
  baseStyle: {
    fontSize: '12px',
    lineHeight: '20px',
    color: '#818D9F',
    fontWeight: 400,
  },
})

const Value = chakra(Text, {
  baseStyle: {
    fontSize: '14px',
    lineHeight: '21px',
    color: '#3B4556',
    fontWeight: 600,
    textAlign: 'center',
  },
})

const CollectionStatsContainer = chakra(Flex, {
  baseStyle: {
    border: '1px solid #818D9F',
    borderRadius: '6px',
    padding: '8px 24px',
  },
})

export const CollectionStats = () => {
  const {
    state: { collection },
  } = useCollection()

  return (
    <CollectionStatsContainer width={{ base: '100%', sm: '434px' }} justifyContent={'space-between'}>
      <Box textAlign={'center'}>
        <Title>Items</Title>
        <Value>{formatNum(collection.items_total)}</Value>
      </Box>
      <Divider orientation="vertical" height={'40px'} />
      <Box>
        <Title>Floor price</Title>
        <Value>{`${collection.opensea_floor_price} ETH`}</Value>
      </Box>
      <Divider orientation="vertical" height={'40px'} />
      <Box>
        <Title>Owners</Title>
        <Value>{formatNum(collection.owners_total)}</Value>
      </Box>
      <Divider orientation="vertical" height={'40px'} />
      <Box>
        <Title>Volume Traded</Title>
        <Value>{0}</Value>
      </Box>
    </CollectionStatsContainer>
  )
}
