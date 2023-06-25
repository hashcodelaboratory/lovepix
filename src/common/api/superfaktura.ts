import dayjs from 'dayjs'

export const addInvoice = async (invoice: any) => {
  return await fetch(
    'https://us-central1-waller-development.cloudfunctions.net/createInvoice',
    {
      method: 'POST',
      body: JSON.stringify(invoice),
    }
  )
}
