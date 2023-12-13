export type AdminEmail = {
  id: string
  dest: string[]
}

export const sendOrderMailtoAdmin = async (orderId: string) => {
  const body = {
    id: orderId,
    dest: ['davidbednarik07@gmail.com', 'info@lovepix.sk'],
  }
  return await fetch('/api/email/send-to-admin', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
