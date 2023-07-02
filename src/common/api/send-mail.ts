import { FormInputs } from 'common/types/form'
import { Image } from 'common/types/image'
import { Order } from 'common/types/order'
import { Product } from 'common/types/product'

export type UserMail = {
  id: string
  pdfInvoice: string
  country: string
  date: string
  totalPrice: string
  products: Product[]
  images: Image[]
  payment: string | undefined
  shipment: string | undefined
  formData: FormInputs
}

export const sendOrderMail = async (
  data: FormInputs,
  order: Order,
  delivery: string | undefined,
  payment: string | undefined,
  pdfInvoice: string
) => {
  const body = {
    id: 'unknown',
    pdfInvoice: pdfInvoice,
    country: 'SK',
    date: new Date().toLocaleDateString(),
    totalPrice: order.totalPrice,
    products: order.shoppingCart.products,
    images: order.shoppingCart.images,
    payment: payment,
    shipment: delivery,
    formData: data,
  }
  return await fetch('/api/email/send', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
