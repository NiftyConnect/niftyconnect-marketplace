import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { NiftyOrderType } from 'niftyconnect-js'
import { MerkleValidatorAbi, PAYMENT_CONTRACT_SYMBOL_MAPPING, ZERO_ADDRESS } from '../constants'
import { Side, SupportNetwork, TokenStandard } from '../types'

const ERC721TransferSelector = `0x${new BigNumber(0).toString(16)}`
const ERC721SafeTransferSelector = `0x${new BigNumber(1).toString(16)}`
const ERC1155SafeTransferSelector = `0x${new BigNumber(2).toString(16)}`

export const getPaymentSymbol = ({
  paymentContract,
  blockchain,
}: {
  paymentContract: string
  blockchain: SupportNetwork
}) => {
  if (blockchain === 'BNB' || (blockchain === 'BSC' && paymentContract === ZERO_ADDRESS)) {
    return 'BNB'
  }

  if (blockchain === 'ETH' && paymentContract === ZERO_ADDRESS) {
    return 'ETH'
  }

  if (blockchain === 'GLMR' && paymentContract === ZERO_ADDRESS) {
    return 'GLMR'
  }
  return PAYMENT_CONTRACT_SYMBOL_MAPPING[paymentContract]
}

export const decodeErc1155NiftyConnectCalldata = (calldata: string) => {
  const iface = new ethers.utils.Interface(MerkleValidatorAbi)
  return iface.decodeFunctionData('matchERC1155UsingCriteria', calldata)
}

export const buildCalldata = ({
  tokenStandard,
  paymentToken,
  from,
  to,
  nftAddress,
  tokenId,
  nftAmount,
  merkleRoot,
}: {
  tokenStandard: TokenStandard
  paymentToken: string
  from: string
  to: string
  nftAddress: string
  tokenId: string | number
  nftAmount: string
  merkleRoot?: string
}) => {
  const iface = new ethers.utils.Interface(MerkleValidatorAbi)
  if (tokenStandard === TokenStandard.erc1155) {
    return iface.encodeFunctionData('matchERC1155UsingCriteria', [
      from,
      to,
      nftAddress,
      tokenId,
      nftAmount,
      merkleRoot,
      [],
    ])
  } else {
    if (paymentToken === ZERO_ADDRESS) {
      return iface.encodeFunctionData('matchERC721UsingCriteria', [from, to, nftAddress, tokenId, merkleRoot, []])
    } else {
      return iface.encodeFunctionData('matchERC721WithSafeTransferUsingCriteria', [
        from,
        to,
        nftAddress,
        tokenId,
        merkleRoot,
        [],
      ])
    }
  }
}

export const decodeCalldata = ({
  tokenStandard,
  paymentToken,
  calldata,
}: {
  tokenStandard: TokenStandard
  paymentToken: string
  calldata: string
}) => {
  const iface = new ethers.utils.Interface(MerkleValidatorAbi)
  if (tokenStandard === TokenStandard.erc1155) {
    return iface.decodeFunctionData('matchERC1155UsingCriteria', calldata)
  } else {
    if (paymentToken === ZERO_ADDRESS) {
      return iface.decodeFunctionData('matchERC721UsingCriteria', calldata)
    } else {
      return iface.decodeFunctionData('matchERC721WithSafeTransferUsingCriteria', calldata)
    }
  }
}

export const getMerkleValidatorSelector = ({
  tokenStandard,
  paymentToken,
}: {
  tokenStandard: TokenStandard
  paymentToken: string
}) => {
  if (tokenStandard === 1) {
    return ERC1155SafeTransferSelector
  } else {
    if (paymentToken === ZERO_ADDRESS) {
      return ERC721TransferSelector
    } else {
      return ERC721SafeTransferSelector
    }
  }
}

