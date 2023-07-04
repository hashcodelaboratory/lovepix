export type AdminEmail = {
  id: string
  dest: string[]
}

export const sendOrderMailtoAdmin = async () => {
  const body = {
    id: 'unknown',
    dest: ['davidbednarik07@gmail.com'],
  }
  return await fetch('/api/email/sendToAdmin', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
