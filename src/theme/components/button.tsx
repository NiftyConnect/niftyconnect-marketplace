import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const ButtonStyles: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'base',
    outline: 'none',
    _active: {
      outline: 'none',
    },
    _focus: { boxShadow: 'none' },
  },
  sizes: {
    sm: {
      fontSize: 'sm',
    },
    md: {
      fontSize: 'md',
    },
  },
  variants: {
    solid: {
      bg: '#3B4556',
      color: '#fff',
      _hover: {
        bg: '#5A88B0',
        color: '#fff',
      },
      _active: {
        color: '#3B4556',
      },
    },
    outline: {
      _hover: {
        bg: '#3B4556',
        color: '#fff',
        border: '1px solid #3B4556',
        _disabled: {
          color: '#3B4556',
        },
      },
    },
    ghost: {
      bg: '#F7F7FA',
      color: '#272E39',
      _hover: {
        bg: '#F7F7FA',
        color: '#272E39',
      },
      _active: {
        color: '#272E39',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'ghost',
  },
}
