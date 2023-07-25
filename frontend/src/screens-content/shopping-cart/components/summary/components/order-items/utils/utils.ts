import { orderTable } from '../../../../../../../../database.config'
import { ORDER_TABLE_KEY } from '../../../../../../../common/indexed-db/hooks/keys'
import { Order } from '../../../../../../../common/types/order'
import { Image } from '../../../../../../../common/types/image'
import { Product } from '../../../../../../../common/types/product'
import { ShoppingCart } from 'common/types/shopping-cart'

export enum UpdateQuantityWay {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

export const removeImage = (url?: string, shoppingCart?: ShoppingCart) => {
  const filtered = shoppingCart?.images?.filter(
    (image: Image) => image.url !== url
  )

  const totalPriceImages = filtered?.reduce(
    (accumulator, { qty, price }) => accumulator + qty * price,
    0
  )

  const totalPriceProducts = shoppingCart?.products?.reduce(
    (accumulator, { qty, price }) => accumulator + qty * price,
    0
  )

  const total = Number(totalPriceImages) + Number(totalPriceProducts)

  if (
    shoppingCart?.images?.length === 1 &&
    shoppingCart?.products?.length === 0
  ) {
    orderTable.update(ORDER_TABLE_KEY, {
      shoppingCart: { images: [], products: [], totalPrice: 0 },
    })
  } else {
    orderTable.update(ORDER_TABLE_KEY, {
      shoppingCart: {
        images: filtered,
        products: shoppingCart?.products ?? [],
      },
      totalPrice: total?.toFixed(2),
    })
  }
}

export const removeProduct = (id?: string, shoppingCart?: ShoppingCart) => {
  const filtered = shoppingCart?.products?.filter(
    (product: Product) => product.id !== id
  )

  const totalPriceProducts = filtered?.reduce(
    (accumulator, { qty, price }) => accumulator + qty * price,
    0
  )

  const totalPriceImages = shoppingCart?.images?.reduce(
    (accumulator, { qty, price }) => accumulator + qty * price,
    0
  )

  const total = Number(totalPriceImages) + Number(totalPriceProducts)

  if (
    shoppingCart?.products?.length === 1 &&
    shoppingCart?.images?.length === 0
  ) {
    orderTable.update(ORDER_TABLE_KEY, {
      shoppingCart: { images: [], products: [], totalPrice: 0 },
    })
  } else {
    orderTable.update(ORDER_TABLE_KEY, {
      shoppingCart: {
        images: shoppingCart?.images ?? [],
        products: filtered,
      },
      totalPrice: total?.toFixed(2),
    })
  }
}

export const updateQuantity = async (
  way: UpdateQuantityWay,
  order: Order,
  image: Image,
  index: number
) => {
  if (way === UpdateQuantityWay.DECREASE && image.qty === 1) return

  const array = order?.shoppingCart?.images

  way === UpdateQuantityWay.INCREASE ? array[index].qty++ : array[index].qty--

  const filtered = [...array]

  const totalPriceProducts = order?.shoppingCart?.products?.reduce(
    (accumulator, { qty, price }) => accumulator + qty * price,
    0
  )

  const totalPriceImages = order?.shoppingCart?.images?.reduce(
    (accumulator, { qty, price }) => accumulator + qty * price,
    0
  )

  const total = Number(totalPriceImages) + Number(totalPriceProducts)

  await orderTable.update(ORDER_TABLE_KEY, {
    shoppingCart: {
      images: filtered,
      products: order?.shoppingCart?.products,
    },
    totalPrice: total.toFixed(2),
  })
}
