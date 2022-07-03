import BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import { useAccount } from 'wagmi'
import { BLOCKCHAINS, DEFAULT_PAGE_COUNT, MT_API_BASE_URL } from '../constants'
import { Collection, MintveseNft, NftScanNft, NftScanOrder, NFTType, SupportNetwork } from '../types'
import { get, post } from '../utils'
import { useQueryNCOrdersForNft } from './useApollo'

type QueryNftResponse = {
  total: number
  content: MintveseNft[]
}

type BatchQueryNftResposne = {
  blockchain: string
  nfts: Array<{ nft_address: string; token_id: string; nft: MintveseNft; collection: { name: string } }>
}

export const useQueryAllNftByAddress = () => {
  return useCallback(
    async ({
      blockchain,
      user_address,
      page_index = 1,
      page_size = DEFAULT_PAGE_COUNT,
    }: {
      blockchain?: SupportNetwork
      user_address: string
      page_index: number
      page_size: number
    }): Promise<QueryNftResponse> => {
      const requests: Promise<QueryNftResponse>[] = []
      const chains = blockchain ? [blockchain] : BLOCKCHAINS

      chains.forEach((chain) => {
        requests.push(
          post<QueryNftResponse>({
            url: 'ext/queryAllNftByUserAddress',
            params: { blockchain: chain, user_address, erc: 'erc1155', page_index, page_size },
            withCrud: false,
          }),
        )

        requests.push(
          post<QueryNftResponse>({
            url: 'ext/queryAllNftByUserAddress',
            params: { blockchain: chain, user_address, erc: 'erc721', page_index, page_size },
            withCrud: false,
          }),
        )
      })

      const results = await Promise.all(requests)

      const res = results.reduce(
        (a: QueryNftResponse, b: QueryNftResponse) => {
          return {
            total: Number(a?.total || 0) + Number(b?.total || 0),
            content: a?.content
              ?.map((item) => ({ ...item, token_standard: 1 }))
              .concat(b?.content?.map((item) => ({ ...item, token_standard: 0 })) || []),
          }
        },
        { total: 0, content: [] },
      )

      return {
        total: res.total,
        content: res.content,
      }
    },
    [],
  )
}

export const useQueryNftWithOrders = () => {
  const {
    data: { address: account },
  } = useAccount()
  const queryNfts = useQueryAllNftByAddress()
  const queryNCOrderForNft = useQueryNCOrdersForNft()

  return useCallback(
    async ({
      blockchain,
      user_address,
      page_index = 1,
      page_size = 20,
    }: {
      blockchain: SupportNetwork
      user_address: string
      page_index?: number
      page_size?: number
    }): Promise<MintveseNft[]> => {
      const res = await queryNfts({ blockchain, user_address, page_index, page_size })
      const params = res.content.map((item) => {
        return { nft_address: item.nft_address, tokenId: `0x${new BigNumber(item.token_id).toString(16)}`, account }
      })

      const orders = await Promise.all(params.map((p) => queryNCOrderForNft(p)))
      res.content.map((n) => {
        n.orders = orders
          .filter((o) => o.length > 0)
          .find(
            (o) =>
              String(o[0].tokenId) === `0x${new BigNumber(n.token_id).toString(16)}` &&
              o[0].nftAddress === n.nft_address,
          )
      })

      return res.content
    },
    [account, queryNCOrderForNft, queryNfts],
  )
}

export const useBatchQueryNfts = () => {
  return useCallback(
    async (params: { blockchain: string; nfts: Array<{ nft_address: string; token_id: string | number }> }) => {
      return post<BatchQueryNftResposne>({
        url: 'query/batch_query_nfts',
        baseUri: MT_API_BASE_URL,
        params,
        withCrud: false,
      })
    },
    [],
  )
}

export const useQueryCollections = () => {
  return useCallback(
    async ({
      collection_id,
      owner_address,
      collection_name,
      nft_address,
      blockchain,
      customize_url,
    }: {
      collection_id?: number
      owner_address?: string
      collection_name?: string
      nft_address?: string
      blockchain?: string
      customize_url?: string
    }): Promise<Collection[]> => {
      const params: any = {}

      if (collection_id) {
        params.collection_id = collection_id
      }

      if (customize_url) {
        params.customize_url = customize_url
      }

      if (owner_address) {
        params.owner_address = owner_address
      }

      if (collection_name) {
        params.collection_name = collection_name
      }

      if (nft_address) {
        params.nft_address = nft_address
      }

      if (blockchain) {
        params.blockchain = blockchain
      }

      const collections = await get<Collection[]>({
        url: 'query/query_collections',
        baseUri: MT_API_BASE_URL,
        params,
      })

      return collections
    },
    [],
  )
}

export const useQueryCollectionByAddress = () => {
  return useCallback(async (contractAddress: string) => {
    const res = await get<{ msg: string; code: number; data: Collection }>({
      url: `collections/${contractAddress}`,
    })

    return res.data
  }, [])
}

export const useQueryNftsByContract = () => {
  return useCallback(
    async ({
      contractAddress,
      cursor = '0',
      limit = 30,
      order_status,
      min_price,
      max_price,
      sort_direction,
      sort_field = 'base_price',
      sale_kind,
      attributes,
      token_id,
    }: {
      contractAddress: string
      cursor?: string
      limit?: number
      order_status?: string
      min_price?: number
      max_price?: number
      sort_direction?: string
      sort_field?: string
      sale_kind?: string
      token_id?: string
      attributes?: Array<{ attributes_name: string; attributes_value: string }>
    }) => {
      const res = await post<{ data: { total: number; next: string; content: Array<NftScanNft & NftScanOrder> } }>({
        url: `nifty/orders/filters`,
        params: {
          cursor,
          limit,
          nft_address: contractAddress,
          order_status,
          min_price,
          max_price,
          sort_direction,
          sort_field,
          sale_kind,
          attributes,
          token_id,
        },
      })

      return res
    },
    [],
  )
}

export const useQueryNftsByAddress = () => {
  return useCallback(
    async ({
      address,
      cursor = '0',
      limit = 30,
      erc_type = 'erc721',
    }: {
      address: string
      cursor?: string
      limit?: number
      erc_type?: NFTType
    }) => {
      const res = await get<{ data: { total: number; next: string; content: NftScanNft[] } }>({
        url: `account/own/${address}`,
        params: { cursor, limit, erc_type },
      })

      return res.data
    },
    [],
  )
}

export const useQueryNiftyOrders = () => {
  return useCallback(async () => {
    const res = await get<{ data: { total: number; next: string; content: NftScanNft[] } }>({
      url: `nifty/orders`,
    })

    return res.data
  }, [])
}
