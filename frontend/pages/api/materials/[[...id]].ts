import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from '@firebase/firestore'
import { database } from '../../../src/common/firebase/config'
import { Collections } from '../../../src/common/firebase/enums'
import { NextApiRequest, NextApiResponse } from 'next'
import { getDoc } from 'firebase/firestore'
import { MaterialType } from '../../../src/common/api/use-materials'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const computedId = id?.[0]
    const body = req.body ? await JSON.parse(req.body) : undefined

    switch (req.method) {
      case 'GET':
        if (!computedId) {
          const querySnapshot = await getDocs(
            collection(database, Collections.MATERIALS)
          )

          return res
            .status(200)
            .json([
              ...querySnapshot.docs.map(
                (doc) => ({ id: doc.id, ...doc.data() } as MaterialType)
              ),
            ])
        } else {
          const data = await getDoc(
            doc(database, Collections.MATERIALS, computedId)
          )

          return res.status(200).json(data.data())
        }
      case 'POST':
        if (!body || !computedId) {
          return res.status(400).json({
            error: BAD_REQUEST_ERROR_MESSAGE,
          })
        }

        await updateDoc(doc(database, Collections.MATERIALS, computedId), {
          ...body,
        })

        return res.status(200).json({
          status: 'success',
        })
      case 'PATCH':
        if (!body || !computedId) {
          return res.status(400).json({
            error: BAD_REQUEST_ERROR_MESSAGE,
          })
        }

        await updateDoc(doc(database, Collections.MATERIALS, computedId), {
          ...body,
        })

        return res.status(200).json({
          status: 'success',
        })
      case 'DELETE':
        if (!computedId) {
          return res.status(400).json({
            error: BAD_REQUEST_ERROR_MESSAGE,
          })
        } else {
          await deleteDoc(doc(database, Collections.MATERIALS, computedId))

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
