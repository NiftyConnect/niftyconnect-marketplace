/* eslint-disable import/no-default-export */

declare interface Window {
  BinanceChain?: {
    switchNetwork: (string) => Promise
  }
  ethereum?: {
    autoRefreshOnNetworkChange: boolean
    chainId: string
    request: ({ method: string, params: any }) => Promise
    on: (name: string, callback: function) => void
  }
}

declare module '*.css' {
  const value: string
  export default value
}
