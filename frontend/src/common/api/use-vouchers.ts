import { useQuery, UseQueryResult } from 'react-query'
import { SaleTypeEnum } from '../voucher/utils/enums'

export const VOUCHERS_KEY = 'VOUCHERS'

export type VoucherType = {
  id: string
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

const getVouchers = async (): Promise<VoucherType[]> => {
  const res = await fetch('api/voucher/list')
  return res.json()
}

export const useVouchers = (): UseQueryResult<VoucherType[]> =>
  useQuery([VOUCHERS_KEY], () => getVouchers())
