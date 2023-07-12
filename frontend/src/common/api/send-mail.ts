import { CreateOrderRequest } from './create-order'
import { FormInputs } from 'common/types/form'
import { Image } from 'common/types/image'
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
  orderId: string,
  data: CreateOrderRequest,
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
    payment: data.payment,
    shipment: data.delivery,
    formData: data.form,
    images: newImgArr,
    products: newProdArr,
  }
  return await fetch('/api/email/send', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
