import { collection, doc, getDocs, setDoc } from '@firebase/firestore'
import { database, storage } from '../firebase/config'
import { Collections } from '../firebase/enums'
import { Delivery } from '../enums/delivery'
import { FormInputs } from '../types/form'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { StorageFolder } from '../firebase/storage/enums'
import { Payment } from '../enums/payment'
import { Image } from '../types/image'
import { Product } from '../types/product'
import { createInvoice } from './superfaktura'
import { sendOrderMail } from './send-mail'
import { sendOrderMailtoAdmin } from './send-mail-admins'
import { generateOrderID } from '../../screens-content/shopping-cart/components/summary/summary/generateOrderID'
import { invoice } from '../../screens-content/shopping-cart/components/summary/summary/utils'
import { stripeCreateSession } from './stripe-create-session'
import { Stripe } from '@stripe/stripe-js'
import { OrderState, VoucherType } from 'common/types/order'
import { orderTable } from '../../../database.config'
import { ORDER_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import VoucherService from '../services/voucher'

export type CreateOrderRequest = {
  id?: string
  form: FormInputs
  date: number
  orderState: OrderState[]
  shoppingCart: {
    images?: Image[]
    products?: Product[]
  }
  pdf?: string
  totalPrice: number
  delivery: Delivery
  payment: Payment
  localizationDelivery: string
  localizationPayment: string
  stripe: Stripe | null
  voucher: VoucherType | null
}

const uploadToStorage = async (orderId: string, data: CreateOrderRequest) => {
  const payload: Image[] = []
  const images = data.shoppingCart?.images ?? []

  if (!images.length) {
    const cart = {
      products: data.shoppingCart?.products ?? [],
    }
    const newOrderRef = doc(database, Collections.ORDERS, orderId)
    await setDoc(newOrderRef, { ...data, shoppingCart: cart, stripe: '' })
  }

  await VoucherService.updateLimit(data.voucher?.limit, data.voucher?.code)

  const promises: Promise<void>[] = images?.map(async (image, index) => {
    const uploadURL = `${StorageFolder.ORDERS}/${orderId}/images/`
    const prefix = `${uploadURL}/${orderId}-${image.material}-${image.width}x${image.height}-${image.qty}`

    const urlRef = await ref(storage, `${prefix}-updated/`)
    const originRef = await ref(storage, `${prefix}-origin/`)

    const urlRes = await fetch(image.url)
    const originRes = await fetch(image.origin)

    const urlFile = await urlRes.blob()
    const originFile = await originRes.blob()

    const {
      metadata: { name: urlName },
    } = await uploadBytes(urlRef, urlFile)

    const {
      metadata: { name: originName },
    } = await uploadBytes(originRef, originFile)

    if (urlName && originName) {
      const url = await getDownloadURL(
        ref(storage, `${StorageFolder.ORDERS}/${orderId}/images/${urlName}`)
      )

      const origin = await getDownloadURL(
        ref(storage, `${StorageFolder.ORDERS}/${orderId}/images/${originName}`)
      )

      payload.push({
        ...image,
        url: url,
        origin: origin,
      })

      if (index === payload.length - 1) {
        const cart = {
          images: payload,
          products: data.shoppingCart?.products ?? [],
        }

        const newOrderRef = await doc(database, Collections.ORDERS, orderId)

        await setDoc(newOrderRef, { ...data, shoppingCart: cart, stripe: '' })

        orderTable.update(ORDER_TABLE_KEY, {
          shoppingCart: { images: [], products: [], totalPrice: 0 },
        })
      }
    }
  })

  await Promise.all(promises)
}

const sendNotificationToUser = async (
  data: CreateOrderRequest,
  orderId: string
) => {
  const response = await createInvoice(invoice(orderId, data))
  if (response) {
    const res = await response.json()
    const id = res?.data?.Invoice.id
    const token = res?.data?.Invoice.token
    const pdfInvoice = `https://moja.superfaktura.sk/slo/invoices/pdf/${id}/token:${token}/signature:1/bysquare:1`
    await sendOrderMail(orderId, data, pdfInvoice)
  }
  await stripeCreateSession(data.stripe, data.totalPrice)
  await sendOrderMailtoAdmin(orderId)
}

export const createOrder = async (data: CreateOrderRequest) => {
  const ordersRef = await collection(database, Collections.ORDERS)
  const ordersSnap = await getDocs(ordersRef)

  if (ordersSnap) {
    const orderId = generateOrderID(ordersSnap)
    await uploadToStorage(orderId, data)

    if (data.payment === Payment.ONLINE) {
      await sendNotificationToUser(data, orderId)
    } else {
      await sendOrderMail(orderId, data)
      await sendOrderMailtoAdmin(orderId)
    }
  }
}
