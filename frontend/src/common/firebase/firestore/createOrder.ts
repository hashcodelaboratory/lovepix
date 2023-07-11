import { MutationOptions, useMutation, UseMutationResult } from 'react-query'
import { collection, doc, getDocs, setDoc } from '@firebase/firestore'
import { database, storage } from '../config'
import { Collections } from '../enums'
import { Delivery } from '../../enums/delivery'
import { FormInputs } from '../../types/form'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { StorageFolder } from '../storage/enums'
import { Payment } from '../../enums/payment'
import { orderTable } from '../../../../database.config'
import { Image } from 'common/types/image'
import { Product } from 'common/types/product'
import { createInvoice } from 'common/api/superfaktura'
import { sendOrderMail } from 'common/api/send-mail'
import { sendOrderMailtoAdmin } from 'common/api/send-mail-admins'
import { generateOrderID } from 'screens-content/shopping-cart/components/summary/summary/generateOrderID'
import { invoice } from 'screens-content/shopping-cart/components/summary/summary/utils'
import { stripeCreateSession } from 'common/api/stripe-create-session'
import { Stripe } from '@stripe/stripe-js'

export type CreateOrderRequest = {
  form: FormInputs
  date: number
  shoppingCart: {
    images?: Image[]
    products?: Product[]
  }
  totalPrice: number
  delivery: Delivery
  payment: Payment
  stripe: Stripe | null
}

const uploadToStorage = async (orderId: string, data: CreateOrderRequest) => {
  const payload: Image[] = []
  const images = data.shoppingCart?.images ?? []

  images?.map(async (image: Image, index) => {
    const uploadURL = `${StorageFolder.ORDERS}/${orderId}/images/`

    const urlRef = await ref(storage, `${uploadURL}/updated/`)
    const originRef = await ref(storage, `${uploadURL}/origin/`)

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

        const newOrderRef = doc(database, Collections.ORDERS, orderId)

        await setDoc(newOrderRef, { ...data, shoppingCart: cart, stripe: '' })

        orderTable.clear()
      }
    }
  })

  if (!images.length) {
    const cart = {
      products: data.shoppingCart?.products ?? [],
    }
    const newOrderRef = doc(database, Collections.ORDERS, orderId)
    await setDoc(newOrderRef, { ...data, shoppingCart: cart, stripe: '' })
  }
}

const sendNotificationToUser = async (data: CreateOrderRequest, orderId: string) => {
  const response = await createInvoice(invoice(orderId, data))
  if (response) {
    const res = await response.json()
    const id = res?.data?.Invoice.id
    const token = res?.data?.Invoice.token
    const pdfInvoice = `https://moja.superfaktura.sk/slo/invoices/pdf/${id}/token:${token}/signature:1/bysquare:1`
    await sendOrderMail(orderId, data, pdfInvoice)
  }
  await stripeCreateSession(data?.stripe, data?.totalPrice)
  await sendOrderMailtoAdmin(orderId)
}

const createOrder = async (data: CreateOrderRequest) => {
  const ordersRef = await collection(database, Collections.ORDERS)
  const ordersSnap = await getDocs(ordersRef)

  if (ordersSnap) {
    const orderId = generateOrderID(ordersSnap)
    await uploadToStorage(orderId, data)

    if (data.payment === Payment.ONLINE) {
      sendNotificationToUser(data, orderId)
    } else {
      await sendOrderMail(orderId, data)
      await sendOrderMailtoAdmin(orderId)
    }
  }
}

export const useCreateOrder = (
  options?: MutationOptions<any, any, CreateOrderRequest>
): UseMutationResult<any, any, CreateOrderRequest> =>
  useMutation(createOrder, options)
