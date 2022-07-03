import { BigNumber } from 'bignumber.js'
import { useEffect, useState } from 'react'
import { isWindows } from 'react-device-detect'

export const useResizeCard = ({
  paddingLen = 40,
  maxCardNum = 4,
}: {
  paddingLen?: number
  maxCardNum?: number
  maxWidth?: number
}) => {
  const [cardWidth, setCardWidth] = useState('20%')

  useEffect(() => {
    function calcCardSize(scrollWidth?: number) {
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

    function resize() {
      const width = isWindows ? window.document.body.clientWidth : window.innerWidth

      if (width > 1920) {
        setCardWidth(calcCardSize(width))
      }

      if (width > 1439 && width <= 1920) {
        const value = new BigNumber(width)
          .minus(paddingLen + 24 * (maxCardNum - 1))
          .div(maxCardNum)
          .dp(0, 1)
          .toString()
        setCardWidth(`${value}`)
      }

      if (width > 1200 && width <= 1440) {
        const value = new BigNumber(width)
          .minus(paddingLen + 24 * (maxCardNum - 2))
          .div(maxCardNum - 1)
          .dp(0, 1)
          .toString()
        setCardWidth(`${value}`)
      }

      if (width > 768 && width <= 1200) {
        const value = new BigNumber(width)
          .minus(paddingLen + 24 * (maxCardNum - 3))
          .div(maxCardNum - 2 > 3 ? 3 : maxCardNum - 2)
          .dp(0, 1)
          .toString()
        setCardWidth(`${value}`)
      }

      if (width > 512 && width <= 768) {
        const value = new BigNumber(width)
          .minus(paddingLen + 24)
          .div(2)
          .dp(0, 1)
          .toString()
        setCardWidth(`${value}`)
      }

      if (width < 512) {
        const value = new BigNumber(width).minus(paddingLen).dp(0, 1).toString()
        setCardWidth(`${value}`)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [maxCardNum, paddingLen])

  return cardWidth
}

export const useFixedResizeCard = ({
  fixedWidth = 1200,
  maxCardNum = 4,
  paddingLen = 40,
}: {
  paddingLen?: number
  maxCardNum?: number
  fixedWidth?: number
}) => {
  const [cardWidth, setCardWidth] = useState('20%')

  useEffect(() => {
    function resize() {
      const width = isWindows ? window.document.body.clientWidth : window.innerWidth
      let value = '100%'
      if (width >= fixedWidth) {
        value = new BigNumber(fixedWidth)
          .minus(24 * (maxCardNum - 1))
          .div(maxCardNum)
          .dp(0, 1)
          .toString()
      }

      if (width >= 768 && width < fixedWidth) {
        value = new BigNumber(width)
          .minus(paddingLen + 24 * (maxCardNum - 2))
          .div(maxCardNum - 1)
          .dp(0, 1)
          .toString()
      }

      if (width > 512 && width < 768) {
        value = new BigNumber(width)
          .minus(paddingLen + 24 * (maxCardNum - 3))
          .div(maxCardNum - 2)
          .dp(0, 1)
          .toString()
      }

      if (width <= 512) {
        value = new BigNumber(width).minus(paddingLen).dp(0, 1).toString()
      }

      setCardWidth(value)
    }

    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [fixedWidth, maxCardNum, paddingLen])

  return cardWidth
}
