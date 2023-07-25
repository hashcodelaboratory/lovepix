import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../../src/common/firebase/config'
import { Collections } from '../../../src/common/firebase/enums'
import { collection, doc, getDocs } from '@firebase/firestore'
import { getDoc, query, where } from 'firebase/firestore'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'
const NOT_FOUND_ERROR_MESSAGE = 'No such document!'

const voucherDetail = async (req: NextApiRequest, res: NextApiResponse) => {
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

    const q = query(
      collection(database, Collections.VOUCHERS),
      where('code', '==', _body.id)
    )

    const voucherSnap = await getDocs(q)

    if (voucherSnap.empty) {
      return res.status(404).json({
        error: NOT_FOUND_ERROR_MESSAGE,
      })
    } else {
      voucherSnap.forEach((doc) => {
        return res.status(200).json({ ...doc.data(), id: doc.id })
      })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default voucherDetail
