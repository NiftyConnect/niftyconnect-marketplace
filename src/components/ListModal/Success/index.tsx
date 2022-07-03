import { chakra, Container, Flex, Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { useListModal } from '../context'
import SuccessSvg from './success.svg'
import SuccessBgSvg from './success_bg.svg'

const CenterBox = chakra(Flex, {
  baseStyle: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '222px',
    w: '340px',
    flex: 1,
  },
})

const CenterBoxBg = chakra(Flex, {
  baseStyle: {
    position: 'absolute',
    zIndex: 0,
    h: '100%',
  },
})

const Tips = chakra(Text, {
  baseStyle: {
    color: '#1D1D1D',
    fontSize: '24px',
    lineHeight: '36px',
    fontWeight: 600,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '2px',
    whiteSpace: 'nowrap',
  },
})

export const Success = () => {
  const {
    state: { salePrice, payment, expireTime },
  } = useListModal()
  return (
    <Container padding={0}>
      <Flex w="100%">
        <CenterBox>
          <SuccessSvg />
          <Tips>Successful listing</Tips>
          <CenterBoxBg>
            <SuccessBgSvg />
          </CenterBoxBg>
        </CenterBox>
      </Flex>
      <Flex marginTop="24px" justifyContent={'space-between'} fontSize="16px" lineHeight={'24px'} fontWeight={600}>
        <Text>List Price</Text>
        <Text>{`${salePrice} ${payment.symbol}`}</Text>
      </Flex>
      <Flex justifyContent={'space-between'} marginTop="18px" fontSize="16px" lineHeight={'24px'} fontWeight={600}>
        <Text>Duration</Text>
        <Text>{moment(expireTime).format('YYYY-MM-DD HH:MM:SS')}</Text>
      </Flex>
      <Flex w="100%" color="#818D9F" justifyContent={'center'} marginTop="5px">
        You’ll see your order within a few minutes
      </Flex>
    </Container>
  )
}
