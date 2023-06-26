import { FormInputs } from 'common/types/form'
import { Order } from 'common/types/order'

export const sendOrderMail = async (
  data: FormInputs,
  order: Order,
  delivery: string | undefined,
  payment: string | undefined
) => {
  const body = {
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
    //basket: order.shoppingCart,
    shipment: delivery,
    shippingName: data.firstName,
    shippingSurname: data.lastName,
  }
  return await fetch('/api/order-email/create', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
