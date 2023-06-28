export const sendOrderMailtoAdmin = async () => {
  const body = {
    id: 'unknown',
    dest: ['davidbednarik07@gmail.com', 'zmudapavol@gmail.com'],
  }
  return await fetch('/api/order-email-admin/create', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
