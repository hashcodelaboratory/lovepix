import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../../../src/common/firebase/config'
import { Collections } from '../../../../src/common/firebase/enums'
import { doc, updateDoc } from 'firebase/firestore'

const editOrderState = async (req: NextApiRequest, res: NextApiResponse) => {
  const _body = await JSON.parse(req.body)

  try {
    if (!req.body) {
      res.status(400).json({
        error: 'Wrong request body!',
      })
      return
    } else {
      const { orderId, orderState } = _body
      await updateDoc(doc(database, Collections.ORDERS, orderId), {
        orderState: [...orderState],
      })
      return res.status(200).json({ status: 'success' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default editOrderState
