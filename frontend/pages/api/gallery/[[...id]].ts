import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../../src/common/firebase/config'
import { Collections } from '../../../src/common/firebase/enums'
import { doc, getDoc } from 'firebase/firestore'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query

    if (req.method !== 'GET') {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    if (!id) {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    const docSnapshot = await getDoc(doc(database, Collections.GALLERY, id[0]))

    if (docSnapshot.exists()) {
      return res.status(200).json(docSnapshot.data())
    } else {
      res.status(400).json({
        error: 'No such document!',
      })

      return
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default handler
