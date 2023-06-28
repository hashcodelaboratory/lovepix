import { MutationOptions, useMutation, UseMutationResult } from 'react-query'
import {
  collection,
  doc,
  getCountFromServer,
  setDoc,
} from '@firebase/firestore'
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

const uploadToStorage = async (orderId: string, data: CreateOrderRequest) => {
  const payload: Image[] = []
  const images = data.shoppingCart.images

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
        }

        const newOrderRef = doc(database, Collections.ORDERS, orderId)

        await setDoc(newOrderRef, { ...data, shoppingCart: cart })

        orderTable.clear()
      }
    }
  })
}

// Note: orderId template: PIC{year}{000orderNumber}
const createOrder = async (data: CreateOrderRequest) => {
  const ordersRef = await collection(database, Collections.ORDERS)
  if (ordersRef) {
    const docSnap = await getCountFromServer(ordersRef)
    if (docSnap) {
      const year = new Date(Date.now()).getFullYear()
      const orderNumber = String(
        docSnap ? docSnap.data().count + 1 : 1
      ).padStart(4, '0')
      const orderId = `PIC${year}${orderNumber}`
      await uploadToStorage(orderId, data)
    }
  }
}

export const useCreateOrder = (
  options?: MutationOptions<any, any, CreateOrderRequest>
): UseMutationResult<any, any, CreateOrderRequest> =>
  useMutation(createOrder, options)
