type Invoice = {
  created: string
  delivery: string
  due: string
}

export type InvoiceItem = {
  unit_price: number
  description: string
  quantity: number
  unit: string
}

type Client = {
  name: string
  address: string
  city: string
}

export type SFInvoice = {
  Invoice: Invoice
  InvoiceItem: InvoiceItem[]
  Client: Client
}
