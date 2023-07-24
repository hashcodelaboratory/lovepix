import { SaleTypeEnum } from '../../../../../../common/voucher/utils/enums'

export const getVoucherValue = (saleType: SaleTypeEnum, value: number) => {
  switch (saleType) {
    case SaleTypeEnum.PERCENTAGE:
      return value / 100
    default:
      return value
  }
}
