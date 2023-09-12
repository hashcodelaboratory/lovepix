import { collection, getDocs, query, where } from '@firebase/firestore'
import { database } from '../../../../src/common/firebase/config'
import { Collections } from '../../../../src/common/firebase/enums'
import { NextApiRequest, NextApiResponse } from 'next'
import { Content } from '../../../../src/editable-content/content'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const FILTER_ATTRIBUTE = 'pageId'

const getContent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
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

    const snapshot = await getDocs(
      query(
        collection(database, Collections.CONTENTS),
        where(FILTER_ATTRIBUTE, '==', id.startsWith('/') ? id : `/${id}`)
      )
    )

    if (snapshot.empty) {
      return res.status(404)
    } else {
      const content = snapshot.docs[0]
      if (!content) {
        return res.status(404)
      }

      return res
        .status(200)
        .json({ ...content.data(), id: content.id } as Content)
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default getContent
