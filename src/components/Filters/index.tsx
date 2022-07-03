import { chakra, Container } from '@chakra-ui/react'
import React from 'react'
import { BuyNow } from './BuyNow'
import { CollectionAttributes } from './CollectionAttributes'
import { Price } from './Price'
import { Status } from './Status'

const FiltersContainer = chakra(Container, {
  baseStyle: {
    margin: 0,
    w: '310px',
    padding: '40px 32px',
  },
})

export const Filters = () => {
  return (
    <FiltersContainer>
      <Status />
      <BuyNow />
      <Price />
      <CollectionAttributes />
    </FiltersContainer>
  )
}
