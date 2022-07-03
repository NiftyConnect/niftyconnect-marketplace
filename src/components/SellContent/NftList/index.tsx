import { Button, chakra, Flex, Spinner } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useFixedResizeCard, useQueryNftsByAddress } from '../../../hooks'
import { Empty } from '../../Empty'
import { NftInfoWithOrder, NftScanOrder } from '../../../types'
import { NftCard } from '../../NftCard'
import { useRouter } from 'next/router'

const NftListContainer = chakra(Flex, {
  baseStyle: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridGap: '24px 24px',
    position: 'relative',
    padding: '0 0 32px 0',
  },
})

const LoadingContainer = chakra(Flex, {
  baseStyle: {
    padding: '50px 0',
    position: 'relative',
    justifyContent: 'center',
  },
})

const NftList = () => {
  const cardWidth = useFixedResizeCard({ maxCardNum: 4 })
  const {
    query: { address },
  } = useRouter()
  const [isQuerying, setIsQuerying] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [erc721Page, setErc721Page] = useState('0')
  const [total, setTotal] = useState(0)
  const [nfts, setNfts] = useState<NftInfoWithOrder[]>([])
  const queryNfts = useQueryNftsByAddress()

  const clickMore = useCallback(async () => {
    try {
      setIsLoadingMore(true)
      queryNfts({ address: address as string, erc_type: 'erc721', cursor: erc721Page }).then((value) => {
        setNfts(nfts.concat(value.content.map((item) => ({ nft: { ...item } }))))
        setErc721Page(value?.next)
      })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingMore(false)
    }
  }, [address, erc721Page, nfts, queryNfts])

  useEffect(() => {
    if (!address) return
    setIsQuerying(true)
    Promise.all([queryNfts({ address: address as string, erc_type: 'erc721' })])
      .then((values) => {
        setNfts(values[0].content.map((item) => ({ nft: { ...item }, order: {} as NftScanOrder })))
        setErc721Page(values[0].next)
        setTotal(values[0].total)
      })
      .finally(() => {
        setIsQuerying(false)
      })
  }, [address, queryNfts])

  return (
    <>
      {isQuerying && (
        <LoadingContainer>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="#3B4556" size="xl" />
        </LoadingContainer>
      )}

      {nfts.length > 0 && (
        <NftListContainer
          gridTemplateColumns={`repeat(auto-fill, ${cardWidth}px)`}
          gridTemplateRows={`repeat(auto-fill, ${Number(cardWidth) + 100}px)`}
        >
          {nfts.map((nft, index) => {
            return <NftCard data={nft} key={index} imgCardWidth={`${Number(cardWidth) - 20}`} />
          })}
        </NftListContainer>
      )}

      {nfts.length === 0 && !isQuerying && <Empty />}

      {nfts.length < total && (
        <Flex justifyContent={'center'}>
          <Button onClick={clickMore} isLoading={isLoadingMore}>
            Load more
          </Button>
        </Flex>
      )}
    </>
  )
}

export default NftList
