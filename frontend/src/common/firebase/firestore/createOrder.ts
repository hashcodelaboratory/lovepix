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
import {generateOrderID} from "../../../screens-content/shopping-cart/components/summary/summary/generateOrderID";


type OrderState = {
  state: string,
  date: number
}

type CreateOrderRequest = {
  form: FormInputs
  date: number
  orderState: OrderState[]
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
          products: data.shoppingCart.products,
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
  const ordersSnap = await getDocs(ordersRef)

  if (ordersSnap) {
    const orderId = generateOrderID(ordersSnap)

    await uploadToStorage(orderId, data)
  }
}

export const useCreateOrder = (
  options?: MutationOptions<any, any, CreateOrderRequest>
): UseMutationResult<any, any, CreateOrderRequest> =>
  useMutation(createOrder, options)
