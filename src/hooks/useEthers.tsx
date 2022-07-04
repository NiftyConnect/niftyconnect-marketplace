import { useMemo } from 'react'
import { ContractInterface, ethers } from 'ethers'

import { ZERO_ADDRESS } from '../constants'
import getConfig from 'next/config'
import { useNetwork, useSigner } from 'wagmi'

const { publicRuntimeConfig } = getConfig()

export const useChainId = () => {
  const { chain } = useNetwork()
  return useMemo((): number => {
    if (chain?.id) return chain?.id
    // if (window?.ethereum?.chainId) return Number(window?.ethereum?.chainId)
    return 1
  }, [chain?.id])
}

export const useEthersJsonRpcProvider = () => {
  const chainId = useChainId()

  return useMemo(() => {
    if (chainId === 56) {
      return new ethers.providers.JsonRpcProvider(publicRuntimeConfig.BSC_MAINNET)
    }

    if (chainId === 1) {
      return new ethers.providers.JsonRpcProvider(publicRuntimeConfig.ETH_MAINNET)
    }

    if (chainId === 1284) {
      return new ethers.providers.JsonRpcProvider(publicRuntimeConfig.GLMR_MAINNET)
    }

    return new ethers.providers.JsonRpcProvider(publicRuntimeConfig.ETH_MAINNET)
  }, [chainId])
}

export const useContract = ({ contractAddress, abi }: { contractAddress: string; abi: ContractInterface }) => {
  const { data: signer } = useSigner()
  const provider = useMemo(() => {
    if (signer) {
      return signer
    } else {
      return new ethers.providers.JsonRpcProvider(publicRuntimeConfig.ETH_MAINNET)
    }
  }, [signer])

  return useMemo(() => {
    if (!contractAddress) {
      return new ethers.Contract(ZERO_ADDRESS, abi, provider)
    }

    return new ethers.Contract(contractAddress, abi, provider)
  }, [abi, contractAddress, provider])
}
