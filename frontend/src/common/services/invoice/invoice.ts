import { createInvoice } from '../../api/superfaktura'
import { invoice } from '../../../screens-content/shopping-cart/components/summary/summary/utils'
import { Order } from '../../types/order'

class InvoiceService {
  public createInvoice = async (order: Order) => {
    const response = await createInvoice(invoice(order.id, order))

    if (response.ok) {
      const res = await response.json()
      const id = res.data?.Invoice.id
      const token = res.data?.Invoice.token
      return `https://moja.superfaktura.sk/slo/invoices/pdf/${id}/token:${token}/signature:1/bysquare:1`
    } else {
      return null
    }
  }
}

export const invoiceService = new InvoiceService()
