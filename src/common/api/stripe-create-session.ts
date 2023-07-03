import { Stripe } from "@stripe/stripe-js";

export const stripeCreateSession = async (stripe: Stripe | null, totalPrice?: number) => {
  const response = await fetch("api/checkout_sessions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
    },
    body: JSON.stringify({
      totalPrice: totalPrice,
    })
  });
  const _data = await response.json();
  await stripe?.redirectToCheckout({
    sessionId: _data.sessionId});
}
