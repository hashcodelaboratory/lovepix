import { SFInvoice } from 'common/types/superfaktura'

export const addInvoice = async (invoice: SFInvoice) => {
  return await fetch(
    'https://us-central1-waller-development.cloudfunctions.net/createInvoice',
    {
      method: 'POST',
      body: JSON.stringify(invoice),
    }
  )
}
