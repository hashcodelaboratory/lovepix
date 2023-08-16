export type OrderStateMail = {
  id: string
  dest: string[]
  text: string
}

export const sendMailOrderShipped = async (
  orderId: string,
  email: string,
  text: string
) => {
  const body = {
    id: orderId,
    dest: email,
    text: text,
  }
  return await fetch('/api/email/order/shipped', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
