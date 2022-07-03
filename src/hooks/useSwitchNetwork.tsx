import { useCallback } from 'react'
import { SupportNetwork } from '../types'

const NETWORKS: { [key: string]: any } = {
  'bsc-mainnet': {
    rpc: 'https://bsc-dataseed.binance.org/',
    explorer: 'https://bscscan.com/',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  Ethereum: {
    rpc: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    explorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  Moonbeam: {
    rpc: 'https://rpc.api.moonbeam.network',
    explorer: 'https://blockscout.moonbeam.network',
    nativeCurrency: {
      name: 'GLMR',
      symbol: 'GLMR',
      decimals: 18,
    },
  },
}

export const useSwitchNetwork = () => {
  return useCallback(async (network: SupportNetwork) => {
    const { networkId, chainId } = (() => {
      switch (network) {
        case 'BSC':
          return { networkId: 'bsc-mainnet', chainId: 56 }
        case 'ETH':
          return { networkId: 'Ethereum', chainId: 1 }
        case 'GLMR':
          return { networkId: 'Moonbeam', chainId: 1284 }
        default:
          return { networkId: 'Ethereum', chainId: 1 }
      }
    })()

    return new Promise(async (resolve, reject) => {
      try {
        if (chainId === 1) {
          await window?.ethereum?.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId?.toString(16)}` }],
          })
        } else {
          const data = [
            {
              chainId: `0x${chainId?.toString(16)}`,
              chainName: networkId,
              nativeCurrency: NETWORKS[networkId].nativeCurrency,
              rpcUrls: [NETWORKS[networkId].rpc],
              blockExplorerUrls: [NETWORKS[networkId].explorer],
            },
          ]
          await window?.ethereum?.request({ method: 'wallet_addEthereumChain', params: data })
        }
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
  }, [])
}
