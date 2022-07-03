import React from 'react'
import { Duration } from './Duration'
import { Fee } from './Fee'
import { ListHeader } from '../ListHeader'
import { ListType } from './ListType'
import { SalePrice } from './SalePrice'
import { useListModal } from '../context'
import { Amount } from './Amount'

export const ListingStep = () => {
  const {
    state: {
      nft: { erc_type: token_standard },
    },
  } = useListModal()

  return (
    <>
      <ListHeader />
      <ListType />
      <SalePrice />
      {token_standard === 'erc1155' && <Amount />}
      <Duration />
      <Fee />
    </>
  )
}
