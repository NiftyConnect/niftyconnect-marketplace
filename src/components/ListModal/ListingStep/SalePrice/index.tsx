import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  chakra,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Button,
  InputGroup,
} from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useChainId } from '../../../../hooks'
import { useListModal } from '../../context'

const Title = chakra(Flex, {
  baseStyle: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#333',
    fontWeight: 600,
    marginBottom: '12px',
  },
})

const PriceBoxRow = chakra(Flex, {
  baseStyle: {
    // border: '2px solid #3B4556',
    height: '40px',
    borderRadius: '6px',
  },
})

export const SalePrice = () => {
  const chainId = useChainId()
  const {
    setSalePrice,
    setPayment,
    state: { payment, payments, salePrice },
  } = useListModal()

  const priceChange = useCallback(
    (evt) => {
      setSalePrice(evt.currentTarget.value)
    },
    [setSalePrice],
  )

  return (
    <Container padding={0} marginTop="24px">
      <Title>Sale Price</Title>
      <PriceBoxRow>
        <InputGroup>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              w="120px"
              h="40px"
              bg="#EDEDED"
              fontSize={'14px'}
              lineHeight={'21px'}
              fontWeight="600"
              borderRadius={'0'}
              borderTopLeftRadius={'6px'}
              borderBottomLeftRadius={'6px'}
            >
              {payment.symbol}
            </MenuButton>
            <MenuList>
              {payments[chainId].map((pay, index) => {
                return (
                  <MenuItem key={index} minH="40px" onClick={() => setPayment(pay)}>
                    {pay.symbol}
                  </MenuItem>
                )
              })}
            </MenuList>
          </Menu>
          <Input
            type={'number'}
            placeholder="price"
            variant={'outline'}
            bg="transparent"
            h="40px"
            fontWeight={600}
            value={salePrice}
            onChange={priceChange}
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            _focus={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
            _hover={{
              border: '2px solid #3B4556',
              // borderLeftColor: '#fff',
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0',
            }}
          />
        </InputGroup>
      </PriceBoxRow>
    </Container>
  )
}
