//sandbox.superfaktura
// const API_URL = 'https://sandbox.superfaktura.sk'
// const AUTH_EMAIL = 'info@lovepix.sk'
// const AUTH_API_KEY = 'f1jujTNlZfVIMlJsG3aZJgeyS13UTFIa'
// const AUTH_COMPANY_ID = '1011'
// const AUTH_MODULE = 'MyCustomModule'

//moja.superfaktura
const API_URL = 'https://moja.superfaktura.sk'
const AUTH_EMAIL = 'info@lovepix.sk'
const AUTH_API_KEY = 'rlmMjO7gK0D3lUrpuCwCJ0zoUvSjq8Ye'
const AUTH_COMPANY_ID = '94061'
const AUTH_MODULE = 'MyCustomModule'

// Authorization header
// Please notice Content-Type
// And all parameters in Authorization
const config = {
  headers: {
    Authorization: `SFAPI email=${AUTH_EMAIL}&apikey=${AUTH_API_KEY}&company_id=${AUTH_COMPANY_ID}&module=${AUTH_MODULE}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  },
}

// In this example we will first create our client
// This is necessary only the first time
const clientBody = {
  Client: {
    name: '9BUJCgzB3v91',
    ico: '0PAWHrujhYor',
  },
}

// Invoice body
// Notice we are sending ICO of existing client
const invoiceBody = {
  checksum: '789456',
  Invoice: {
    name: 'Test API',
  },
  InvoiceItem: [
    {
      description: 'description of item 1',
      name: 'item 1',
      tax: 20,
      unit_price: 10,
    },
  ],
  Client: {
    name: 'dxftaL1et7Zw',
    ico: '0PAWHrujhYor',
  },
}

const invocieTest = {
  Invoice: {
    created: '2023-06-23',
    delivery: '2023-06-23',
    due: '2023-06-23',
    constant: '0308',
    already_paid: 1,
    sequence_id: '',
  },
  InvoiceItem: [
    {
      description: 'TEST',
      tax: 20,
      quantity: 1,
      unit: 'ks',
      unit_price: 12.5,
    },
  ],
  Client: {
    ico: '52890406',
    name: 'Bc. Michal Dzurilla',
  },
}

export const createInvoice = async () => {
  console.log('✅', `data= + ${JSON.stringify(invocieTest)}`)
  // First let's create our client
  // Please notice how data is sent.
  // Don't send pure JSON.
  await fetch(`${API_URL}/invoices/create`, {
    method: 'POST',
    redirect: 'follow',
    headers: {
      Authorization: `SFAPI email=${AUTH_EMAIL}&apikey=${AUTH_API_KEY}&company_id=${AUTH_COMPANY_ID}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: 'data=' + JSON.stringify(invocieTest),
  })
    .then((result) => {
      //   await fetch(`${API_URL}/api_logs/getResponseByChecksum/789456`, {
      //     method: 'GET',
      //     mode: 'no-cors',
      //     headers: {
      //       Authorization: `SFAPI email=${AUTH_EMAIL}&apikey=${AUTH_API_KEY}company_id=${AUTH_COMPANY_ID}`,
      //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //     },
      //   }).then((res) => {
      //     console.log('✅', res)
      //   })
      console.debug(result.text())

      // Once your client is created, it's enough to send this request to create invoice
      //
      // Please notice how data is sent.
      // Don't send pure JSON.
    })
    .catch((err) => {
      console.error(err)
    })
}
