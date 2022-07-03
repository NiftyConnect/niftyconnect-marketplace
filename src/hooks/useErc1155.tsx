import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useContract } from '.'
import { Erc1155Abi } from '../constants'

export const useErc1155SafeTransferFrom = (nftAddress: string) => {
  const {
    data: { address: account },
  } = useAccount()
  const contract = useContract({ contractAddress: nftAddress, abi: Erc1155Abi })

  return useCallback(
    async ({ toAddress, tokenId, amount }: { toAddress: string; tokenId: string; amount: number }) => {
      return await contract['safeTransferFrom(address,address,uint256,uint256,bytes)'](
        account,
        toAddress,
        tokenId,
        amount,
        '0x00',
      )
    },
    [account, contract],
  )
}

export const useErc1155TotalSupply = (nftAddress: string, tokenId: number) => {
  const [total, setTotal] = useState(0)
  const contract = useContract({ contractAddress: nftAddress, abi: Erc1155Abi })

  useEffect(() => {
    contract
      .totalSupply(tokenId)
      .then((res: any) => {
        setTotal(res.toNumber())
      })
      .catch(() => {
        setTotal(0)
      })
  }, [contract, tokenId])

  return total
}

export const useErc1155Balance = ({
  nftAddress,
  tokenId,
  account,
}: {
  nftAddress: string
  tokenId: number
  account: string
}) => {
  const [total, setTotal] = useState(0)
  const contract = useContract({ contractAddress: nftAddress, abi: Erc1155Abi })

  useEffect(() => {
    contract
      .balanceOf(account, tokenId)
      .then((res: any) => {
        setTotal(res.toNumber())
      })
      .catch(() => {
        setTotal(0)
      })
  }, [account, contract, tokenId])

  return total
}

export const useGetErc1155Balance = (nftAddress: string) => {
  const contract = useContract({ contractAddress: nftAddress, abi: Erc1155Abi })

  return useCallback(
    async ({ account, tokenId }: { tokenId: number | string; account: string }) => {
      return await contract['balanceOf'](account, tokenId)
    },
    [contract],
  )
}
