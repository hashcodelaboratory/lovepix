import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../../src/common/firebase/config'
import { Collections } from '../../../src/common/firebase/enums'
import { collection, doc, setDoc } from '@firebase/firestore'
import { addDoc } from 'firebase/firestore'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const editVoucher = async (req: NextApiRequest, res: NextApiResponse) => {
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

    await setDoc(doc(database, Collections.VOUCHERS, _body.id), { ..._body })

    return res.status(200).json({
      status: 'success',
    })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default editVoucher
