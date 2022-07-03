import { gql } from 'graphql-tag'
import moment from 'moment'

export const QUERY_NC_ORDERS_FOR_NFT = ({
  nftAddress,
  tokenId,
  account,
}: {
  nftAddress: string
  tokenId: string
  account: string
}) => {
  const queryString = `{
      niftyConnectOrders(where:{nftAddress:"${nftAddress}", tokenId:"${tokenId}",maker:"${account}" expirationTime_gt:${moment().unix()}, isCancelled:false}, orderBy: orderPrice, orderDirection:desc) {
          orderHash
          orderPrice
          txHash
          maker
          taker
          makerRelayerFeeRecipient
          side
          saleKind
          nftAddress
          tokenId
          ipfsHash
          calldata
          replacementPattern
          staticTarget
          staticExtradata
          paymentToken
          extra
          listingTime
          expirationTime
          salt
          isCancelled
          isFinalized
          txHash
          exchange
      }
  }`

  return gql(queryString)
}

export const QUERY_NC_ORDERS_BY_MAKER_AND_NFTADDRESS = ({
  nftAddress,
  maker,
}: {
  nftAddress: string
  maker: string
}) => {
  const queryString = `{
      niftyConnectOrders(first:50,where:{nftAddress:"${nftAddress}", maker:"${maker}", expirationTime_gt:${moment().unix()}, isCancelled:false,isFinalized:false}, orderBy: orderPrice, orderDirection:desc) {
          orderHash
          orderPrice
          txHash
          maker
          taker
          makerRelayerFeeRecipient
          side
          saleKind
          nftAddress
          tokenId
          ipfsHash
          calldata
          replacementPattern
          staticTarget
          staticExtradata
          paymentToken
          extra
          listingTime
          expirationTime
          salt
          isCancelled
          isFinalized
          txHash
          exchange
      }
  }`

  return gql(queryString)
}

export const QUERY_NC_ORDERS_BY_MAKER = () => {
  const queryString = `
      query($first:Int, $maker:String, $expireTime: BigInt,$listingTime: BigInt) {
      niftyConnectOrders(first:$first, where:{maker:$maker, expirationTime_gt:$expireTime,listingTime_gt:$listingTime, isCancelled:false,isFinalized:false}, orderBy: orderPrice, orderDirection:desc) {
          orderHash
          orderPrice
          txHash
          maker
          taker
          makerRelayerFeeRecipient
          side
          saleKind
          nftAddress
          tokenId
          ipfsHash
          calldata
          replacementPattern
          staticTarget
          staticExtradata
          paymentToken
          extra
          listingTime
          expirationTime
          salt
          isCancelled
          isFinalized
          txHash
          exchange
      }
  }`

  return gql(queryString)
}

export const QUERY_NC_ORDERS_FOR_COLLECTION = () => {
  const queryString = `
      query($first:Int,$nftAddress:String, $expireTime:Int, $listingTime: BigInt) {
      niftyConnectOrders(first:$first, where:{nftAddress: $nftAddress, expirationTime_gt: $expireTime, isCancelled:false,isFinalized:false,listingTime_gt:$listingTime}, orderBy: listingTime, orderDirection:desc) {
          orderHash
          orderPrice
          txHash
          maker
          taker
          makerRelayerFeeRecipient
          side
          saleKind
          nftAddress
          tokenId
          ipfsHash
          calldata
          replacementPattern
          staticTarget
          staticExtradata
          paymentToken
          extra
          listingTime
          expirationTime
          salt
          isCancelled
          isFinalized
          txHash
          exchange
      }
  }`

  return gql(queryString)
}

export const QUERY_NC_ORDERS = () => {
  const queryString = `
      query($first:Int, $expireTime: BigInt,$listingTime: BigInt) {
      niftyConnectOrders(first:$first, orderBy: listingTime, orderDirection:desc,where:{ isCancelled:false,isFinalized:false,expirationTime_gt:$expireTime,listingTime_gt:$listingTime}) {
          orderHash
          orderPrice
          txHash
          maker
          taker
          makerRelayerFeeRecipient
          side
          saleKind
          nftAddress
          tokenId
          ipfsHash
          calldata
          replacementPattern
          staticTarget
          staticExtradata
          paymentToken
          extra
          listingTime
          expirationTime
          salt
          isCancelled
          isFinalized
          txHash
          exchange
      }
  }`

  return gql(queryString)
}

export const QUERY_NC_ORDERS_FOR_ADDRESS = ({ address }: { address: string }) => {
  const queryString = `{
      niftyConnectOrders(first:50,where:{maker:"${address}",expirationTime_gt:${moment().unix()}, isCancelled:false,isFinalized:false}, orderBy: listingTime, orderDirection:desc) {
          orderHash
          orderPrice
          txHash
          maker
          taker
          makerRelayerFeeRecipient
          side
          saleKind
          nftAddress
          tokenId
          ipfsHash
          calldata
          replacementPattern
          staticTarget
          staticExtradata
          paymentToken
          extra
          listingTime
          expirationTime
          salt
          isCancelled
          isFinalized
          txHash
          exchange
      }
  }`

  return gql(queryString)
}
