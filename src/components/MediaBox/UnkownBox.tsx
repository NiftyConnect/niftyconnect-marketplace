import React, { useCallback, useState } from 'react'
import { ImageBox } from './ImageBox'
import { VideoBox } from './VideoBox'

export const UnknownBox = ({
  detailUrl,
  posterUrl,
  imgCardWidth,
}: {
  detailUrl?: string
  posterUrl?: string
  imgCardWidth?: string
}) => {
  const [showPoster, setShowPoster] = useState(true)

  const onPosterError = useCallback(() => {
    setShowPoster(false)
  }, [])

  return (
    <>
      {showPoster ? (
        <ImageBox url={detailUrl} onError={onPosterError} imgCardWidth={imgCardWidth} />
      ) : (
        <VideoBox posterUrl={posterUrl} videoUrl={detailUrl} />
      )}
    </>
  )
}
