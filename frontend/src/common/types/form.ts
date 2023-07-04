import { Delivery } from "../enums/delivery";
import { Payment } from "../enums/payment";

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
}
