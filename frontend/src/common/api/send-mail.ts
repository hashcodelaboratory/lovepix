import { CreateOrderRequest } from './create-order'
import { FormInputs } from 'common/types/form'
import { Image } from 'common/types/image'
import { Order, VoucherType } from 'common/types/order'
import { Product } from 'common/types/product'
import { loggingService } from '../../analytics/logging-service'
import { LovepixEvent } from '../../analytics/lovepix-event'

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
  localizationPayment: string
  localizationDelivery: string
  formData: FormInputs
  voucher?: VoucherType
}

export const sendOrderMail = async (
  orderId: string,
  data: CreateOrderRequest | Order,
  pdfInvoice?: string
) => {
  let newImgArr: any[] = []
  let newProdArr: any[] = []
  data?.shoppingCart?.images?.forEach((item) => {
    const newObj = {
      material: item.material,
      height: item.height,
      width: item.width,
      qty: item.qty,
      price: item.price,
    }
    newImgArr.push({ ...newObj })
  })

  data?.shoppingCart?.products?.forEach((item) => {
    const newObj = {
      title: item.title,
      qty: item.qty,
      price: item.price,
    }
    newProdArr.push({ ...newObj })
  })

  const body = {
    id: orderId,
    pdfInvoice: pdfInvoice,
    country: 'SK',
    date: new Date().toLocaleDateString(),
    totalPrice: data.totalPrice,
    localizationPayment: data.localizationPayment,
    localizationDelivery: data.localizationDelivery,
    payment: data.payment,
    shipment: data.delivery,
    formData: data.form,
    images: newImgArr,
    products: newProdArr,
    voucher: data.voucher,
  }

  loggingService.logEvent(LovepixEvent.NOTIFICATION_EMAILS, {
    extra: {
      category: 'SEND_ORDER_MAIL',
      body,
    },
  })

  return await fetch('/api/email/send', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
