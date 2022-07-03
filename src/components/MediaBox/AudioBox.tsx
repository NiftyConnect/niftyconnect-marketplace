import { chakra, Box } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { ImageBox } from './ImageBox'

const Container = chakra(Box, {
  baseStyle: {
    height: '90%',
  },
})

const AudioDom = chakra(Box, {
  baseStyle: {
    display: 'block',
    height: '10%',
    width: '100%',
  },
})

export const AudioBox = ({ audioUrl, posterUrl = '' }: { audioUrl?: string; posterUrl?: string }) => {
  const audioRef = useRef(null)

  return (
    <>
      <Container>
        <ImageBox url={posterUrl} />
      </Container>
      <AudioDom
        ref={audioRef}
        preload="metadata"
        playsInline
        controls
        // onError={onAudioLoadError}
        src={audioUrl}
      ></AudioDom>
    </>
  )
}
