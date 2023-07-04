import { Height } from '@mui/icons-material'
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
  let newImgArr: any[] = []
  let newProdArr: any[] = []
  order.shoppingCart.images.forEach((item) => {
    const newObj = {
      material: item.material,
      height: item.height,
      width: item.width,
      qty: item.qty,
      price: item.price,
    }
    newImgArr.push({ ...newObj })
  })

  order.shoppingCart.products.forEach((item) => {
    const newObj = {
      title: item.title,
      qty: item.qty,
      price: item.price,
    }
    newProdArr.push({ ...newObj })
  })

  const body = {
    id: 'unknown',
    pdfInvoice: pdfInvoice,
    country: 'SK',
    date: new Date().toLocaleDateString(),
    totalPrice: order.totalPrice,
    payment: payment,
    shipment: delivery,
    formData: data,
    images: newImgArr,
    products: newProdArr,
  }
  return await fetch('/api/email/send', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
