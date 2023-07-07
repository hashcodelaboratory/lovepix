export type OrderStateMail = {
  id: string
  dest: string[]
  text: string
}

export const sendMailOrderShipped = async (
  orderId: string,
  email: string,
  text: string,
  pdf?: string
) => {
  const body = {
    id: orderId,
    dest: email,
    text: text,
    pdfInvoice: pdf,
  }
  return await fetch('/api/email/sendOrderShipped', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
