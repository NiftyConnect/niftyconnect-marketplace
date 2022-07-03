import { chakra, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useListModal } from '../../context'
import GouSvg from './gou.svg'
import WGouSvg from './wgou.svg'

const Title = chakra(Flex, {
  baseStyle: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#333',
    fontWeight: 600,
    marginBottom: '12px',
  },
})

const ExpirationBox = chakra(Flex, {
  baseStyle: {
    width: '80px',
    height: '32px',
    background: '#EDEDED',
    color: '#3B4556',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    lineHeight: '32px',
    cursor: 'pointer',
  },
})

export const Duration = () => {
  const {
    state: { duration },
    changeDuration,
  } = useListModal()

  return (
    <Container padding={0} marginTop={'24px'}>
      <Title>Duration</Title>
      <Flex justifyContent={'space-between'}>
        <ExpirationBox
          background={duration === '3 Days' ? '#3B4556' : '#EDEDED'}
          color={duration === '3 Days' ? '#fff' : '#3B4556'}
          onClick={() => changeDuration('3 Days')}
        >
          {duration === '3 Days' ? <WGouSvg /> : <GouSvg />}
          <Text marginLeft="4px">3 Days</Text>
        </ExpirationBox>
        <ExpirationBox
          background={duration === '7 Days' ? '#3B4556' : '#EDEDED'}
          color={duration === '7 Days' ? '#fff' : '#3B4556'}
          onClick={() => changeDuration('7 Days')}
        >
          {duration === '7 Days' ? <WGouSvg /> : <GouSvg />} <Text marginLeft="4px">7 Days</Text>
        </ExpirationBox>
        <ExpirationBox
          background={duration === '15 Days' ? '#3B4556' : '#EDEDED'}
          color={duration === '15 Days' ? '#fff' : '#3B4556'}
          onClick={() => changeDuration('15 Days')}
        >
          {duration === '15 Days' ? <WGouSvg /> : <GouSvg />} <Text marginLeft="4px">15 Days</Text>
        </ExpirationBox>
        <ExpirationBox
          background={duration === '30 Days' ? '#3B4556' : '#EDEDED'}
          color={duration === '30 Days' ? '#fff' : '#3B4556'}
          onClick={() => changeDuration('30 Days')}
        >
          {duration === '30 Days' ? <WGouSvg /> : <GouSvg />} <Text marginLeft="4px">30 Days</Text>
        </ExpirationBox>
      </Flex>
    </Container>
  )
}
