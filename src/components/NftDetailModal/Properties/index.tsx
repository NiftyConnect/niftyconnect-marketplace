import { Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Attribute } from '../../../types'

type Props = {
  properties: Array<Attribute>
}

export const Properties = ({ properties }: Props) => {
  if (!properties || properties.length === 0) return null

  return (
    <Stack marginTop="20px">
      <Text color="#818D9F" fontSize={'12px'} lineHeight="18px">
        Properties:
      </Text>
      <Flex marginTop="10px" justifyContent={'flex-start'} flexWrap={'wrap'}>
        {properties?.map((item, index) => {
          return (
            <Flex
              flexDir={'column'}
              key={index}
              background="#FBFBFD"
              padding="8px 14px"
              borderRadius={'6px'}
              alignItems="center"
              marginRight={'16px'}
              marginBottom={'16px'}
              maxW="120px"
              overflow={'hidden'}
              textOverflow={'ellipsis'}
            >
              <Text color="#5A88B0" fontSize={'12px'} lineHeight="18px">
                {item?.trait_type}
              </Text>
              <Text
                color="#3B4556"
                fontSize={'12px'}
                lineHeight="18px"
                maxW="120px"
                overflow={'hidden'}
                textOverflow={'ellipsis'}
                whiteSpace="nowrap"
              >
                {item?.value}
              </Text>
              <Text></Text>
            </Flex>
          )
        })}
      </Flex>
    </Stack>
  )
}
