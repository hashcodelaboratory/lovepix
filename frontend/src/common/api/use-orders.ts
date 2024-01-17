import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { Order } from '../types/order'

export const ORDERS_KEY = 'ORDERS'

const getOrders = async (userId?: string | null): Promise<Order[]> => {
  const res = await fetch(`/api/orders/${userId}`)

  return res.json()
}

export const useOrders = (
  userId?: string | null,
  options?: UseQueryOptions<any, any, any, any>
): UseQueryResult<Order[]> =>
  useQuery([ORDERS_KEY], () => getOrders(userId), options)
