import { Button, chakra, Flex, Spinner } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useCollection } from '../../../context'
import { useQueryNftsByContract } from '../../../hooks'
import { NftInfoWithOrder } from '../../../types'
import { Empty } from '../../Empty'
import { NftCard } from '../../NftCard'
import { BigNumber } from 'bignumber.js'
import { isWindows } from 'react-device-detect'
import { calcCardSize } from '../../../utils'

const NftListContainer = chakra(Flex, {
  baseStyle: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridGap: '24px 24px',
    position: 'relative',
    padding: '0 0 10px 0',
    marginTop: '20px',
  },
})

const LoadingContainer = chakra(Flex, {
  baseStyle: {
    padding: '50px 0',
    position: 'relative',
    justifyContent: 'center',
  },
})

export const NftList = () => {
  const [cardWidth, setCardWidth] = useState('20%')
  const {
    state: { collection, isFilterExpand, cardNum: maxCardNum, filters, priceSortOrder, tokenId },
  } = useCollection()
  const [isQuerying, setIsQuerying] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [page, setPage] = useState('0')
  const [nfts, setNfts] = useState<NftInfoWithOrder[]>([])
  const [totalNftCount, setTotalNftCount] = useState(0)
  const queryNfts = useQueryNftsByContract()

  const clickMore = useCallback(() => {
    setIsLoadingMore(true)
    const params: any = {
      contractAddress: collection.contract_address,
      cursor: page,
      sale_kind: filters.saleKind,
      sort_direction: priceSortOrder,
      attributes: filters.attributes,
      token_id: tokenId,
    }

    if (filters.isBuyNow) {
      params.order_status = 'buy_now'
    }

    if (filters.minPrice) {
      params.min_price = filters.minPrice
    }

    if (filters.maxPrice) {
      params.max_price = filters.maxPrice
    }
    queryNfts(params)
      .then((res) => {
        const items = res?.data?.content.map((item) => {
          return {
            nft: {
              amount: item.amount,
              content_type: item.content_type,
              content_uri: item.content_uri,
              contract_name: item.contract_name,
              contract_address: item.contract_address,
              contract_token_id: item.contract_token_id,
              erc_type: item.erc_type,
              external_link: item.external_link,
              image_uri: item.image_uri,
              latest_trade_price: item.latest_trade_price,
              metadata_json: item.metadata_json,
              mint_price: item.mint_price,
              mint_timestamp: item.mint_timestamp,
              mint_transaction_hash: item.mint_transaction_hash,
              minter: item.minter,
              name: item.name,
              nftscan_id: item.nftscan_id,
              nftscan_uri: item.nftscan_uri,
              owner: item.owner,
              token_id: item.token_id,
              token_uri: item.token_uri,
            },
            order: {
              base_price: item.base_price,
              calldata: item.calldata,
              exchange: item.exchange,
              expiration_time: item.expiration_time,
              extra: item.extra,
              ipfs_hash: item.ipfs_hash,
              listing_time: item.listing_time,
              maker: item.maker,
              maker_relayer_fee_recipient: item.maker_relayer_fee_recipient,
              nft_address: item.nft_address,
              order_change_hash: item.order_change_hash,
              order_change_time: item.order_change_time,
              order_hash: item.order_hash,
              order_stat: item.order_stat,
              payment_token: item.payment_token,
              replacement_pattern: item.replacement_pattern,
              rss_metadata: item.rss_metadata,
              sale_kind: item.sale_kind,
              sale_side: item.sale_side,
              salt: item.salt,
              static_extradata: item.static_extradata,
              static_target: item.static_target,
              taker: item.taker,
              taker_relayer_fee_recipient: item.taker_relayer_fee_recipient,
              token_id: item.token_id,
              trade_price: item.trade_price,
              tx_hash: item.tx_hash,
              tx_time: item.tx_time,
            },
          }
        })
        setNfts(nfts.concat(items))
        setPage(res.data.next)
      })
      .finally(() => {
        setIsLoadingMore(false)
      })
  }, [
    collection.contract_address,
    filters.attributes,
    filters.isBuyNow,
    filters.maxPrice,
    filters.minPrice,
    filters.saleKind,
    nfts,
    page,
    priceSortOrder,
    queryNfts,
    tokenId,
  ])

  useEffect(() => {
    setIsQuerying(true)
    setNfts([])
    const params: any = {
      contractAddress: collection.contract_address,
      cursor: '0',
      sale_kind: filters.saleKind,
      sort_direction: priceSortOrder,
      attributes: filters.attributes,
    }

    if (tokenId) {
      params.token_id = tokenId
    }

    if (filters.isBuyNow) {
      params.order_status = 'buy_now'
    }

    if (filters.minPrice) {
      params.min_price = filters.minPrice
    }

    if (filters.maxPrice) {
      params.max_price = filters.maxPrice
    }

    queryNfts(params)
      .then((res) => {
        const items = res?.data?.content.map((item) => {
          return {
            nft: {
              amount: item.amount,
              content_type: item.content_type,
              content_uri: item.content_uri,
              contract_name: item.contract_name,
              contract_address: item.contract_address,
              contract_token_id: item.contract_token_id,
              erc_type: item.erc_type,
              external_link: item.external_link,
              image_uri: item.image_uri,
              latest_trade_price: item.latest_trade_price,
              metadata_json: item.metadata_json,
              mint_price: item.mint_price,
              mint_timestamp: item.mint_timestamp,
              mint_transaction_hash: item.mint_transaction_hash,
              minter: item.minter,
              name: item.name,
              nftscan_id: item.nftscan_id,
              nftscan_uri: item.nftscan_uri,
              owner: item.owner,
              token_id: item.token_id,
              token_uri: item.token_uri,
            },
            order: {
              base_price: item.base_price,
              calldata: item.calldata,
              exchange: item.exchange,
              expiration_time: item.expiration_time,
              extra: item.extra,
              ipfs_hash: item.ipfs_hash,
              listing_time: item.listing_time,
              maker: item.maker,
              maker_relayer_fee_recipient: item.maker_relayer_fee_recipient,
              nft_address: item.nft_address,
              order_change_hash: item.order_change_hash,
              order_change_time: item.order_change_time,
              order_hash: item.order_hash,
              order_stat: item.order_stat,
              payment_token: item.payment_token,
              replacement_pattern: item.replacement_pattern,
              rss_metadata: item.rss_metadata,
              sale_kind: item.sale_kind,
              sale_side: item.sale_side,
              salt: item.salt,
              static_extradata: item.static_extradata,
              static_target: item.static_target,
              taker: item.taker,
              taker_relayer_fee_recipient: item.taker_relayer_fee_recipient,
              token_id: item.token_id,
              trade_price: item.trade_price,
              tx_hash: item.tx_hash,
              tx_time: item.tx_time,
            },
          }
        })
        setNfts(items)
        setPage(res?.data?.next)
        setTotalNftCount(res?.data?.total)
      })
      .finally(() => {
        setIsQuerying(false)
      })
  }, [
    collection.contract_address,
    filters.attributes,
    filters.isBuyNow,
    filters.maxPrice,
    filters.minPrice,
    filters.saleKind,
    priceSortOrder,
    queryNfts,
    tokenId,
  ])

  useEffect(() => {
    function resize() {
      const innerWidth = isWindows ? window.document.body.clientWidth : window.innerWidth
      const width = isFilterExpand ? innerWidth - 334 : innerWidth - 124
      const paddingLen = 40

      if (width > 1920) {
        setCardWidth(calcCardSize(width))
      }

      if (width > 1200 && width <= 1920) {
        const value = new BigNumber(width)
          .minus(paddingLen + 24 * (maxCardNum - 1))
          .div(maxCardNum)
          .dp(0, 1)
          .toString()

        setCardWidth(value)
      }

      if (width >= 768 && width < 1200) {
        const value = new BigNumber(width)
          .minus(paddingLen + 24 * (maxCardNum - 2))
          .div(maxCardNum - 1)
          .dp(0, 1)
          .toString()
        setCardWidth(value)
      }

      if (width > 512 && width < 768) {
        const value = new BigNumber(width)
          .minus(paddingLen + 24 * (maxCardNum - 3))
          .div(maxCardNum - 2)
          .dp(0, 1)
          .toString()
        setCardWidth(value)
      }

      if (width <= 512) {
        const value = new BigNumber(innerWidth).minus(paddingLen).dp(0, 1).toString()
        setCardWidth(value)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [isFilterExpand, maxCardNum])

  return (
    <Flex flexDir={'column'} minH={'600px'}>
      {isQuerying && (
        <LoadingContainer>
          <Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="#3B4556" size="lg" />
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

      {!isQuerying && nfts.length < totalNftCount && nfts.length !== 0 && (
        <Flex justifyContent={'center'} padding="0px 0 40px 0" marginTop="40px">
          <Button onClick={clickMore} isLoading={isLoadingMore}>
            Load more
          </Button>
        </Flex>
      )}
    </Flex>
  )
}
