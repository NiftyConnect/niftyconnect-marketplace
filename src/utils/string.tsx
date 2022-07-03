import BigNumber from 'bignumber.js'
import moment from 'moment'
import secureRandom from 'secure-random'

export const truncateString = (text: string, chars = 4) => {
  if (!text) return ''
  if (text.length < chars * 2 + 1) return text

  return text.substring(0, chars) + '...' + text.substring(text.length - chars)
}

export const buildSalt = () => {
  return secureRandom(32, { type: 'Array' }).toString()
}

export const random = (pix = 8) => {
  return ((Math.random() * 100) % pix).toFixed(0)
}

export const numToHex = (num: number) => {
  return `0x${Number(num).toString(16).padStart(64, '0')}`
}

export const formatNum = (num: number) => {
  if (num < 1000) {
    return num
  }
  if (num >= 1000 && num < 1000000) {
    return `${new BigNumber(num).div(1000).dp(3, 1).toString()}K`
  }

  if (num > 1000000 && num < 1000000000) {
    return `${new BigNumber(num).div(1000000).dp(4, 1).toString()}M`
  }

  if (num >= 1000000000) {
    return `${new BigNumber(num).div(1000000000).dp(5, 1).toString()}B`
  }
}

export const calTimeDiff = (time: number | string) => {
  const diffMins = moment.duration(moment().diff(moment.unix(time as number))).asMinutes()
  if (diffMins <= 60) {
    return `${diffMins.toFixed()} minutes ago`
  }

  if (diffMins > 60 && diffMins < 1440) {
    return `${moment
      .duration(moment().diff(moment.unix(time as number)))
      .asHours()
      .toFixed()} hours ago`
  }

  return `${moment
    .duration(moment().diff(moment.unix(time as number)))
    .asDays()
    .toFixed()} days ago`
}
