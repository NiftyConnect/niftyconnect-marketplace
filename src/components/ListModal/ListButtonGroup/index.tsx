import { Button, Flex, Stack } from '@chakra-ui/react'
import React, { useCallback, useMemo } from 'react'
import { useListModal } from '../context'

export const ListButtonGroup = () => {
  const {
    onClose,
    state: { salePrice, step },
    setStep,
  } = useListModal()

  const clickComplete = useCallback(() => {
    setStep('Waiting')
  }, [setStep])

  const clickOk = useCallback(() => {
    setStep('List')
    onClose()
  }, [onClose, setStep])

  const isButtonDisable = useMemo(() => {
    if (step === 'List') {
      return !salePrice
    }

    return step !== 'Success'
  }, [salePrice, step])

  return (
    <Flex justifyContent={'flex-end'} marginTop="40px">
      {step === 'Success' && (
        <Button variant={'solid'} w="100%" onClick={clickOk}>
          Ok
        </Button>
      )}

      {step === 'List' && (
        <Stack width={'350px'} spacing={4} direction={{ base: 'column', sm: 'row' }}>
          <Button variant={'outline'} width={{ base: '100%', sm: '170px' }} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={'solid'}
            width={{ base: '100%', sm: '170px' }}
            onClick={clickComplete}
            disabled={isButtonDisable}
          >
            Complete Listing
          </Button>
        </Stack>
      )}
    </Flex>
  )
}
