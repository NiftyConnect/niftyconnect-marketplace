import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useCollection } from '../../../context'
import { Filters } from '../../Filters'
import FilterSvg from './filter.svg'

export const CollectionFilter = () => {
  const {
    state: { isFilterExpand },
    setIsFilterExpand,
  } = useCollection()

  const clickFilter = useCallback(() => {
    setIsFilterExpand(true)
  }, [setIsFilterExpand])

  const clickExpandFilter = useCallback(() => {
    setIsFilterExpand(false)
  }, [setIsFilterExpand])

  return (
    <Flex flexDir={'column'} w="100%" backgroundColor={'#FBFBFD'} display={{ base: 'none', sm: 'flex' }}>
      {isFilterExpand ? (
        <>
          <Stack
            direction={'row'}
            marginBottom="40px"
            alignItems={'center'}
            border="1px solid #818D9F"
            borderRadius={'6px'}
            width="120px"
            padding="6px"
            cursor={'pointer'}
            marginTop="40px"
            marginLeft={'20px'}
            display="flex"
            justifyContent={'center'}
            onClick={clickExpandFilter}
          >
            <FilterSvg />
            <Text>Filter</Text>
            <ChevronLeftIcon />
          </Stack>
          <Filters />
        </>
      ) : (
        <Flex backgroundColor={'#FBFBFD'} width="100px" height={'100%'} justifyContent="center">
          <Box
            border="1px solid #3B4556"
            borderRadius={'6px'}
            onClick={clickFilter}
            height="36px"
            width="36px"
            marginTop="40px"
            display="flex"
            justifyContent={'center'}
            alignItems="center"
            cursor={'pointer'}
          >
            <FilterSvg />
          </Box>
        </Flex>
      )}
    </Flex>
  )
}
