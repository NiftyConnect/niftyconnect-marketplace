import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const NFTSCAN_API_KEY = publicRuntimeConfig.NFT_SCAN_API_KEY
export const EHT_MAINNET_RPC = publicRuntimeConfig.ETH_MAINNET
export const API_BASE_URL = 'https://restapi.nftscan.com/api/v2/'
export const MT_API_BASE_URL = 'https://api.mintverse.com/api/v1/'

export const DEFAULT_PAGE_COUNT = 20

export const BLOCKCHAINS = ['ETH', 'BSC']

export const PINATA_GATEWAY = `https://coldcdn.com/api/cdn/nic4ji/ipfs/`

export const FEE_ADDRESS = '0x9cEf9d9F0dd0E386401a63313f0c8BD2a167EE47'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const PAYMENT_CONTRACT_SYMBOL_MAPPING: { [key: string]: string } = {
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': 'WETH',
  '0xe9e7cea3dedca5984780bafc599bd69add087d56': 'BUSD',
  '0x4Fabb145d64652a948d72533023f6E7A623C7C53': 'BUSD',
  '0x55d398326f99059ff775485246999027b3197955': 'USDT',
  '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c': 'WBNB',
  '0xacc15dc74880c9944775448304b263d191c6077f': 'WGLMR',
}

export const ExplorerMapping: { [key: number]: string } = {
  1: 'https://etherscan.io',
  56: 'https://bscscan.com',
  4: 'https://rinkeby.etherscan.io',
}
