import { FormInputs } from 'common/types/form'
import { Order } from 'common/types/order'

export const sendOrderMail = async (
  data: FormInputs,
  order: Order,
  delivery: string | undefined,
  payment: string | undefined,
  pdfInvoice: string
) => {
  const body = {
    pdfInvoice: pdfInvoice,
    id: 'unknown',
    name: data.firstName,
    surname: data.lastName,
    country: 'SK',
    date: new Date().toLocaleDateString(),
    dest: data.email,
    totalPrice: order.totalPrice,
    payment: payment,
    city: data.city,
    street: data.address,
    phone: data.phone,
    postcode: data.postalCode,
    products: order.shoppingCart.products,
    images: order.shoppingCart.images,
    shipment: delivery,
    shippingName: data.firstName,
    shippingSurname: data.lastName,
  }
  return await fetch('/api/order-email/create', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
