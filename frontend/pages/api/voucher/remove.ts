import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../../src/common/firebase/config'
import { Collections } from '../../../src/common/firebase/enums'
import { deleteDoc, doc } from '@firebase/firestore'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const removeVouchers = async (req: NextApiRequest, res: NextApiResponse) => {
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

    const { ids } = _body

    const promises: Promise<void>[] = ids.reduce(
      (acc: Promise<void>[], id: string) => [
        ...acc,
        ...[deleteDoc(doc(database, Collections.VOUCHERS, id))],
      ],
      []
    )

    const allPromises = await Promise.all(promises)

    if (allPromises) {
      return res.status(200).json({
        status: 'success',
      })
    } else {
      res.status(400).json({
        error: 'No such documents!',
      })

      return
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default removeVouchers
