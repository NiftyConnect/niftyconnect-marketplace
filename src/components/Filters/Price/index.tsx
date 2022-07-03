import { Flex, Input, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useCollection } from '../../../context'

export const Price = () => {
  const {
    setFilters,
    state: { filters },
  } = useCollection()

  const minPriceChange = useCallback(
    (evt) => {
      setFilters({ ...filters, minPrice: evt.currentTarget.value })
    },
    [filters, setFilters],
  )

  const maxPriceChange = useCallback(
    (evt) => {
      setFilters({ ...filters, minPrice: evt.currentTarget.value })
    },
    [filters, setFilters],
  )

  return (
    <Flex flexDir={'column'} marginBottom="24px">
      <Text fontSize={'md'} marginBottom={'8px'} fontWeight={600} color="#333" lineHeight={'24px'}>
        Price
      </Text>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Input placeholder="Min" onChange={minPriceChange} />
        <Text margin="0 10px" color="#818D9F" opacity={0.5}>
          To
        </Text>
        <Input placeholder="Max" onChange={maxPriceChange} />
      </Flex>
    </Flex>
  )
}
