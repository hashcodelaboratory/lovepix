import { MutationOptions, useMutation, UseMutationResult } from 'react-query'
import { SaleTypeEnum } from '../../../../common/voucher/utils/enums'

export type AddVoucherRequest = {
  code: string
  description: string
  saleType: SaleTypeEnum
  value: number
  freeDelivery: boolean
  expiration: string
  minimalValue?: number
  limit?: number
  limitUser?: number
}

const addVoucher = async (data: AddVoucherRequest) => {
  const res = await fetch('/api/voucher/add', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
    }),
  })

  return res.json()
}

export const useAddVoucher = (
  options?: MutationOptions<any, any, AddVoucherRequest>
): UseMutationResult<any, any, AddVoucherRequest> =>
  useMutation(addVoucher, options)
