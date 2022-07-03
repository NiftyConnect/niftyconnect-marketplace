import { Box, chakra, Container, Flex, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { MintveseNft } from '../../../types'
import { truncateString } from '../../../utils'
import { ExplorerLink } from '../../ExplorerLink'
import { MediaBox } from '../../MediaBox'

const Row = chakra(Flex, {
  baseStyle: {
    padding: '0',
    justifyContent: 'space-between',
  },
})
const NftLabel = chakra(Flex, {
  baseStyle: {
    fontSize: 12,
    lineHeight: '18px',
    color: '#818D9F',
    justifyContent: 'space-between',
  },
})

const NftInfo = chakra(Flex, {
  baseStyle: {
    fontSize: 12,
    lineHeight: '18px',
    color: '#3B4556',
    justifyContent: 'space-between',
  },
})

export const Details = ({ data }: { data: MintveseNft }) => {
  const chainId = useMemo(() => {
    if (data?.blockchain === 'BNB' || data?.blockchain === 'BSC') {
      return 56
    }

    return 1
  }, [data?.blockchain])

  return (
    <Container width="100%" margin="0" display={'flex'} padding="0" maxW="100%" flexDir={{ base: 'column', sm: 'row' }}>
      <Box
        marginRight={1.5}
        width={{ base: '100%', sm: '280px' }}
        height={'280px'}
        overflow="hidden"
        marginTop={{ base: '20px', sm: '0' }}
      >
        <MediaBox media={data} imgCardWidth={'280px'} />
      </Box>
      <Stack flex={1} paddingLeft={{ base: '0', sm: '24px' }} marginTop={{ base: '40px', sm: '0' }}>
        <Row>
          <NftLabel>NFT Standard:</NftLabel>
          <NftInfo>{data.token_standard === 0 ? 'ERC1155' : 'ERC721'}</NftInfo>
        </Row>
        <Row>
          <NftLabel>NFT Contract:</NftLabel>
          <NftInfo>
            {data.nft_address && (
              <ExplorerLink address={data.nft_address} chainId={chainId} text={truncateString(data.nft_address, 6)} />
            )}
          </NftInfo>
        </Row>
        <Row>
          <NftLabel>Token Id:</NftLabel>
          <NftInfo>{data.token_id ? Number(data.token_id) : ''}</NftInfo>
        </Row>
        <Row>
          <NftLabel>Creator:</NftLabel>
          <NftInfo>
            {data.creator_address && (
              <ExplorerLink
                address={data.creator_address}
                chainId={chainId}
                text={truncateString(data.creator_address, 6)}
              />
            )}
          </NftInfo>
        </Row>
        <Row>
          <NftLabel>Owner:</NftLabel>
          <NftInfo>
            {data.owner_address && (
              <ExplorerLink
                address={data.owner_address}
                chainId={chainId}
                text={truncateString(data.owner_address, 6)}
              />
            )}
          </NftInfo>
        </Row>
        <Row>
          <NftLabel>Token URI:</NftLabel>
          <NftInfo>
            {data.token_uri && (
              <Link href={data.token_uri}>
                <a target={'_blank'}>{truncateString(data.token_uri, 8)}</a>
              </Link>
            )}
          </NftInfo>
        </Row>
        <Row>
          <NftLabel>Blockchain:</NftLabel>
          <NftInfo>{data.blockchain}</NftInfo>
        </Row>
      </Stack>
    </Container>
  )
}
