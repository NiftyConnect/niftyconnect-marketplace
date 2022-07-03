import React from 'react'
import Link from 'next/link'
import { ExplorerMapping } from '../../constants'
import { truncateString } from '../../utils'

export const ExplorerLink = ({
  address,
  text,
  chainId = 1,
  txHash,
  truncate = true,
}: {
  address?: string
  txHash?: string
  text?: string
  chainId: number | string
  truncate?: boolean
}) => {
  const explorerBaseUri = ExplorerMapping[chainId]

  return (
    <>
      {address && (
        <Link href={`${explorerBaseUri}/address/${address}`} passHref={true}>
          <a target={'_blank'} style={{ color: '#5A88B0' }}>
            {!truncate ? address : text ? text : truncateString(address as string, 6)}
          </a>
        </Link>
      )}
      {txHash && (
        <Link href={`${explorerBaseUri}/tx/${txHash}`}>
          <a target={'_blank'}>{text}</a>
        </Link>
      )}
    </>
  )
}
