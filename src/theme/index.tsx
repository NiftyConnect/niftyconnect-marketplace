import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { ButtonStyles, AccordionStyles, InputStyles } from './components'
import { fontSizes, gray } from './foundations'
import { styles } from './styles'

const fonts = { heading: `Poppins`, body: 'Poppins,system-ui,sans-serif' }

const breakpoints = createBreakpoints({
  sm: '32em',
  md: '48em',
  lg: '75em',
  xl: '120em',
})

const theme = extendTheme({
  colors: {
    gray,
  },
  styles,
  fonts,
  fontSizes,
  breakpoints,
  components: {
    Button: ButtonStyles,
    Accordion: AccordionStyles,
    Input: InputStyles,
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export default theme
