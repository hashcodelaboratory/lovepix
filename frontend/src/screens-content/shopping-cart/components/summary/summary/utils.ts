import { Delivery } from 'common/enums/delivery'
import { Payment } from 'common/enums/payment'
import { FormInputs } from 'common/types/form'
import { Image } from 'common/types/image'
import { Order } from 'common/types/order'
import { Product } from 'common/types/product'
import { InvoiceItem, SFInvoice } from 'common/types/superfaktura'
import dayjs from 'dayjs'

type CreateOrderRequest = {
  form: FormInputs
  date: number
  shoppingCart: {
    images?: Image[]
    products?: Product[]
  }
  totalPrice: number
  delivery: Delivery
  payment: Payment
}

const invoiceItems = (data: CreateOrderRequest) => {
  let newItems: InvoiceItem[] = []
  const productItems = [
    ...(data.shoppingCart.products ?? []),
    ...(data.shoppingCart.images ?? []),
  ]

  productItems?.forEach((item: any) => {
    const items = {
      unit_price: item.price / 1.2,
      tax: 20,
      description:
        item.title ?? `Obraz konfigurátor ${item.height} X ${item.width}`,
      quantity: item.qty,
      unit: 'ks',
    }
    newItems.push({ ...items })
  })
  const deliveryPrice = data.delivery === Delivery.COURIER ? 5 / 1.2 : 0
  const deliveryItem = {
    unit_price: deliveryPrice,
    description: `Doprava - ${data.delivery}`,
    quantity: 1,
    unit: 'ks',
  }
  const paymentItem = {
    unit_price: 0,
    description: `Platba - ${data.payment}`,
    quantity: 1,
    unit: 'ks',
  }
  newItems.push(deliveryItem, paymentItem)
  return newItems
}

export const invoice = (
  orderId: string,
  data: CreateOrderRequest
): SFInvoice => {
  const createdDate = dayjs(new Date()).format('YYYY-MM-DD')
  const dueDate = dayjs().add(15, 'day').format('YYYY-MM-DD')
  return {
    Invoice: {
      name: orderId,
      created: createdDate,
      delivery: createdDate,
      due: dueDate,
    },
    InvoiceItem: invoiceItems(data),
    Client: {
      name: `${data.form.firstName} ${data.form.lastName}`,
      address: data.form.address,
      city: data.form.city,
    },
  }
}
