import { Stack, Text, Box, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { MediaBox } from '../MediaBox'
import { MintveseNft } from '../../types'
import { ExplorerLink } from '../ExplorerLink'

export const Name = ({ nft }: { nft: MintveseNft }) => {
  return (
    <Stack spacing={2} direction="row" alignItems={'center'}>
      <Box w="32px" h="32px">
        <MediaBox media={nft || {}} />
      </Box>
      <Stack>
        <Tooltip label={`${nft?.name} ${nft?.nft_address}`}>
          <Text
            maxW="120px"
            overflow={'hidden'}
            fontSize="14px"
            lineHeight={'20px'}
            color="#3B4556"
            fontWeight={600}
            textOverflow={'ellipsis'}
          >
            <ExplorerLink address={nft?.nft_address} chainId={1} text={nft?.name} />
          </Text>
        </Tooltip>
        {/* <Tooltip label={`${nft?.nft_address}`}>
          <Text
            maxW="120px"
            overflow={'hidden'}
            fontSize="14px"
            lineHeight={'20px'}
            color="#3B4556"
            fontWeight={600}
            marginTop="0 !important"
            textOverflow={'ellipsis'}
          >
            <ExplorerLink address={nft?.nft_address} chainId={1} text={nft?.nft_platform_name} />
          </Text>
        </Tooltip> */}
      </Stack>
    </Stack>
  )
}
