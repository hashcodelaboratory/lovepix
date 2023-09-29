import { MutationOptions, useMutation, UseMutationResult } from 'react-query'
import { OrderState } from '../../../../common/types/order'

export type UpdateOrderStateRequest = {
  orderId: string
  orderState: OrderState[]
}
const updateOrderState = async (data: UpdateOrderStateRequest) => {
  const res = await fetch('/api/order/state/edit', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  return res.json()
}

export const useUpdateOrderState = (
  options?: MutationOptions<any, any, UpdateOrderStateRequest>
): UseMutationResult<any, any, UpdateOrderStateRequest> =>
  useMutation(updateOrderState, options)
