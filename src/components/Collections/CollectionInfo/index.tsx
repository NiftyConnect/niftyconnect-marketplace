import { Box, chakra, Container, Flex, Text, Image, useToast } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import CopySvg from './copy.svg'
import { CollectionStats } from './CollectionStats'
import { Socials } from './Socials'
import { useCollection } from '../../../context'

const CollectionInfoContainer = chakra(Container, {
  baseStyle: {
    margin: '0',
    height: { base: '460px', md: '260px' },
    w: '100%',
    maxW: '100%',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(4px)',
    filter: 'blur()',
    padding: '0 20px',
  },
})

const CollectionInfoContainerFilter = chakra(Container, {
  baseStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: { base: '460px', md: '260px' },
    padding: '40px 0',
    w: '100%',
    maxW: '100%',
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(4px)',
    zIndex: -10,
  },
})

const CollectionInfoContainerBg = chakra(Container, {
  baseStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: { base: '460px', md: '260px' },
    w: '100%',
    maxW: '100%',
    position: 'absolute',
    zIndex: -20,
  },
})

export const CollectionInfo = () => {
  const {
    state: { collection },
  } = useCollection()
  const toast = useToast({ position: 'top' })

  const copyClick = useCallback(() => {
    toast({
      title: `Copy Success!`,
      variant: 'solid',
      status: 'success',
      isClosable: true,
    })
  }, [toast])

  return (
    <CollectionInfoContainer>
      <CollectionInfoContainerFilter>
        <Flex maxW={'1200px'} w="100%" margin="0 auto" padding="0 20px">
          <Image src={collection.logo_url} width={'180px'} height={'180px'} />
          <Box marginLeft="32px">
            <Flex
              alignItems={{ base: 'flex-start', md: 'center' }}
              justifyContent={'space-between'}
              w="100%"
              flexDir={{ base: 'column', md: 'row' }}
            >
              <Box cursor={'pointer'}>
                <Text fontSize={'20px'} marginBottom={'5px'} lineHeight={'30px'} fontWeight={700} color="#3B4556">
                  {collection.name}
                </Text>
                <CopyToClipboard text={collection.contract_address} onCopy={copyClick}>
                  <Flex alignItems={'center'} marginBottom={'5px'}>
                    <Text
                      fontSize={'12px'}
                      lineHeight={'18px'}
                      wordBreak={{ base: 'break-all', sm: 'inherit' }}
                      fontWeight={500}
                      color="#3B4556"
                      marginRight={'10px'}
                    >
                      {collection.contract_address}
                    </Text>
                    <CopySvg />
                  </Flex>
                </CopyToClipboard>
              </Box>
              <Socials />
            </Flex>
            <Box display={{ base: 'none', md: 'block' }}>
              {collection.description && (
                <Flex
                  fontSize={'14px'}
                  height={{ base: 'auto', md: '42px' }}
                  color={'#818D9F'}
                  fontWeight="500"
                  lineHeight={'21px'}
                  margin="12px 0 16px 0"
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                >
                  {collection.description}
                </Flex>
              )}
              <CollectionStats />
            </Box>
          </Box>
        </Flex>
        <Box padding="20px" display={{ base: 'block', md: 'none' }}>
          {collection.description && (
            <Flex
              fontSize={'14px'}
              height={{ base: 'auto', md: '42px' }}
              color={'#818D9F'}
              fontWeight="500"
              maxH={'80px'}
              lineHeight={'21px'}
              margin="12px 0 16px 0"
              overflow={'hidden'}
              textOverflow={'ellipsis'}
            >
              {collection.description}
            </Flex>
          )}
          <CollectionStats />
        </Box>
      </CollectionInfoContainerFilter>
      <CollectionInfoContainerBg backgroundImage={`url(${collection.banner_url})`} backgroundSize="cover" />
    </CollectionInfoContainer>
  )
}