export const generateSellReplacementPatternForNormalOrder = ({ tokenStandard }: { tokenStandard?: TokenStandard }) => {
  if (tokenStandard === 0) {
    return (
      '0x' +
      '00000000' + // selector
      '0000000000000000000000000000000000000000000000000000000000000000' + // from
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // to
      '0000000000000000000000000000000000000000000000000000000000000000' + // token
      '0000000000000000000000000000000000000000000000000000000000000000' + // tokenId
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
      '0000000000000000000000000000000000000000000000000000000000000000' // merkleProof Length
    )
  }

  return (
    '0x' +
    '00000000' + // selector
    '0000000000000000000000000000000000000000000000000000000000000000' + // from
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // to
    '0000000000000000000000000000000000000000000000000000000000000000' + // token
    '0000000000000000000000000000000000000000000000000000000000000000' + // tokenId
    '0000000000000000000000000000000000000000000000000000000000000000' + // amount
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
    '0000000000000000000000000000000000000000000000000000000000000000' // merkleProof Length
  )
}

export const generateBuyReplacementPatternForNormalOrder = ({ tokenStandard }: { tokenStandard?: TokenStandard }) => {
  if (tokenStandard === 0) {
    return (
      '0x' +
      '00000000' + // selector
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // from
      '0000000000000000000000000000000000000000000000000000000000000000' + // to
      '0000000000000000000000000000000000000000000000000000000000000000' + // token
      '0000000000000000000000000000000000000000000000000000000000000000' + // tokenId
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
      '0000000000000000000000000000000000000000000000000000000000000000'
    ) // merkleProof Length
  }

  return (
    '0x' +
    '00000000' + // selector
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // from
    '0000000000000000000000000000000000000000000000000000000000000000' + // to
    '0000000000000000000000000000000000000000000000000000000000000000' + // token
    '0000000000000000000000000000000000000000000000000000000000000000' + // tokenId
    '0000000000000000000000000000000000000000000000000000000000000000' + // amount
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
    '0000000000000000000000000000000000000000000000000000000000000000' // merkleProof Length
  )
}

export const generateBuyReplacementPatternForCollectionBasedOrder = ({
  tokenStandard,
}: {
  tokenStandard?: TokenStandard
}) => {
  if (tokenStandard === 1) {
    return (
      '0x' +
      '00000000' + // selector
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // from
      '0000000000000000000000000000000000000000000000000000000000000000' + // to
      '0000000000000000000000000000000000000000000000000000000000000000' + // token
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // tokenId
      '0000000000000000000000000000000000000000000000000000000000000000' + // amount
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
      '0000000000000000000000000000000000000000000000000000000000000000'
    ) // merkleProof Length
  }

  return (
    '0x' +
    '00000000' + // selector
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // from
    '0000000000000000000000000000000000000000000000000000000000000000' + // to
    '0000000000000000000000000000000000000000000000000000000000000000' + // token
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // tokenId
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
    '0000000000000000000000000000000000000000000000000000000000000000' // merkleProof Length
  )
}

export const generateSellReplacementPatternForCollectionBasedOrder = ({
  tokenStandard,
}: {
  tokenStandard?: TokenStandard
}) => {
  if (tokenStandard === 1) {
    return (
      '0x' +
      '00000000' + // selector
      '0000000000000000000000000000000000000000000000000000000000000000' + // from
      '0000000000000000000000000000000000000000000000000000000000000000' + // to
      '0000000000000000000000000000000000000000000000000000000000000000' + // token
      '0000000000000000000000000000000000000000000000000000000000000000' + // tokenId
      '0000000000000000000000000000000000000000000000000000000000000000' + // amount
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
      '0000000000000000000000000000000000000000000000000000000000000000'
    ) // merkleProof Length
  }

  return (
    '0x' +
    '00000000' + // selector
    '0000000000000000000000000000000000000000000000000000000000000000' + // from
    '0000000000000000000000000000000000000000000000000000000000000000' + // to
    '0000000000000000000000000000000000000000000000000000000000000000' + // token
    '0000000000000000000000000000000000000000000000000000000000000000' + // tokenId
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
    '0000000000000000000000000000000000000000000000000000000000000000' // merkleProof Length
  )
}

