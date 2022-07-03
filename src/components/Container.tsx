import { Flex, useColorMode, FlexProps } from '@chakra-ui/react'
import React from 'react'

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode()

  const color = { light: 'black', dark: 'white' }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={'#fff'}
      padding={'0 20px'}
      color={color[colorMode]}
      {...props}
    />
  )
}
