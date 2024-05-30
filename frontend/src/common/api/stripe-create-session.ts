import { Stripe } from '@stripe/stripe-js'
import { clearIndexedDb } from '../indexed-db/utils/clear'

const STRIPE_SECRET_KEY = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
const STRIPE_SECRET_KEY_TEST = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY_TEST;

if (!STRIPE_SECRET_KEY || !STRIPE_SECRET_KEY_TEST) {
  throw new Error('Stripe secret keys are not properly configured');
}

export const stripeCreateSession = async (
  stripe: Stripe | null,
  totalPrice?: number
) => {
  const response = await fetch('api/checkout_sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}, Bearer ${STRIPE_SECRET_KEY_TEST}`,
    },
    body: JSON.stringify({
      totalPrice: totalPrice,
    }),
  })
  const _data = await response.json()
  await clearIndexedDb()
  await stripe?.redirectToCheckout({
    sessionId: _data.sessionId,
  })
}
