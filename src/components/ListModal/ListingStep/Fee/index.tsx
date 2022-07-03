import { chakra, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Title = chakra(Flex, {
  baseStyle: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#333',
    fontWeight: 600,
    marginBottom: '12px',
  },
})

export const Fee = () => {
  return (
    <Container padding={0} marginTop="24px">
      <Title>Fee</Title>
      <Flex justifyContent={'space-between'} fontWeight="600">
        <Text fontSize={'12px'} lineHeight="18px" color="#3B4556">
          Trading Fee
        </Text>
        <Text fontSize={'12px'} lineHeight="18px" color="#3B4556">
          0%
        </Text>
      </Flex>
      <Flex justifyContent={'space-between'} fontWeight="600" marginTop="12px">
        <Text fontSize={'12px'} lineHeight="18px" color="#818D9F">
          Creator Royalties
        </Text>
        <Text fontSize={'12px'} lineHeight="18px" color="#818D9F">
          0%
        </Text>
      </Flex>
    </Container>
  )
}
