import { chakra, Flex, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Text, Spinner } from '@chakra-ui/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useChainId, useQueryNftWithOrders } from '../../../hooks'
import { Empty } from '../../Empty'
import { getPaymentSymbol, truncateString } from '../../../utils'
import moment from 'moment'
import BigNumber from 'bignumber.js'
import { MintveseNft } from '../../../types'
import { Name } from '../../Name'
import { ExplorerLink } from '../../ExplorerLink'
import { cancelOrder, NiftyConnectOrder, takeOrder } from 'niftyconnect-js'
import { ZERO_ADDRESS } from '../../../constants'
import { useAccount } from 'wagmi'

const OrderContainer = chakra(Flex, {
  baseStyle: {
    w: '100%',
    paddingTop: '30px',
  },
})

const TableText = chakra(Text, {
  baseStyle: {
    overflow: 'hidden',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#3B4556',
    fontWeight: 600,
    textOverflow: 'ellipsis',
  },
})

const LoadingContainer = chakra(Flex, {
  baseStyle: {
    padding: '50px 0',
    position: 'relative',
    justifyContent: 'center',
  },
})

export const OrderList = () => {
  const chainId = useChainId()
  const {
    data: { address: account },
  } = useAccount()
  const [isQuerying, setIsQuerying] = useState(false)
  const [cancelOrderId, setCancelOrderid] = useState<string | null>(null)
  const [acceptOrderId, setAcceptOrderId] = useState<string | null>(null)
  const [orders, setOrders] = useState<Array<NiftyConnectOrder & MintveseNft>>([])
  const queryNftWithOrders = useQueryNftWithOrders()

  const cancel = useCallback(
    async (order: NiftyConnectOrder & MintveseNft) => {
      setCancelOrderid(order.orderHash)
      try {
        const tx = await cancelOrder({ order, account, chainId: 1 })
        await tx.wait()
      } catch (err) {
        console.log(err)
      } finally {
        setCancelOrderid(null)
      }
    },
    [account],
  )

  const accept = useCallback(
    async (order: NiftyConnectOrder & MintveseNft) => {
      setAcceptOrderId(order.orderHash)
      try {
        const tx = await takeOrder({ order, account, chainId: 1 })
        await tx.wait()
      } catch (err) {
        console.log(err)
      } finally {
        setAcceptOrderId(null)
      }
    },
    [account],
  )

  const blockchain = useMemo(() => {
    return chainId === 1 ? 'ETH' : 'BSC'
  }, [chainId])

  useEffect(() => {
    if (!account) return
    setIsQuerying(true)
    queryNftWithOrders({ blockchain, user_address: account })
      .then((res) => {
        const orders = res
          .filter((item) => item && item.orders && item?.orders?.length > 0)
          .map((item) => {
            const OrderswithNftInfo = item.orders.map((o) => ({
              ...item,
              ...o,
            }))
            return { ...item, orders: [...OrderswithNftInfo] }
          })
          .reduce((a: any, b: any) => {
            return a?.concat(b.orders)
          }, [])

        setOrders(orders)
      })
      .finally(() => {
        setIsQuerying(false)
      })
  }, [account, blockchain, queryNftWithOrders])

  return (
    <>
      {isQuerying && (
        <LoadingContainer>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="#3B4556" size="xl" />
        </LoadingContainer>
      )}
      {orders?.length > 0 && (
        <OrderContainer>
          <TableContainer w="100%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nft Item</Th>
                  <Th>Price</Th>
                  <Th>Maker</Th>
                  <Th>Taker</Th>
                  <Th>Tx Hash</Th>
                  <Th>Listing time</Th>
                  <Th>Expiration</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{<Name nft={order} />}</Td>
                      <Td>
                        <TableText>
                          {`${new BigNumber(order.orderPrice)
                            .div(10 ** 18)
                            .dp(8, 1)
                            .toFixed()} ${getPaymentSymbol({
                            paymentContract: order.paymentToken,
                            blockchain: order.blockchain,
                          })}`}
                        </TableText>
                      </Td>
                      <Td>
                        <TableText>
                          {
                            <ExplorerLink
                              address={order.maker}
                              chainId={Number(chainId)}
                              text={truncateString(order.maker)}
                            />
                          }
                        </TableText>
                      </Td>
                      <Td>
                        <TableText>
                          {order.taker !== ZERO_ADDRESS ? (
                            <ExplorerLink
                              address={order.taker}
                              chainId={Number(chainId)}
                              text={truncateString(order.taker)}
                            />
                          ) : (
                            '--'
                          )}
                        </TableText>
                      </Td>
                      <Td>
                        <TableText>
                          {
                            <ExplorerLink
                              txHash={order.txHash}
                              chainId={Number(chainId)}
                              text={truncateString(order.txHash)}
                            />
                          }
                        </TableText>
                      </Td>
                      <Td>
                        <TableText>
                          {moment.unix(Number(order.listingTime)).year() > new Date().getFullYear()
                            ? moment(Number(order.listingTime)).format('YYYY-MM-DD HH:MM:SS')
                            : moment.unix(Number(order.listingTime)).format('YYYY-MM-DD HH:MM:SS')}
                        </TableText>
                      </Td>
                      <Td>
                        <TableText>
                          {moment.unix(Number(order.expirationTime)).year() > new Date().getFullYear()
                            ? moment(Number(order.expirationTime)).format('YYYY-MM-DD HH:MM:SS')
                            : moment.unix(Number(order.expirationTime)).format('YYYY-MM-DD HH:MM:SS')}
                        </TableText>
                      </Td>
                      <Td>
                        {order.isFinalized ? (
                          <TableText>{'Finalized'}</TableText>
                        ) : account?.toLowerCase() === order.maker ? (
                          <Button
                            variant={'outline'}
                            size="sm"
                            fontSize={'12px'}
                            onClick={() => cancel(order)}
                            isLoading={cancelOrderId === order.orderHash}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            variant={'solid'}
                            size="sm"
                            fontSize={'12px'}
                            onClick={() => accept(order)}
                            isLoading={acceptOrderId === order.orderHash}
                          >
                            Accept
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </OrderContainer>
      )}

      {orders?.length === 0 && !isQuerying && <Empty />}
    </>
  )
}
