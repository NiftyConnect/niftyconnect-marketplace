import { PINATA_GATEWAY } from '../constants'

export const getAvailableUrl = (url?: string) => {
  if (url?.startsWith('data:image')) {
    return url
  }

  if (url?.match(/^http:\/\/(\d*)\.(\d*)\.(\d*)\.(\d*)/)) {
    return ''
  } else if (url?.startsWith('ipfs://ipfs/')) {
    return `${PINATA_GATEWAY}${url?.split('ipfs://ipfs/')[1]}`
  } else if (url?.startsWith('ipfs://')) {
    return `${PINATA_GATEWAY}${url?.split('//')[1]}`
  } else if (!url?.startsWith('http')) {
    return `${PINATA_GATEWAY}${url}`
  }

  return url?.replace('ipipnft', 'mintverse')
}

export type MediaType = 'video' | 'audio' | 'photo' | 'html' | 'model' | 'pdf' | 'unknown'

export function getMediaType(type?: string): MediaType {
  if (typeof type !== 'string') return 'unknown'
  if (type.indexOf('video') > -1 || type.includes('mp4')) return 'video'
  if (type.indexOf('image') > -1) return 'photo'
  if (type.indexOf('audio') > -1) return 'audio'
  if (type.indexOf('html') > -1) return 'html'
  if (type.indexOf('model') > -1) return 'model'
  if (type.indexOf('pdf') > -1) return 'pdf'
  return 'unknown'
}
