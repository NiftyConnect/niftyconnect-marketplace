import { BigNumber } from 'bignumber.js'
import { isWindows } from 'react-device-detect'

export function calcCardSize(scrollWidth?: number) {
  if (!scrollWidth) return '0'
  const OuterPadding = 20 * 2
  const GridGap = 24

  const minItemWidth = 280
  const maxItemWidth = 320
  const width = scrollWidth - OuterPadding
  const imgCols =
    width % minItemWidth <= maxItemWidth % maxItemWidth
      ? Math.floor(width / minItemWidth)
      : Math.ceil(width / maxItemWidth)
  const itemTotalWidth = width - GridGap * (imgCols - 1)
  return Math.floor(Number(itemTotalWidth / imgCols) - 5).toString()
}

export const resize = ({
  leftPaneWidth = 0,
  maxCardNum = 4,
  paddingLen = 0,
}: {
  leftPaneWidth?: number
  maxCardNum?: number
  paddingLen?: number
}) => {
  const innerWidth = isWindows ? window.document.body.clientWidth : window.innerWidth
  const width = innerWidth - leftPaneWidth

  if (innerWidth > 1920) {
    return calcCardSize(width)
  }

  if (innerWidth > 1439 && innerWidth <= 1920) {
    return new BigNumber(width)
      .minus(paddingLen + 24 * (maxCardNum - 1))
      .div(maxCardNum)
      .dp(0, 1)
      .toString()
  }

  if (innerWidth > 1200 && innerWidth <= 1440) {
    const value = new BigNumber(width)
      .minus(paddingLen + 24 * (maxCardNum - 2))
      .div(maxCardNum - 1)
      .dp(0, 1)
      .toString()
    return value
  }

  if (innerWidth >= 768 && innerWidth < 1200) {
    return new BigNumber(width)
      .minus(paddingLen + 24 * (maxCardNum - 2))
      .div(maxCardNum - 1)
      .dp(0, 1)
      .toString()
  }

  if (innerWidth > 512 && innerWidth < 768) {
    return new BigNumber(width)
      .minus(paddingLen + 24 * (maxCardNum - 3))
      .div(maxCardNum - 2)
      .dp(0, 1)
      .toString()
  }

  if (innerWidth <= 512) {
    return new BigNumber(width).minus(paddingLen).dp(0, 1).toString()
  }

  return '100%'
}
