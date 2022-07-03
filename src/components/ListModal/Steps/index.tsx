import { Box, chakra, Stack } from '@chakra-ui/react'
import React from 'react'
import { useListModal } from '../context'

const Dot = chakra(Box, {
  baseStyle: {
    width: '4px',
    height: '4px',
    background: '#818D9F',
  },
})

const CurrentStep = chakra(Box, {
  baseStyle: {
    width: '24px',
    height: '4px',
    background: '#3B4556',
  },
})

export const Steps = () => {
  const {
    state: { step },
  } = useListModal()

  return (
    <Stack spacing={1} direction="row" align="center">
      {step === 'List' ? <CurrentStep /> : <Dot />}
      {step === 'Waiting' ? <CurrentStep /> : <Dot />}
      {step === 'Success' ? <CurrentStep /> : <Dot />}
    </Stack>
  )
}
