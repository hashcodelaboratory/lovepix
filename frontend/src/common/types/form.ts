import { Delivery } from '../enums/delivery'
import { Payment } from '../enums/payment'

export type FormInputs = {
  firstName: string
  lastName: string
  company: string
  address: string
  city: string
  postalCode: string
  phone: string
  email: string
  delivery?: Delivery
  payment?: Payment
  ico?: string
  dic?: string
  note?: string
  firstNameShippingAddress?: string
  lastNameShippingAddress?: string
  addressShippingAddress?: string
  cityShippingAdress?: string
  postalCodeShippingAddress?: string
}
