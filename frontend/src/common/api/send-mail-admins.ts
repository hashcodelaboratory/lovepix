export type AdminEmail = {
  id: string
  dest: string[]
}

export const sendOrderMailtoAdmin = async (orderId: string) => {
  const body = {
    id: orderId,
    dest: ['davidbednarik07@gmail.com'],
  }
  return await fetch('/api/email/sendToAdmin', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
