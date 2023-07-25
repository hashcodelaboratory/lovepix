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

const editVoucher = async (data: AddVoucherRequest) => {
  const res = await fetch('/api/voucher/edit', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
    }),
  })

  return res.json()
}

export const useEditVoucher = (
  options?: MutationOptions<any, any, AddVoucherRequest>
): UseMutationResult<any, any, AddVoucherRequest> =>
  useMutation(editVoucher, options)
