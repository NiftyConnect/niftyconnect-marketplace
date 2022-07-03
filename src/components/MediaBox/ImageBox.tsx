import { chakra, Flex, Image, Skeleton } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import MediaDefaultSvg from './default.svg'

const ImageWrapper = chakra(Flex, {
  baseStyle: {
    width: '100%',
    height: '100%',
    background: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    // marginTop: '20px',
  },
})

const MyImage = chakra(Image, {
  baseStyle: {
    objectFit: 'contain',
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    imageRendering: 'pixelated',
  },
})

export const ImageBox = ({
  url,
  onError,
  imgCardWidth,
}: {
  url?: string
  onError?: () => void
  imgCardWidth?: string
}) => {
  const [imgError, setImgErr] = useState(false)
  const [isImgLoading, setImgLoading] = useState(true)
  const errorHandler = useCallback(() => {
    console.log(url)
    onError && onError()
    setImgErr(true)
    setImgLoading(false)
  }, [onError, url])

  const loadHandler = useCallback(() => {
    setImgLoading(false)
  }, [])

  useEffect(() => {
    setImgErr(!url)
  }, [url])

  return (
    <ImageWrapper className="image-box">
      {imgError ? (
        <MediaDefaultSvg />
      ) : (
        <Skeleton
          isLoaded={!isImgLoading}
          display="flex"
          justifyContent="center"
          alignItems={'center'}
          height={`${imgCardWidth}px`}
          w={'100%'}
        >
          <MyImage width="100%" src={url} loading="lazy" onError={errorHandler} onLoad={loadHandler} />
        </Skeleton>
      )}
    </ImageWrapper>
  )
}
