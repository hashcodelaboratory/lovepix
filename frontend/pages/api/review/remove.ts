import { BAD_REQUEST_ERROR_MESSAGE } from '../../../src/api/email/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteDoc, doc } from 'firebase/firestore'
import { database } from 'common/firebase/config'
import { Collections } from 'common/firebase/enums'

const remove = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
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

    await deleteDoc(doc(database, Collections.REVIEWS, _body))
    return res.status(200).json({
      status: 'success',
    })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
export default remove
