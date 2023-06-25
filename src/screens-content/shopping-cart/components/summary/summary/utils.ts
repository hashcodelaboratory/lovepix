import { Delivery } from 'common/enums/delivery'
import { Payment } from 'common/enums/payment'
import { FormInputs } from 'common/types/form'
import { Order } from 'common/types/order'
import dayjs from 'dayjs'

const invoiceItems = (
  order: Order,
  delivery: Delivery | null,
  payment: Payment | null
) => {
  let newItems: any[] = []
  const productItems = [
    ...order.shoppingCart.products,
    ...order.shoppingCart.images,
  ]

  productItems.forEach((item: any) => {
    const items = {
      unit_price: item.price,
      description:
        item.title ?? `Obraz konfigurátor ${item.height} X ${item.width}`,
      quantity: item.qty,
      unit: 'ks',
    }
    newItems.push({ ...items })
  })
  const deliveryPrice = delivery === Delivery.COURIER ? 5 : 0
  const deliveryItem = {
    unit_price: deliveryPrice,
    description: delivery,
    quantity: 1,
    unit: 'ks',
  }
  const paymentItem = {
    unit_price: 0,
    description: payment,
    quantity: 1,
    unit: 'ks',
  }
  newItems.push(deliveryItem, paymentItem)
  return newItems
}

export const invoice = (
  data: FormInputs,
  order: Order,
  delivery: Delivery | null,
  payment: Payment | null
) => {
  const createdDate = dayjs(new Date()).format('YYYY-MM-DD')
  const dueDate = dayjs().add(15, 'day').format('YYYY-MM-DD')
  return {
    Invoice: {
      created: createdDate,
      delivery: createdDate,
      due: dueDate,
    },
    InvoiceItem: invoiceItems(order, delivery, payment),
    Client: {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      city: data.city,
    },
  }
}
