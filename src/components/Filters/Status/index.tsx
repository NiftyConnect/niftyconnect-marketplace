import { Flex, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { Select } from 'chakra-react-select'
import { useCollection } from '../../../context'

const StatusOptions = [
  { value: '', label: 'All' },
  { value: 'fixed_price', label: 'Fixed Price' },
  { value: 'dutch_auction', label: 'Auction' },
]

export const Status = () => {
  const {
    setFilters,
    state: { filters },
  } = useCollection()

  const changeStatus = useCallback(
    (newSaleKind) => {
      setFilters({ ...filters, saleKind: newSaleKind.value })
    },
    [filters, setFilters],
  )

  return (
    <Flex flexDir={'column'} marginBottom="24px">
      <Text fontSize={'md'} marginBottom={'8px'} fontWeight={600} color="#333" lineHeight={'24px'}>
        Status
      </Text>
      <Select
        chakraStyles={{
          dropdownIndicator: (provided) => ({
            ...provided,
            bg: 'transparent',
            p: 0,
            w: 6,
            mx: 2,
            cursor: 'inherit',
          }),
          container: (provided) => ({
            ...provided,
            cursor: 'pointer',
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
        }}
        options={StatusOptions}
        placeholder="All"
        closeMenuOnSelect={true}
        onChange={changeStatus}
      />
    </Flex>
  )
}
