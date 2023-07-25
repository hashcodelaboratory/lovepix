import { MutationOptions, useMutation, UseMutationResult } from 'react-query'

export type RemoveVouchersRequest = {
  ids: string[]
}

const removeVoucher = async (data: RemoveVouchersRequest) => {
  const res = await fetch('/api/voucher/remove', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
    }),
  })

  return res.json()
}

export const useRemoveVouchers = (
  options?: MutationOptions<any, any, RemoveVouchersRequest>
): UseMutationResult<any, any, RemoveVouchersRequest> =>
  useMutation(removeVoucher, options)
