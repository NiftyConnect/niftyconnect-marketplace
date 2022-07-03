import { useConst } from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { SellType } from 'niftyconnect-js'
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ZERO_ADDRESS } from '../../constants'
import { useChainId } from '../../hooks'
import { NftScanNft, PaymentToken } from '../../types'

type Step = 'List' | 'Waiting' | 'Success' | 'Fail'

type ListModalContext = {
  state: {
    nft: NftScanNft
    step: Step
    saleType: SellType
    salePrice: string
    amount: string | number
    duration: string
    expireTime: Moment
    payment: PaymentToken
    payments: { [key: number]: PaymentToken[] }
  }
  setStep: (params: Step) => void
  setSaleType: (params: SellType) => void
  setSalePrice: (params: string) => void
  setAmount: (params: string | number) => void
  changeDuration: (params: string) => void
  setPayment: (params: PaymentToken) => void
  onClose: () => void
} | null

const UseListModalContext = createContext<ListModalContext>(null)

type useListModalProviderProps = {
  children: ReactNode
  nft: NftScanNft
  onClose: () => void
}

export const UseListModalProvider = ({ children, nft, onClose }: useListModalProviderProps) => {
  const listmodalContext = useContext(UseListModalContext)

  if (listmodalContext !== null) {
    throw new Error('<UseListModalProvider /> has already been declared.')
  }

  const chainId = useChainId()
  const [step, setStep] = useState<Step>('List')
  const [saleType, setSaleType] = useState<SellType>(SellType.FixedPrice)
  const [salePrice, setSalePrice] = useState('')
  const [duration, setDuration] = useState('7 Days')
  const [amount, setAmount] = useState<string | number>('1')
  const [payment, setPayment] = useState<PaymentToken>({ symbol: 'ETH', contractAddress: ZERO_ADDRESS })
  const [expireTime, setExpireTime] = useState(moment().add(7, 'day'))

  const payments = useConst(() => {
    return {
      1: [
        { contractAddress: ZERO_ADDRESS, symbol: 'ETH' },
        { contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', symbol: 'WETH' },
      ],
      56: [
        { contractAddress: ZERO_ADDRESS, symbol: 'BNB' },
        { contractAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', symbol: 'WBNB' },
        { contractAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56', symbol: 'BUSD' },
      ],
    }
  })

  const changeDuration = useCallback((newTime) => {
    setDuration(newTime)
    if (newTime === '3 Days') {
      setExpireTime(moment().add(3, 'day'))
    }

    if (newTime === '7 Days') {
      setExpireTime(moment().add(7, 'day'))
    }

    if (newTime === '15 Days') {
      setExpireTime(moment().add(15, 'day'))
    }

    if (newTime === '30 Days') {
      setExpireTime(moment().add(30, 'day'))
    }
  }, [])

  const state = useMemo(
    () => ({
      state: {
        nft,
        step,
        saleType,
        salePrice,
        duration,
        expireTime,
        payment,
        payments,
        amount,
      },
      setStep,
      setSaleType,
      setSalePrice,
      changeDuration,
      onClose,
      setPayment,
      setAmount,
    }),
    [amount, changeDuration, duration, expireTime, nft, onClose, payment, payments, salePrice, saleType, step],
  )

  useEffect(() => {
    setPayment(payments[chainId][0])
  }, [chainId, payments])

  return <UseListModalContext.Provider value={state}>{children}</UseListModalContext.Provider>
}

export const useListModal = () => {
  const context = useContext(UseListModalContext)

  if (context === null) {
    throw new Error(
      'useListModal() can only be used inside of <UseMintverseProvider />, ' + 'please declare it  at a higher level.',
    )
  }

  return useMemo(() => {
    return context
  }, [context])
}
