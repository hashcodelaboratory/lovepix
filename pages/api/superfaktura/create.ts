import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const API_URL_CREATE = 'https://moja.superfaktura.sk/invoices/create'
const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const create = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  try {
    if (req.method !== 'POST') {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    if (!req.body) {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    const parsedBody = JSON.parse(req.body)

    if (!parsedBody) {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    const config = {
      headers: {
        Authorization: `SFAPI email=${process.env.NEXT_PUBLIC_AUTH_EMAIL}&apikey=${process.env.NEXT_PUBLIC_AUTH_API_KEY}&company_id=${process.env.NEXT_PUBLIC_AUTH_COMPANY_ID}&module=${process.env.NEXT_PUBLIC_AUTH_MODULE}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }

    const result = await axios.post(
      API_URL_CREATE,
      'data=' + JSON.stringify(parsedBody),
      config
    )

    res.status(201).json(result.data as unknown)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default create
