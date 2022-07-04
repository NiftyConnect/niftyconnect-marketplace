import { useCallback } from 'react'
import { useAccount } from 'wagmi'
import { useContract } from '.'
import { Erc721Abi } from '../constants'

export const useApproveForAll = (nftAddress: string) => {
  const contract = useContract({ contractAddress: nftAddress, abi: Erc721Abi })

  return useCallback(
    async ({ contractAddress, approved }: { contractAddress: string; approved: boolean }) => {
      const tx = await contract.setApprovalForAll(contractAddress, approved)
      return tx.wait()
    },
    [contract],
  )
}

export const useIsApprovedForAll = (nftAddress: string) => {
  const contract = useContract({ contractAddress: nftAddress, abi: Erc721Abi })

  return useCallback(
    async ({ owner, operator }: { owner: string; operator: string }) => {
      return await contract.isApprovedForAll(owner, operator)
    },
    [contract],
  )
}

export const useSafeTransferFrom = (nftAddress: string) => {
  const { address: account } = useAccount()
  const contract = useContract({ contractAddress: nftAddress, abi: Erc721Abi })

  return useCallback(
    async ({ toAddress, tokenId }: { toAddress: string; tokenId: string }) => {
      return await contract['safeTransferFrom(address,address,uint256)'](account, toAddress, tokenId)
    },
    [account, contract],
  )
}

export const useGetTokenUri = (nftAddress: string) => {
  const contract = useContract({ contractAddress: nftAddress, abi: Erc721Abi })

  return useCallback(
    async (tokenId: string) => {
      try {
        return await contract['tokenURI(uint256)'](tokenId)
      } catch (err) {
        return await contract['uri(uint256)'](tokenId)
      }
    },
    [contract],
  )
}

export const useGetErc721Balance = (nftAddress: string) => {
  const contract = useContract({ contractAddress: nftAddress, abi: Erc721Abi })

  return useCallback(
    async (account: string) => {
      return await contract['balanceOf'](account)
    },
    [contract],
  )
}
