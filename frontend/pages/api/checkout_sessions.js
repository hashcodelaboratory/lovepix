const stripeProd = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const stripeTest = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY_TEST);

export default async function handler(req, res) {
  const _body = JSON.parse(req.body);
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const stripeInstance = process.env.NODE_ENV === 'production' ? stripeProd : stripeTest;
      const session = await stripeInstance.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Lovepix'
              },
              unit_amount: (Number(_body.totalPrice) * 100)
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/thanks?success=true`,
        cancel_url: `${req.headers.origin}/thanks?canceled=true`,
      });
      res.json({ sessionId: session.id });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}