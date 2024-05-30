import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import {authorizationHeaders, authorizationHeaders_test} from '../../../src/api/superfaktura/utils/authorization-headers'

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

    const headers = {
      ...authorizationHeaders(),
      ...authorizationHeaders_test()
    }

    const result = await axios.post(
      API_URL_CREATE,
      'data=' + JSON.stringify(parsedBody),
      { headers }
    )

    res.status(201).json(result.data as unknown)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}


export default create