export const generateBuyReplacementPatternForTraitBasedOrder = ({
  tokenStandard,
}: {
  tokenStandard?: TokenStandard
}) => {
  if (tokenStandard === 1) {
    return (
      '0x' +
      '00000000' + // selector
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // from
      '0000000000000000000000000000000000000000000000000000000000000000' + // to
      '0000000000000000000000000000000000000000000000000000000000000000' + // token
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // tokenId
      '0000000000000000000000000000000000000000000000000000000000000000' + // amount
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
      '0000000000000000000000000000000000000000000000000000000000000000' // merkleProof Length
    )
  }

  return (
    '0x' +
    '00000000' + // selector
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // from
    '0000000000000000000000000000000000000000000000000000000000000000' + // to
    '0000000000000000000000000000000000000000000000000000000000000000' + // token
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' + // tokenId
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
    '0000000000000000000000000000000000000000000000000000000000000000' // merkleProof Length
  )
}

export const generateSellReplacementPatternForTraitBasedOrder = ({
  tokenStandard,
}: {
  tokenStandard?: TokenStandard
}) => {
  if (tokenStandard === 1) {
    return (
      '0x' +
      '00000000' + // selector
      '0000000000000000000000000000000000000000000000000000000000000000' + // from
      '0000000000000000000000000000000000000000000000000000000000000000' + // to
      '0000000000000000000000000000000000000000000000000000000000000000' + // token
      '0000000000000000000000000000000000000000000000000000000000000000' + // tokenId
      '0000000000000000000000000000000000000000000000000000000000000000' + // amount
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
      '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
      '0000000000000000000000000000000000000000000000000000000000000000' // merkleProof Length
    )
  }
  return (
    '0x' +
    '00000000' + // selector
    '0000000000000000000000000000000000000000000000000000000000000000' + // from
    '0000000000000000000000000000000000000000000000000000000000000000' + // to
    '0000000000000000000000000000000000000000000000000000000000000000' + // token
    '0000000000000000000000000000000000000000000000000000000000000000' + // tokenId
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleRoot
    '0000000000000000000000000000000000000000000000000000000000000000' + // merkleProof Offset
    '0000000000000000000000000000000000000000000000000000000000000000' // merkleProof Length
  )
}

export const getReplacementPattern = ({
  side,
  orderType,
  tokenStandard,
}: {
  side: Side
  orderType: NiftyOrderType
  tokenStandard: TokenStandard
}) => {
  if (side === Side.Sell) {
    if (orderType === 'Normal') {
      return generateSellReplacementPatternForNormalOrder({ tokenStandard })
    }
    if (orderType === 'Collection') {
      return generateSellReplacementPatternForCollectionBasedOrder({ tokenStandard })
    }
    if (orderType === 'Trait') {
      return generateSellReplacementPatternForTraitBasedOrder({ tokenStandard })
    }
  } else {
    if (orderType === 'Normal') {
      return generateBuyReplacementPatternForNormalOrder({ tokenStandard })
    }
    if (orderType === 'Collection') {
      return generateBuyReplacementPatternForCollectionBasedOrder({ tokenStandard })
    }
    if (orderType === 'Trait') {
      return generateBuyReplacementPatternForTraitBasedOrder({ tokenStandard })
    }
  }
}

export const getReplacementPatternFromReplacementPattern = ({
  replacementPattern,
  tokenStandard,
  side,
}: {
  replacementPattern: string
  tokenStandard: TokenStandard
  side: Side
}) => {
  if (side === Side.Buy) {
    if (replacementPattern.split('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').length === 2) {
      return generateBuyReplacementPatternForNormalOrder({ tokenStandard })
    } else {
      return generateBuyReplacementPatternForTraitBasedOrder({ tokenStandard })
    }
  } else {
    if (replacementPattern.split('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').length === 2) {
      return generateSellReplacementPatternForNormalOrder({ tokenStandard })
    } else {
      return generateSellReplacementPatternForTraitBasedOrder({ tokenStandard })
    }
  }
}
