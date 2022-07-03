import { chakra, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { useResizeCard } from '../../../hooks'

const NftListContainer = chakra(Flex, {
  baseStyle: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridGap: '24px 24px',
    position: 'relative',
    padding: '0 0 32px 0',
  },
})

export const LatestOrders = () => {
  const cardWidth = useResizeCard({ maxCardNum: 4 })

  return (
    <Container margin="0" padding={'60px,0'}>
      <NftListContainer
        gridTemplateColumns={`repeat(auto-fill, ${cardWidth}px)`}
        gridTemplateRows={`repeat(auto-fill, ${Number(cardWidth) + 100}px)`}
      ></NftListContainer>
    </Container>
  )
}
