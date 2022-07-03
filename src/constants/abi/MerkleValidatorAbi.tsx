export const MerkleValidatorAbi = [
  {
    constant: false,
    inputs: [
      {
        name: 'from',
        type: 'address',
      },
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'token',
        type: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
      },
      {
        name: 'root',
        type: 'bytes32',
      },
      {
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'matchERC721UsingCriteria',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'from',
        type: 'address',
      },
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'token',
        type: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
      },
      {
        name: 'root',
        type: 'bytes32',
      },
      {
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'matchERC721WithSafeTransferUsingCriteria',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'from',
        type: 'address',
      },
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'token',
        type: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
      {
        name: 'root',
        type: 'bytes32',
      },
      {
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'matchERC1155UsingCriteria',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'leaf',
        type: 'uint256',
      },
      {
        name: 'root',
        type: 'bytes32',
      },
      {
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'verifyProof',
    outputs: [],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'leafA',
        type: 'uint256',
      },
      {
        name: 'leafB',
        type: 'uint256',
      },
    ],
    name: 'calculateProof',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'a',
        type: 'bytes32',
      },
      {
        name: 'b',
        type: 'bytes32',
      },
    ],
    name: 'efficientHash',
    outputs: [
      {
        name: 'value',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
]
