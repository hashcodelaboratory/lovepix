import { doc, setDoc } from '@firebase/firestore'
import { database } from '../../../../src/common/firebase/config'
import { Collections } from '../../../../src/common/firebase/enums'
import { NextApiRequest, NextApiResponse } from 'next'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const addDimension = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })
    }

    const { id } = req.query

    if (!id) {
      return res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })
    }

    if (typeof id !== 'string') {
      return res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })
    }

    const body = await JSON.parse(req.body)

    if (!body) {
      return res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })
    }

    const { content } = body

    if (!content) {
      return res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })
    }

    await setDoc(doc(database, Collections.DIMENSIONS, id), {
      content,
    })

    return res.status(200).json({
      status: 'success',
    })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default addDimension
