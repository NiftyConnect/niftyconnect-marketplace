import { Skeleton } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import MediaDefaultSvg from './default.svg'

export const IframeBox = ({ url }: { url?: string }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const errorHandler = useCallback(() => {
    setError(true)
    setLoading(false)
  }, [])

  const loadHandler = useCallback(() => {
    setLoading(false)
  }, [])
  return (
    <>
      {error ? (
        <MediaDefaultSvg />
      ) : (
        <Skeleton w={'100%'} isLoaded={!loading} display="flex" justifyContent="center" alignItems={'center'}>
          <iframe
            src={url}
            scrolling="no"
            frameBorder="0"
            seamless={true}
            width="100%"
            height="100%"
            sandbox="allow-same-origin allow-scripts"
            onLoad={loadHandler}
            onError={errorHandler}
          ></iframe>
        </Skeleton>
      )}
    </>
  )
}
