import { Box, chakra, Skeleton } from '@chakra-ui/react'
import React, { useCallback, useRef, useState } from 'react'
import MediaDefaultSvg from './default.svg'
import { ImageBox } from './ImageBox'
import PlayerSvg from './player.svg'

const PlayDom = chakra(Box, {
  baseStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
})

export const VideoBox = ({
  videoUrl,
  posterUrl = '',
  imgCardWidth,
}: {
  videoUrl?: string
  posterUrl?: string
  imgCardWidth?: string
}) => {
  const videoRef = useRef(null)
  const [showPoster, setShowPoster] = useState(posterUrl ? true : false)
  const [showControls, setShowControls] = useState(false)
  const [firstPlay, setFirstPlay] = useState(false)
  const [isVideoLoadError, setIsVideoLoadError] = useState(false)
  const [loading, setLoading] = useState(true)

  const onPosterError = useCallback(() => {
    setShowPoster(false)
  }, [])

  const onVideoLoadError = useCallback(() => {
    setLoading(false)
    setIsVideoLoadError(true)
  }, [])

  const handleClickPlayer = useCallback((evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    setShowPoster(false)
    setFirstPlay(true)
    videoRef.current && (videoRef.current as any)?.play()
  }, [])

  return (
    <>
      {!firstPlay && !isVideoLoadError && (
        <PlayDom>
          <PlayerSvg onClick={handleClickPlayer} />
        </PlayDom>
      )}
      {showPoster ? (
        <ImageBox url={posterUrl} onError={onPosterError} imgCardWidth={imgCardWidth} />
      ) : (
        <Skeleton w={'100%'} isLoaded={!loading} display="flex" justifyContent="center" alignItems={'center'}>
          {!isVideoLoadError && (
            <video
              ref={videoRef}
              width="100%"
              height="100%"
              preload="metadata"
              playsInline
              loop
              autoPlay={firstPlay}
              controls={showControls}
              onLoadedMetadata={() => {
                setLoading(false)
              }}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
              onError={onVideoLoadError}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
          {isVideoLoadError && <MediaDefaultSvg />}
        </Skeleton>
      )}
    </>
  )
}
