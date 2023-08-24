import { doc, updateDoc } from '@firebase/firestore'
import { database } from '../../../src/common/firebase/config'
import { Collections } from '../../../src/common/firebase/enums'
import { NextApiRequest, NextApiResponse } from 'next'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const editMaterial = async (req: NextApiRequest, res: NextApiResponse) => {
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

    await updateDoc(doc(database, Collections.MATERIALS, _body.id), {
      ..._body,
    })

    return res.status(200).json({
      status: 'success',
    })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default editMaterial
