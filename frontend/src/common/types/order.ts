import { FormInputs } from './form'
import { Delivery } from '../enums/delivery'
import { Payment } from '../enums/payment'
import { Product } from './product'
import { Image } from './image'
import { SaleTypeEnum } from '../voucher/utils/enums'

export type OrderState = {
  date: number
  state: string
}

export type VoucherType = {
  code: string
  value: number
  saleType: SaleTypeEnum
}

export type Order = {
  id: string
  date: Date
  form: FormInputs
  shoppingCart: {
    images: Image[]
    products: Product[]
  }
  delivery: Delivery
  payment: Payment
  totalPrice: number
  pdf: string
  orderState: OrderState[]
  voucher: VoucherType
  note: string
}
