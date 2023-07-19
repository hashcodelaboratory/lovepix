import { useQuery, UseQueryResult } from 'react-query'

export const VOUCHERS_KEY = 'VOUCHERS'

export type VoucherType = {
  id: string
  code: string
}

const getVouchers = async (): Promise<VoucherType[]> => {
  const res = await fetch('api/voucher/list')
  return res.json()
}

export const useVouchers = (): UseQueryResult<VoucherType[]> =>
  useQuery([VOUCHERS_KEY], () => getVouchers())
