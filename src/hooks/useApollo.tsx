import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import moment from 'moment'
import { NiftyConnectOrder } from 'niftyconnect-js'
import { useCallback, useMemo } from 'react'
import {
  QUERY_NC_ORDERS,
  QUERY_NC_ORDERS_BY_MAKER,
  QUERY_NC_ORDERS_BY_MAKER_AND_NFTADDRESS,
  QUERY_NC_ORDERS_FOR_ADDRESS,
  QUERY_NC_ORDERS_FOR_COLLECTION,
  QUERY_NC_ORDERS_FOR_NFT,
} from '../apollo'
import { useChainId } from './useEthers'

export const useApplloClient = () => {
  const chainId = useChainId()

  return useMemo(() => {
    return new ApolloClient({
      link: new HttpLink({
        uri:
          chainId === 1
            ? 'https://api.thegraph.com/subgraphs/name/redefiine/nifty-connect'
            : 'https://api.thegraph.com/subgraphs/name/redefiine/ncpbnb',
      }),
      cache: new InMemoryCache(),
    })
  }, [chainId])
}

export const useQueryNCOrdersForNft = () => {
  const applloClient = useApplloClient()
  return useCallback(
    async ({
      nft_address,
      tokenId,
      account,
    }: {
      nft_address: string
      tokenId: string
      account: string
    }): Promise<NiftyConnectOrder[]> => {
      const response = await applloClient.query({
        query: QUERY_NC_ORDERS_FOR_NFT({ nftAddress: nft_address, tokenId, account }),
        fetchPolicy: 'cache-first',
      })

      return response?.data?.niftyConnectOrders
    },
    [applloClient],
  )
}

export const useQueryOrdersByMakerAndNftaddress = () => {
  const applloClient = useApplloClient()
  return useCallback(
    async ({ nft_address, maker }: { nft_address: string; maker: string }): Promise<NiftyConnectOrder[]> => {
      const response = await applloClient.query({
        query: QUERY_NC_ORDERS_BY_MAKER_AND_NFTADDRESS({ nftAddress: nft_address, maker }),
        fetchPolicy: 'cache-first',
      })

      return response?.data?.niftyConnectOrders
    },
    [applloClient],
  )
}

export const useQueryOrdersByMaker = () => {
  const applloClient = useApplloClient()
  return useCallback(
    async ({ maker }: { maker: string }): Promise<NiftyConnectOrder[]> => {
      const response = await applloClient.query({
        query: QUERY_NC_ORDERS_BY_MAKER(),
        variables: {
          maker: maker,
          expireTime: moment().unix(),
          first: 50,
          listingTime: moment('2022-05-05 17:05:48').unix(),
        },
        fetchPolicy: 'cache-first',
      })

      return response?.data?.niftyConnectOrders
    },
    [applloClient],
  )
}

export const useQueryNCOrdersForCollection = () => {
  const applloClient = useApplloClient()
  return useCallback(
    async ({ nft_address }: { nft_address?: string }) => {
      const response = await applloClient.query({
        query: QUERY_NC_ORDERS_FOR_COLLECTION(),
        variables: {
          nftAddress: nft_address,
          expireTime: moment().unix(),
          first: 50,
          listingTime: moment('2022-05-05 17:05:48').unix(),
        },
        fetchPolicy: 'cache-first',
      })

      return response?.data?.niftyConnectOrders
    },
    [applloClient],
  )
}

export const useQueryNCOrders = () => {
  const applloClient = useApplloClient()
  return useCallback(async () => {
    const response = await applloClient.query({
      query: QUERY_NC_ORDERS(),
      variables: { first: 50, expireTime: moment().unix(), listingTime: moment('2022-05-05 17:05:48').unix() },
      fetchPolicy: 'cache-first',
    })

    return response?.data?.niftyConnectOrders
  }, [applloClient])
}

export const useQueryNCOrdersByAddress = () => {
  const applloClient = useApplloClient()
  return useCallback(
    async ({ address }: { address: string }) => {
      const response = await applloClient.query({
        query: QUERY_NC_ORDERS_FOR_ADDRESS({ address }),
        fetchPolicy: 'cache-first',
      })

      return response?.data?.niftyConnectOrders
    },
    [applloClient],
  )
}
