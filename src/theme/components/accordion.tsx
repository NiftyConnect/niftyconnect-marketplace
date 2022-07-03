import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const AccordionStyles: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'base',
    outline: 'none',
    _active: {
      outline: 'none',
    },
    _focus: { boxShadow: 'none' },
  },
}
