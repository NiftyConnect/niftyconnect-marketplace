import { NiftyConnectOrder } from 'niftyconnect-js'

export type SupportConnectorType = 'bsc' | 'injected' | 'walletconnect'
export type SupportNetwork = 'BSC' | 'ETH' | 'Rinkeby' | 'BNB' | 'GLMR'
export type NFTType = 'erc721' | 'erc1155'

export interface UserInfo {
  access_uuid: string
  authorized: boolean
  expireTime: number
  issuer: string
  user_id: number
}

export type CollectionAttributes = {
  attributes_name: string
  attributes_values: Array<{ attributes_value: string; total: number }>
  total: number
}

export type Collection = {
  logo_url?: string
  banner_url?: string
  contract_address: string
  name: string
  featured_url?: string
  customize_url?: string
  description?: string
  website?: string
  category_id?: string
  github?: string
  own_url?: string
  discord?: string
  twitter?: string
  instagram?: string
  medium?: string
  telegram?: string
  royalty_fee?: string | number
  royalty_address?: string
  blockchain?: SupportNetwork
  payment_tokens?: string
  opensea_floor_price?: string
  display_theme?: string
  is_sensitive?: boolean
  owner_id: number
  id: number
  items_total: number
  owners_total: number
  owner_address: string
  nft_address: string
  is_verified: boolean
  owned_nft_quantity?: number
  is_scan_verified: boolean
  erc?: NFTType
  attributes: CollectionAttributes[]
}

export type MintveseNft = {
  media: string
  name: string
  external_link?: string
  description?: string
  collection: number
  media_type: string
  media_poster?: string
  unlockable_content?: string
  is_sensitive: boolean
  is_hidden: boolean
  blockchain: SupportNetwork
  max_supply: number | string
  token_id: string
  pending_freeze: boolean
  favorite_count: number
  creator_address: string
  nft_address: string
  owner_address: string
  media_url: string
  website: string
  collection_id: string
  media_poster_url: string
  is_freeze: boolean
  balance_of_owner: string
  token_standard: TokenStandard
  isExternal: boolean
  isFavoritedByCurrentUser: boolean
  token_uri: string
  external_url?: string
  is_verified: boolean
  is_scan_verified: boolean
  id: number
  nftscan_asset_id?: string
  create_time?: number
  create_hash?: string
  last_price?: string
  best_offer_price?: string
  best_sell_price?: string
  best_sell_payment_token?: string
  best_offer_payment_token?: string
  erc: NFTType
  holders_quantity?: number
  owner_balance?: number
  total_supply?: number
  nft_platform_name?: string
  collection_name?: string
  orders?: Array<NiftyConnectOrder>
  attributes?: Array<Attribute>
}

export type NftScanNft = {
  amount: number
  content_type: string
  content_uri: string
  contract_name: string
  contract_address: string
  contract_token_id: string
  erc_type: NFTType
  external_link: string
  image_uri: string
  latest_trade_price: number
  metadata_json: string
  mint_price: number
  mint_timestamp: number
  mint_transaction_hash: string
  minter: string
  name: string
  nftscan_id: string
  nftscan_uri: string
  owner: string
  token_id: string
  token_uri: string
}

export type Category = {
  id: number
  name: string
}

export type Authorization = {
  address: string
  token: string
  timeStamp: number
}

export type UserProfile = {
  address: string
  username: string
  profile_image_url: string
  banner_url: string
  bio: string
  email: string
  twitter_url: string
  instagram_url: string
  own_url: string
  user_id?: string
}

export enum Side {
  Buy = 0,
  Sell = 1,
}

export enum Blockchain {
  ETH = 'ETH',
  BSC = 'BSC',
}

export enum SellType {
  FixedPrice = 'fixed_price',
  TimedAuction = 'dutch_auction',
  All = '',
}

export enum BuyType {
  BuyNow = 0,
  MakeOffer = 1,
  PlaceBid = 2,
}

export enum TimedAuctionMethod {
  Highest = 0,
  Declining = 1,
}

export enum DefaultDateRange {
  oneDay = '1 day',
  threeDays = '3 days',
  oneWeek = '1 week',
  sixMonths = '6 months',
}

export enum OrderStatus {
  open = 'open',
  finalized = 'finalized',
  cancelled = 'cancelled',
  cancelledpending = 'cancelledpending',
  finalizedpending = 'finalizedpending',
}

export enum TokenStandard {
  erc1155 = 1,
  erc721 = 0,
}

export interface MakeOrderParams {
  maker: string
  taker: string
  nft_address: string
  token_id: string
  owner_address: string
  quantity: string
  side: Side
  type: SellType | BuyType
  method?: TimedAuctionMethod
  starting_price: string
  reserve_price?: string
  ending_price?: string
  reserve_for?: string
  payment_token: string
  listing_time?: number
  expiration_time?: number
  salt: string
  blockchain: SupportNetwork
  nonce: string
}

export interface MakeOrderResponse {
  order_id: string
}

export interface PlaceBidParams {
  order_id: string | number
  bid_price: string
  listing_time: string | number
  salt: string
  nonce: string
}

export type FiatPrice = {
  [key: string]: { [key: string]: number }
}

export interface AssetToken {
  networkSymbol: string
  balances: string
  icon: string
  name: string
  id: string
  fiatPrice: string
  contractAddress: string
}

export type CollectionMenu = 'Items' | 'Activites'

export type FilterOrderStatus = 'Buy Now' | 'On Auction' | 'New' | 'Has Offers' | '' | 'Status'
export type EventType = 'Listings' | 'Sales' | 'Bids' | 'Transfers'

export type UserOffers = {
  blockchain: string
  nft_address: string
  token_id: string
  name: string
  logo_url: string
  uint_price: string
  usd_uint_price: string
  floor_difference: string
  from_name: string
  from_address: string
  expiration: number
  create_time: number
  order_id: number
}

export type FloorPrice = {
  blockchain: string
  nft_address: string
  floor_price: string
}

export type PaymentToken = {
  symbol: string
  contractAddress: string
  logo?: SVGAElement
}

export type Attribute = {
  attributes_name: string
  attributes_value: string
}

export type NftScanOrder = {
  base_price: string
  calldata: string
  exchange: string
  expiration_time: number
  extra: string
  ipfs_hash: string
  listing_time: number
  maker: string
  maker_relayer_fee_recipient: string
  nft_address: string
  order_change_hash: string
  order_change_time: number
  order_hash: string
  order_stat: string
  payment_token: string
  replacement_pattern: string
  rss_metadata: string
  sale_kind: string
  sale_side: string
  salt: string
  static_extradata: string
  static_target: string
  taker: string
  taker_relayer_fee_recipient: string
  token_id: string
  trade_price: string
  tx_hash: string
  tx_time: number
}

export type NftInfoWithOrder = { nft?: NftScanNft; order?: NftScanOrder }
