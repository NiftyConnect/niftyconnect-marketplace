import { Flex, Switch, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useCollection } from '../../../context'

export const BuyNow = () => {
  const {
    setFilters,
    state: { filters },
  } = useCollection()

  const changeStatus = useCallback(
    (evt) => {
      setFilters({ ...filters, isBuyNow: evt.currentTarget.checked })
    },
    [filters, setFilters],
  )

  return (
    <Flex justifyContent={'space-between'} marginBottom={'24px'}>
      <Text fontSize={'md'} marginBottom={'8px'} fontWeight={600} color="#333" lineHeight={'24px'}>
        Buy now
      </Text>
      <Switch size={'md'} onChange={changeStatus} />
    </Flex>
  )
}
