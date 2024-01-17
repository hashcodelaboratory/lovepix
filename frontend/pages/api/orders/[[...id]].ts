import { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs } from '@firebase/firestore'
import { database } from '../../../src/common/firebase/config'
import { Collections } from '../../../src/common/firebase/enums'
import { Order } from '../../../src/common/types/order'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const computedId = id?.[0]

    switch (req.method) {
      case 'GET':
        if (!computedId) {
          return res.status(400).json({
            error: BAD_REQUEST_ERROR_MESSAGE,
          })
        } else {
          const querySnapshot = await getDocs(
            collection(database, Collections.ORDERS)
          )

          return res
            .status(200)
            .json([
              ...querySnapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() } as Order))
                .filter((doc) => doc.form.email === computedId),
            ])
        }
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default handler
