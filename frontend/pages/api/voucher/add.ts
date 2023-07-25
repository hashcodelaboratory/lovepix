import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../../src/common/firebase/config'
import { Collections } from '../../../src/common/firebase/enums'
import { collection, doc, setDoc } from '@firebase/firestore'
import { addDoc } from 'firebase/firestore'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'
const NOT_CREATED_ERROR_MESSAGE = 'Document not created!'

const addVoucher = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })
    }

    if (!req.body) {
      return res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })
    }

    const _body = await JSON.parse(req.body)

    if (!_body) {
      return res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })
    }

    const voucherRef = await addDoc(
      collection(database, Collections.VOUCHERS),
      { ..._body }
    )

    if (voucherRef) {
      return res.status(200).json({
        status: 'success',
      })
    } else {
      return res.status(404).json({ error: NOT_CREATED_ERROR_MESSAGE })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default addVoucher
