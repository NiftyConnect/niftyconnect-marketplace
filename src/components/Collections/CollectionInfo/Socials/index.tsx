import { Stack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useCollection } from '../../../../context'
import DiscrodSvg from './discord.svg'
import TelegramSvg from './telegram.svg'
import TwitterSvg from './twitter.svg'
import WebsiteSvg from './website.svg'

export const Socials = () => {
  const {
    state: { collection },
  } = useCollection()

  return (
    <Stack direction={['row']} spacing="16px" alignItems={'center'}>
      {collection.website && (
        <Link href={collection.website}>
          <a target={'_blank'}>
            <WebsiteSvg />
          </a>
        </Link>
      )}
      {collection.telegram && (
        <Link href={collection.telegram}>
          <a target={'_blank'}>
            <TelegramSvg />
          </a>
        </Link>
      )}
      {collection.discord && (
        <Link href={collection.discord}>
          <a target={'_blank'}>
            <DiscrodSvg />
          </a>
        </Link>
      )}
      {collection.twitter && (
        <Link href={collection.discord}>
          <a target={'_blank'}>
            <TwitterSvg />
          </a>{' '}
        </Link>
      )}
    </Stack>
  )
}
