import { Flex, Checkbox, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useCollection } from '../../../../context'

export const AttributeItem = ({
  data,
  attributesName,
}: {
  data: { attributes_value: string; total: number }
  attributesName: string
}) => {
  const {
    state: { filters },
    setFilters,
  } = useCollection()

  const attributeChange = useCallback(
    (evt) => {
      const checked = evt.currentTarget.checked
      if (checked) {
        filters?.attributes.push({ attributes_name: attributesName, attributes_value: data.attributes_value })
        setFilters({ ...filters, attributes: [...filters.attributes] })
      } else {
        const index = filters?.attributes?.findIndex((item) => item.attributes_name === attributesName)
        filters?.attributes.splice(index, 1)
        setFilters({ ...filters, attributes: [...filters.attributes] })
      }
    },
    [attributesName, data.attributes_value, filters, setFilters],
  )

  return (
    <Flex alignItems={'center'} justifyContent="space-between" padding="16px 0">
      <Checkbox color="#3B4556" fontSize={'14px'} fontWeight="500" lineHeight={'21px'} onChange={attributeChange}>
        {data.attributes_value}
      </Checkbox>
      <Text color="#818D9F" fontSize={'14px'} fontWeight="500" lineHeight={'21px'}>
        {data.total}
      </Text>
    </Flex>
  )
}
