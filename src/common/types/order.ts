import { FormInputs } from './form'
import { Material } from '../enums/material'
import { Delivery } from '../enums/delivery'
import { Payment } from '../enums/payment'
import { ProductsType } from 'common/api/use-products'

export type Image = {
  name: string
  url: string
  width: number
  height: number
  qty: number
  origin: string
  material: Material
  price: number
  pdf?: string
}

export type Product = {
  id: string
  price: number
  qty: number
  title: string
  url: string
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
}
