import { MutationOptions, useMutation, UseMutationResult } from 'react-query'

export type VoucherDetailRequest = {
  id: string
}

const getVoucherDetail = async (data: VoucherDetailRequest) => {
  const res = await fetch('api/voucher/detail', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
    }),
  })
  return res.json()
}

export const useVoucherDetail = (
  options?: MutationOptions<any, any, VoucherDetailRequest>
): UseMutationResult<any, any, VoucherDetailRequest> =>
  useMutation(getVoucherDetail, options)
