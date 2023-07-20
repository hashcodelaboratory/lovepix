import EmptyCart from './components/empty-cart/empty-cart'
import Summary from './components/summary/summary/summary'
import { Order } from '../../common/types/order'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CircularProgress from '@mui/material/CircularProgress'

type CustomShoppingCartProps = {
  order: Order
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ''
)

const CustomShoppingCart = ({ order }: CustomShoppingCartProps) => {
  if (!order)
    return (
      <div style={{ margin: 'auto' }}>
        <CircularProgress />
      </div>
    )

  if (
    !order?.shoppingCart?.images?.length &&
    !order?.shoppingCart?.products?.length
  )
    return <EmptyCart />

  return (
    <Elements stripe={stripePromise}>
      <Summary order={order} />
    </Elements>
  )
}

export default CustomShoppingCart
