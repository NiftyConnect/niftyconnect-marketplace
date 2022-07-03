import BigNumber from 'bignumber.js'
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  useBatchQueryNfts,
  useQueryNCOrders,
  useQueryNCOrdersForCollection,
  useQueryOrdersByMaker,
  useQueryOrdersByMakerAndNftaddress,
} from '../hooks'
import { NftInfoWithOrder } from '../types'

type OrderContext = {
  state: {
    orders: NftInfoWithOrder[]
    makerAddress: string
    nftAddress: string
    isQuerying: boolean
  }
  queryOrders: (params: { nftAddress?: string; makerAddress?: string }) => void
  setMakerAddress: (params: string) => void
  setNftAddress: (params: string) => void
} | null

const UseOrderContext = createContext<OrderContext>(null)

type useOrderProviderProps = {
  children: ReactNode
}

export const UseOrderProvider = ({ children }: useOrderProviderProps) => {
  const context = useContext(UseOrderContext)

  if (context !== null) {
    throw new Error('<UseOrdersProvider /> has already been declared.')
  }

  const [orders, setOrders] = useState<Array<NftInfoWithOrder>>([])
  const [makerAddress, setMakerAddress] = useState('')
  const [isQuerying, setIsQuerying] = useState(false)
  const [nftAddress, setNftAddress] = useState('')
  const queryNCOrderForCollection = useQueryNCOrdersForCollection()
  const queryOrdersByMakerAndNft = useQueryOrdersByMakerAndNftaddress()
  const queryOrdersByMaker = useQueryOrdersByMaker()
  const queryNCOrders = useQueryNCOrders()
  const batchQueryNfts = useBatchQueryNfts()

  const queryNftInfo = useCallback(
    (orders) => {
      if (!orders || orders.length === 0) return
      const params = {
        blockchain: 'ETH',
        nfts: orders.map((order) => ({
          nft_address: order.nftAddress,
          token_id: new BigNumber(order.tokenId).toString(),
        })),
      }

      batchQueryNfts(params).then((res) => {
        const nfts = orders.map((order) => {
          const info: any =
            res?.nfts?.find(
              (item) =>
                item.token_id === new BigNumber(order.tokenId).toString() && item.nft_address === order.nftAddress,
            ) || {}

          return { ...order, nft: info.nft || {} }
        })
        setOrders(nfts)
      })
    },
    [batchQueryNfts],
  )

  const queryOrders = useCallback(
    async ({ nftAddress, makerAddress }: { nftAddress?: string; makerAddress?: string }) => {
      setIsQuerying(true)
      setOrders(null)
      if (nftAddress && makerAddress) {
        queryOrdersByMakerAndNft({ nft_address: nftAddress, maker: makerAddress })
          .then((orders) => {
            setOrders(orders)
            queryNftInfo(orders)
          })
          .finally(() => {
            setIsQuerying(false)
          })
      }

      if (nftAddress && !makerAddress) {
        queryNCOrderForCollection({ nft_address: nftAddress })
          .then((orders) => {
            setOrders(orders)
            queryNftInfo(orders)
          })
          .finally(() => {
            setIsQuerying(false)
          })
      }

      if (!nftAddress && makerAddress) {
        queryOrdersByMaker({ maker: makerAddress })
          .then((orders) => {
            setOrders(orders)
            queryNftInfo(orders)
          })
          .finally(() => {
            setIsQuerying(false)
          })
      }

      if (!nftAddress && !makerAddress) {
        queryNCOrders()
          .then((orders) => {
            setOrders(orders)
            queryNftInfo(orders)
          })
          .finally(() => {
            setIsQuerying(false)
          })
      }
    },
    [queryNCOrderForCollection, queryNCOrders, queryNftInfo, queryOrdersByMaker, queryOrdersByMakerAndNft],
  )

  const state = {
    state: {
      orders,
      nftAddress,
      makerAddress,
      isQuerying,
    },
    queryOrders,
    setMakerAddress,
    setNftAddress,
  }

  useEffect(() => {
    queryOrders({})
  }, [queryOrders])

  return <UseOrderContext.Provider value={state}>{children}</UseOrderContext.Provider>
}

export const useOrders = () => {
  const context = useContext(UseOrderContext)

  if (context === null) {
    throw new Error(
      'useOrders() can only be used inside of <UseOrderProvider />, ' + 'please declare it  at a higher level.',
    )
  }

  return useMemo(() => {
    return context
  }, [context])
}
