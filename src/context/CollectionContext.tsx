import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { Attribute, Collection, SellType } from '../types'

type CollectionFilters = {
  isBuyNow?: boolean
  saleKind?: SellType
  minPrice?: string
  maxPrice?: string
  attributes?: Array<Attribute>
}

type CollectionContext = {
  state: {
    collection: Collection
    filters: CollectionFilters
    isFilterExpand: boolean
    tokenId: string
    priceSortOrder: 'asc' | 'desc'
    cardNum: number
  }
  setFilters: (params: CollectionFilters) => void
  setIsFilterExpand: (params: boolean) => void
  setPriceSortOrder: (params: 'asc' | 'desc') => void
  setCardNum: (params: number) => void
  setTokenId: (params: string) => void
} | null

const UseCollectionContext = createContext<CollectionContext>(null)

type useCollectionProviderProps = {
  children: ReactNode
  collection: Collection
}

export const UseCollectionProvider = ({ children, collection }: useCollectionProviderProps) => {
  const context = useContext(UseCollectionContext)

  if (context !== null) {
    throw new Error('<UseCollectionProvider /> has already been declared.')
  }

  const [filters, setFilters] = useState<CollectionFilters>({ attributes: [] })
  const [isFilterExpand, setIsFilterExpand] = useState(true)
  const [priceSortOrder, setPriceSortOrder] = useState<'asc' | 'desc'>('asc')
  const [cardNum, setCardNum] = useState(6)
  const [tokenId, setTokenId] = useState('')

  const state = {
    state: {
      collection,
      filters,
      isFilterExpand,
      priceSortOrder,
      cardNum,
      tokenId,
    },
    setFilters,
    setIsFilterExpand,
    setPriceSortOrder,
    setCardNum,
    setTokenId,
  }

  return <UseCollectionContext.Provider value={state}>{children}</UseCollectionContext.Provider>
}

export const useCollection = () => {
  const context = useContext(UseCollectionContext)

  if (context === null) {
    throw new Error(
      'useCollection() can only be used inside of <UseCollectionProvider />, ' +
        'please declare it  at a higher level.',
    )
  }

  return useMemo(() => {
    return context
  }, [context])
}
