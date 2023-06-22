import { ProductsType } from 'common/api/use-products'

export const shoppingCartPrice = (order: any, price: number) => {
  let totalPrice: number = 0
  order?.shoppingCart?.products?.forEach((product: ProductsType) => {
    totalPrice += product.price
  })

  totalPrice += Number(price)

  const finalPrice = order?.totalPrice
    ? Number(order?.totalPrice) + price!
    : price

  return finalPrice
}
