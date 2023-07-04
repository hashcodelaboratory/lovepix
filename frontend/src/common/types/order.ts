import { FormInputs } from './form'
import { Delivery } from '../enums/delivery'
import { Payment } from '../enums/payment'
import { Product } from './product'
import { Image } from './image'

type OrderStates = {
  date: number
  state: string
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
  orderState: OrderStates[]
}
