import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { MintveseNft } from '../../../types'

export const DetailHeader = ({ data }: { data: MintveseNft }) => {
  return (
    <Flex marginBottom={'2.5'} flexDir="row" alignItems="center">
      <Text fontSize={'20px'} lineHeight="30px" fontWeight={'600'} marginRight="20px">
        {data?.name}
      </Text>
      {/* <ShareSvg /> */}
    </Flex>
  )
}
