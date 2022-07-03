import React, { useMemo } from 'react'
import { getAvailableUrl, getMediaType } from '../../utils'
import { IframeBox } from './IframeBox'
import { AudioBox } from './AudioBox'
import { chakra, Container } from '@chakra-ui/react'
import { ImageBox } from './ImageBox'
import { VideoBox } from './VideoBox'
import { UnknownBox } from './UnkownBox'

const MediaContainer = chakra(Container, {
  baseStyle: {
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    position: 'relative',
    padding: 0,
    svg: {
      width: '100%',
      height: '100%',
      maxW: '255px',
      maxH: '255px',
    },
  },
})

export const MediaBox = ({
  media: { content_type, content_uri, image_uri },
  imgCardWidth,
}: {
  media: { content_type?: string; content_uri?: string; image_uri?: string }
  imgCardWidth?: string
}) => {
  const mediaType = useMemo(() => getMediaType(content_type), [content_type])
  const detailUrl = useMemo(() => getAvailableUrl(content_uri), [content_uri])
  const posterUrl = useMemo(() => getAvailableUrl(image_uri), [image_uri])

  return (
    <MediaContainer>
      {mediaType === 'photo' && <ImageBox url={detailUrl} imgCardWidth={imgCardWidth} />}
      {mediaType === 'video' && <VideoBox posterUrl={posterUrl} videoUrl={detailUrl} imgCardWidth={imgCardWidth} />}
      {mediaType === 'html' && <IframeBox url={detailUrl} />}
      {mediaType === 'audio' && <AudioBox posterUrl={posterUrl} audioUrl={detailUrl} />}
      {mediaType === 'unknown' && (
        <UnknownBox posterUrl={posterUrl} detailUrl={detailUrl} imgCardWidth={imgCardWidth} />
      )}
    </MediaContainer>
  )
}
