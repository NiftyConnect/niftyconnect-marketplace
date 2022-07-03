import { ChakraProvider } from '@chakra-ui/react'
import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'
import React from 'react'
import theme from '../theme/'
import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Fonts } from '../components/Fonts'
import Script from 'next/script'
import { WagmiConfig, createClient, configureChains, defaultChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { EHT_MAINNET_RPC } from '../constants'

const { provider } = configureChains(defaultChains, [publicProvider()])

const client = createClient({
  autoConnect: true,
  provider,
  connectors: [
    new MetaMaskConnector(),
    new CoinbaseWalletConnector({
      options: {
        appName: 'NiftyConnect',
        jsonRpcUrl: EHT_MAINNET_RPC,
      },
    }),
    new WalletConnectConnector({
      options: {
        qrcode: true,
      },
    }),
  ],
})

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-SLS1FC14ES`} />

      <Script strategy="lazyOnload" id="inline">
        {`
       window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())

      gtag('config', 'G-SLS1FC14ES');
  `}
      </Script>
      <Head>
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content="The leading decentralized NFT aggregation trading protocol" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>

      <ChakraProvider resetCSS theme={theme}>
        <Fonts />
        <WagmiConfig client={client}>
          <NextNProgress color="#3B4556" height={2} />
          <Header />
          <Component {...pageProps} />
        </WagmiConfig>
      </ChakraProvider>
    </>
  )
}

export default App
