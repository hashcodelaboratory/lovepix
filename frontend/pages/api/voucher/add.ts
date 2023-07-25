import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../../src/common/firebase/config'
import { Collections } from '../../../src/common/firebase/enums'
import { doc, setDoc } from '@firebase/firestore'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const addVoucher = async (req: NextApiRequest, res: NextApiResponse) => {
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

    const _body = await JSON.parse(req.body)

    if (!_body) {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    const voucherRef = doc(database, Collections.VOUCHERS, _body.code)
    await setDoc(voucherRef, { ..._body })

    return res.status(200).json({
      status: 'success',
    })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default addVoucher
