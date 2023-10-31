import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from '@firebase/firestore'
import { database } from '../../../src/common/firebase/config'
import { Collections } from '../../../src/common/firebase/enums'
import { NextApiRequest, NextApiResponse } from 'next'
import { DimensionType } from '../../../src/common/api/use-dimensions'
import { getDoc } from 'firebase/firestore'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query

    if (!id) {
      if (req.method === 'GET') {
        const querySnapshot = await getDocs(
          collection(database, Collections.DIMENSIONS)
        )

        return res
          .status(200)
          .json([
            ...querySnapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as DimensionType)
            ),
          ])
      }
    } else {
      const body = await JSON.parse(req.body)

      const computedId = id.length ? id[0] : id

      if (typeof computedId !== 'string') {
        return res.status(400).json({
          error: BAD_REQUEST_ERROR_MESSAGE,
        })
      }

      if (!body) {
        return res.status(400).json({
          error: BAD_REQUEST_ERROR_MESSAGE,
        })
      }

      // DETAIL
      if (req.method === 'GET') {
        const data = await getDoc(
          doc(database, Collections.DIMENSIONS, computedId)
        )

        return res.status(200).json(data.data())
      }

      // CREATE
      if (req.method === 'POST') {
        await setDoc(doc(database, Collections.DIMENSIONS, computedId), {
          ...body,
        })

        return res.status(200).json({
          status: 'success',
        })
      }

      // UPDATE
      if (req.method === 'PUT') {
        await updateDoc(doc(database, Collections.DIMENSIONS, computedId), {
          ...body,
        })

        return res.status(200).json({
          status: 'success',
        })
      }
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default handler
