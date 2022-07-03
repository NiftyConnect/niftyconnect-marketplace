import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Select, OptionBase, GroupBase } from 'chakra-react-select'
import React, { useCallback } from 'react'
import SmallSvg from './small.svg'
import LargeSvg from './large.svg'
import FilterSvg from './filter.svg'
import { useCollection } from '../../../context'
import { Filters } from '../../Filters'

interface ColorOption extends OptionBase {
  label: string
  value: string
}

const PriceOptions = [
  { value: 'asc', label: 'Price: Low to High' },
  { value: 'desc', label: 'Price: High to Low' },
]

export const CollectionContentHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const { setPriceSortOrder, setCardNum, setTokenId } = useCollection()
  const changePrice = useCallback(
    (newPriceFilter) => {
      setPriceSortOrder(newPriceFilter?.value)
    },
    [setPriceSortOrder],
  )

  const tokenIdChange = useCallback(
    (evt) => {
      setTokenId(evt.currentTarget.value.trim())
    },
    [setTokenId],
  )

  return (
    <Flex
      alignItems={{ base: 'flex-start', sm: 'center' }}
      justifyContent="space-between"
      w="100%"
      flexDir={{ base: 'column', sm: 'row' }}
    >
      <Flex w={{ base: '100%', sm: 'auto' }} alignItems="center" justifyContent={'space-between'}>
        <Text fontSize={'20px'} lineHeight={'30px'} fontWeight={600}>
          Items
        </Text>
        <Box
          border="1px solid #3B4556"
          borderRadius={'6px'}
          onClick={onOpen}
          height="36px"
          width="36px"
          display={{ base: 'flex', sm: 'none' }}
          justifyContent={'center'}
          alignItems="center"
          cursor={'pointer'}
          ref={btnRef}
        >
          <FilterSvg />
        </Box>
      </Flex>

      <Flex
        alignItems={'center'}
        width={{ base: '100%', sm: 'auto' }}
        flexGrow={1}
        justifyContent="flex-end"
        flexDir={{ base: 'column', sm: 'row' }}
      >
        <InputGroup marginRight={'16px'} width="auto" display={{ base: 'none', sm: 'flex' }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="number" placeholder="Please input Token ID" w="211px" onChange={tokenIdChange} />
        </InputGroup>
        <Select<ColorOption, true, GroupBase<ColorOption>>
          options={PriceOptions}
          defaultValue={{ value: 'asc', label: 'Price: Low to High' }}
          closeMenuOnSelect={true}
          onChange={changePrice}
          chakraStyles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              bg: 'transparent',
              cursor: 'inherit',
            }),
            container: (provided) => ({
              ...provided,
              w: { base: '100%', sm: '200px' },
              marginTop: { base: '16px', sm: '0' },
              cursor: 'pointer',
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: '14px',
              color: '#3B4556',
            }),
            menuList: (provided) => ({
              ...provided,
              fontSize: '14px',
              color: '#3B4556',
            }),
            indicatorSeparator: () => ({
              display: 'none',
            }),
          }}
        />
        <Stack
          direction={['column', 'row']}
          padding="10px"
          spacing="16px"
          borderRadius={'6px'}
          alignItems={'center'}
          border="1px solid #EDEDED"
          marginLeft="16px"
          cursor={'pointer'}
          display={{ base: 'none', sm: 'flex' }}
        >
          <Flex onClick={() => setCardNum(6)}>
            <SmallSvg />
          </Flex>
          <Flex onClick={() => setCardNum(4)}>
            <LargeSvg />
          </Flex>
        </Stack>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Filters />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}
