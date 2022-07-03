import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import EmtpySvg from './empty.svg'

export const Empty = () => {
  return (
    <Flex padding={'50px'} marginTop="30px" width="100%" flexDir="column" justifyContent="center" align={'center'}>
      <EmtpySvg />
      <Text marginTop={'32px'} whiteSpace="nowrap">
        No data to display ~~
      </Text>
    </Flex>
  )
}
