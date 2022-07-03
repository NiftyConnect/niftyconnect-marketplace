import { Container, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useListModal } from '../context'
import { MediaBox } from '../../MediaBox'

export const ListHeader = () => {
  const {
    state: { nft },
  } = useListModal()
  return (
    <Container padding={0} marginTop="12px">
      <Heading fontSize={'20px'} lineHeight="30px" color="#272E39">
        List item for sale
      </Heading>
      <Flex paddingTop="20px">
        <Stack spacing={4} display="flex" width="48px" height="48px">
          <MediaBox media={nft} />
        </Stack>
        <Flex flexGrow={1} flexDir="column" marginLeft={'16px'} paddingTop="2px">
          <Text
            color="#818D9F"
            fontSize={'12px'}
            lineHeight="15px"
            maxW="250px"
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            whiteSpace="nowrap"
          >
            {nft.name}
          </Text>
        </Flex>
      </Flex>
    </Container>
  )
}
