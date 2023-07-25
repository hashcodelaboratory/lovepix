import { NextApiRequest, NextApiResponse } from 'next'
import { getDocs } from 'firebase/firestore'
import { database } from '../../../src/common/firebase/config'
import { Collections } from '../../../src/common/firebase/enums'
import { collection, query } from '@firebase/firestore'
import { CategoryType } from '../../../src/common/api/use-categories'

const voucherlist = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const q = query(collection(database, Collections.VOUCHERS))
    const docsSnapshot = await getDocs(q)
    if (docsSnapshot.docs) {
      return res
        .status(200)
        .json(
          docsSnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as CategoryType)
          )
        )
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

export default voucherlist
