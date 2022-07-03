import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const InputStyles: ComponentStyleConfig = {
  baseStyle: {
    field: {
      borderColor: '#EDEDED',
      borderRadius: '6px',
      _focus: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#3B4556',
        filter: 'drop-shadow(0px 0px 6px rgba(59, 69, 86, 0.3))',
      },
      _placeholder: {
        color: '#818D9F',
        opacity: '0.5',
        fontSize: '14px',
      },
    },
  },
  variants: {
    outline: {
      field: {
        background: 'inherit',
        border: '1px solid #EDEDED',
        _focus: {
          border: '2px solid #3B4556',
        },
        _hover: { border: '2px solid #3B4556' },
      },
    },
    Unstyled: {
      field: {
        background: 'inherit',
        borderColor: 'inherit',
        _hover: { border: 'none' },
      },
    },
  },
}
