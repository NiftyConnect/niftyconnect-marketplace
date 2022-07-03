import { SearchIcon } from '@chakra-ui/icons'
import { chakra, Container, Input, Flex, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { AttributeItem } from '../AttributeItem'

const AttributesContainer = chakra(Container, {
  baseStyle: {
    padding: '0 0 20px 0',
  },
})

export const Attributes = ({
  data,
  attributesName,
}: {
  data: Array<{ attributes_value: string; total: number }>
  attributesName: string
}) => {
  const [filteredData, setFilteredData] = useState([])

  const attributeChange = useCallback(
    (evt) => {
      const filters = evt.currentTarget.value.trim()
      setFilteredData(
        data.filter((item) => item.attributes_value.toLocaleLowerCase().includes(filters.toLocaleLowerCase())),
      )
    },
    [data],
  )

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  return (
    <AttributesContainer>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input type="search" placeholder="filter" onChange={attributeChange} />
      </InputGroup>
      <Flex maxH="300px" flexDir={'column'} overflow="auto" paddingTop="20px">
        {filteredData?.map((item, index) => {
          return <AttributeItem key={index} data={item} attributesName={attributesName} />
        })}
      </Flex>
    </AttributesContainer>
  )
}
