import { NiftyConnectOrder } from 'niftyconnect-js'
import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import { useQueryNCOrdersForNft } from '../../hooks'

type ProfileTab = 'Assets' | 'My Orders'
type ProfileContext = {
  state: {
    orders: NiftyConnectOrder[]
    tab: ProfileTab
  }
  setTab: (params: ProfileTab) => void
  queryOrders: (params: Array<{ nftAddress: string; tokenId: string | number }>) => void
} | null

const UseProfileContext = createContext<ProfileContext>(null)

type useOrderProviderProps = {
  children: ReactNode
}

export const UseProfileProvider = ({ children }: useOrderProviderProps) => {
  const context = useContext(UseProfileContext)

  if (context !== null) {
    throw new Error('<UseProfileProvider /> has already been declared.')
  }

  const [orders, setOrders] = useState<NiftyConnectOrder[]>([])
  const [tab, setTab] = useState<ProfileTab>('Assets')
  const { data: account } = useAccount()
  const queryNCOrderForNft = useQueryNCOrdersForNft()

  const queryOrders = useCallback(
    async (params: Array<{ nftAddress: string; tokenId: string | number }>) => {
      const threads = params.map((item) =>
        queryNCOrderForNft({
          nft_address: item.nftAddress,
          tokenId: item.tokenId as string,
          account: account?.address,
        }),
      )
      const values = await Promise.all(threads)
      setOrders(values.reduce((a, b) => a.concat(b), []))
    },
    [account, queryNCOrderForNft],
  )

  const state = {
    state: {
      orders,
      tab,
    },
    setTab,
    queryOrders,
  }

  return <UseProfileContext.Provider value={state}>{children}</UseProfileContext.Provider>
}

export const useProfile = () => {
  const context = useContext(UseProfileContext)

  if (context === null) {
    throw new Error(
      'useProfile() can only be used inside of <UseProfileProvider />, ' + 'please declare it  at a higher level.',
    )
  }

  return useMemo(() => {
    return context
  }, [context])
}
