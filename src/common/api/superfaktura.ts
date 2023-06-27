import { SFInvoice } from 'common/types/superfaktura'

export const createInvoice = async (invoice: SFInvoice) => {
  return await fetch('/api/superfaktura/create', {
    method: 'POST',
    body: JSON.stringify(invoice),
  })
}
