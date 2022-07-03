import React from 'react'
import { ListHeader } from '../ListHeader'
import { ListProgress } from './ListProgress'
import { PriceAndExpireTime } from './PriceAndExpireTime'

export const ConfirmStep = () => {
  return (
    <>
      <ListHeader />
      <PriceAndExpireTime />
      <ListProgress />
    </>
  )
}
