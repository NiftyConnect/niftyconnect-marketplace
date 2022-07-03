import { Box, Flex } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import { CollectionContentHeader, CollectionInfo } from '../../../components/Collections'
import { Container } from '../../../components/Container'
import { Footer } from '../../../components/Footer'
import { UseCollectionProvider } from '../../../context'
import { Collection } from '../../../types'
import { get } from '../../../utils'

const NftList = dynamic(() => import('../../../components/Collections').then((mod) => mod.NftList), {
  ssr: false,
})

const CollectionFilter = dynamic(() => import('../../../components/Collections').then((mod) => mod.CollectionFilter), {
  ssr: false,
})

const Index = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <UseCollectionProvider collection={data}>
      <Container padding={'0'} maxW="100%">
        <CollectionInfo />
        <Flex w="100%" maxW="100%" padding="0 24px 0 0" position="sticky" top="324px">
          <Flex>
            <CollectionFilter />
          </Flex>
          <Box flexGrow={1} marginLeft={'24px'} paddingTop="24px">
            <CollectionContentHeader />
            <NftList />
          </Box>
        </Flex>
      </Container>
      <Footer />
    </UseCollectionProvider>
  )
}

export async function getServerSideProps({ params }) {
  if (!params?.address || !params.address?.startsWith('0x') || params?.address?.length !== 42) {
    return {
      notFound: true,
    }
  }

  const collectionRes = await get<{ msg: string; code: number; data: Collection }>({
    url: `collections/${params.address}`,
  })

  return {
    props: { data: collectionRes.data }, // will be passed to the page component as props
  }
}

export default Index
