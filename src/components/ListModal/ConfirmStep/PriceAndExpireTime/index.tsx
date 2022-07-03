import { Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useListModal } from '../../context'

export const PriceAndExpireTime = () => {
  const {
    state: { salePrice, expireTime, payment },
  } = useListModal()

  return (
    <Container padding={0} marginTop="40px">
      <Flex justifyContent={'space-between'} fontSize="16px" lineHeight={'24px'} fontWeight={600}>
        <Text>List Price</Text>
        <Text>{`${salePrice} ${payment.symbol}`}</Text>
      </Flex>
      <Flex justifyContent={'space-between'} marginTop="18px" fontSize="16px" lineHeight={'24px'} fontWeight={600}>
        <Text>Duration</Text>
        <Text>{expireTime.format('YYYY-MM-DD HH:MM:SS')}</Text>
      </Flex>
    </Container>
  )
}
