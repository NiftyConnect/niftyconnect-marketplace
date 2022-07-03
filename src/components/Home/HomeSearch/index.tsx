import { SearchIcon } from '@chakra-ui/icons'
import {
  chakra,
  Container,
  Flex,
  Input,
  Text,
  Box,
  InputGroup,
  InputLeftElement,
  Image,
  Spinner,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { useQueryCollectionByAddress } from '../../../hooks'
import LeftIcon from './leftIcon.svg'
import RightIcon from './rightIcon.svg'

const HomeSearchContainer = chakra(Container, {
  baseStyle: {
    margin: '0',
    position: 'relative',
    height: '600px',
    display: 'flex',
    maxW: '100%',
    padding: '0 20px',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
})

const Title = chakra(Text, {
  baseStyle: {
    fontSize: '48px',
    lineHeight: '64px',
    fontWeight: 600,
    color: '#3B4556',
    textAlign: 'center',
    marginBottom: '48px',
  },
})

const LeftPane = chakra(Box, {
  baseStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: { base: 'none', sm: 'flex' },
    zIndex: 0,
  },
})

const RightPane = chakra(Box, {
  baseStyle: {
    position: 'absolute',
    display: { base: 'none', sm: 'flex' },
    bottom: 0,
    right: 0,
    zIndex: 0,
  },
})

const SearchResult = chakra(Flex, {
  baseStyle: {
    position: 'absolute',
    width: '100%',
    top: '60px',
    background: '#fff',
    boxShadow: '0px 0px 16px rgba(51, 51, 51, 0.16)',
    borderRadius: '6px',
    padding: '24px 16px',
    flexDir: 'column',
  },
})

const CollectionItem = chakra(Box, {
  baseStyle: {
    padding: '12px 0',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
})

export const HomeSearch = () => {
  const [collections, setCollections] = useState([])
  const [nftAddress, setNftAddress] = useState('')
  const [isQuerying, setIsQuery] = useState(false)

  const queryCollection = useQueryCollectionByAddress()

  const nftAddressChange = useCallback(
    (evt) => {
      const nftAddress = evt.currentTarget.value.trim()
      setNftAddress(nftAddress)
      if (nftAddress.startsWith('0x') && nftAddress.length === 42) {
        setIsQuery(true)
        queryCollection(nftAddress)
          .then((res) => {
            setCollections([res])
          })
          .catch((err) => {
            setCollections([])
            console.log(err)
          })
          .finally(() => {
            setIsQuery(false)
          })
      } else {
        setCollections([])
      }
    },
    [queryCollection],
  )

  return (
    <HomeSearchContainer>
      <LeftPane>
        <LeftIcon />
      </LeftPane>
      <Title>Find collections</Title>
      <Flex maxW={'650px'} w={'100%'} pos={'relative'}>
        <InputGroup size={'lg'}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            isInvalid={nftAddress && !nftAddress.startsWith('0x') && nftAddress.length !== 42}
            placeholder="Please input collection address"
            size={'lg'}
            onChange={nftAddressChange}
          />
        </InputGroup>
        {(collections.length > 0 || isQuerying) && (
          <SearchResult>
            <Text fontSize={'12px'} color="#818D9F" marginBottom={'12px'}>
              Collections
            </Text>
            {isQuerying ? (
              <Flex justifyContent={'center'}>
                <Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="#3B4556" size="lg" />
              </Flex>
            ) : (
              <Box>
                <Link href={`/collection/${collections[0]?.contract_address}`}>
                  <a>
                    <CollectionItem>
                      <Flex width="40px" height="40px" marginRight={'10px'}>
                        <Image width={'40px'} height={'40px'} src={collections[0]?.logo_url} />
                      </Flex>

                      <Text fontSize={'16px'} fontWeight="600" color="#3B4556">
                        {collections[0]?.name}
                      </Text>
                    </CollectionItem>
                  </a>
                </Link>
              </Box>
            )}
          </SearchResult>
        )}
      </Flex>
      <RightPane>
        <RightIcon />
      </RightPane>
    </HomeSearchContainer>
  )
}
