import React from 'react'
import { ConfirmStep } from '../ConfirmStep'
import { useListModal } from '../context'
import { ListButtonGroup } from '../ListButtonGroup'
import { ListingStep } from '../ListingStep'
import { Success } from '../Success'

export const ListBody = () => {
  const {
    state: { step },
  } = useListModal()

  return (
    <>
      {step === 'List' && <ListingStep />}
      {step === 'Waiting' && <ConfirmStep />}
      {step === 'Success' && <Success />}
      {<ListButtonGroup />}
    </>
  )
}
