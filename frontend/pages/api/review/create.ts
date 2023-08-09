import { BAD_REQUEST_ERROR_MESSAGE } from '../../../src/api/email/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { database } from 'common/firebase/config'
import { Collections } from 'common/firebase/enums'

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

    const _body = await JSON.parse(req.body)

    if (!_body) {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    // returning result

    const responseReview = await addDoc(
      collection(database, Collections.REVIEWS),
      _body
    )
    if (responseReview) {
      return res.status(200).json({
        status: 'success',
      })
    } else {
      return res.status(404).json({
        status: 'not found',
      })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
export default create
