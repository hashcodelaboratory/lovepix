import { QueryClient } from 'react-query'
import { database } from '../../../../common/firebase/config'
import { deleteDoc, doc } from '@firebase/firestore'
import { Collections } from '../../../../common/firebase/enums'
import { DIMENSIONS_KEY } from '../../../../common/api/use-dimensions'

export const removeDimensions = async (
  selectedRows: string[],
  queryClient: QueryClient
) => {
  const promises: Promise<void>[] = selectedRows.reduce(
    (acc: Promise<void>[], id: string) => [
      ...acc,
      ...[deleteDoc(doc(database, Collections.DIMENSIONS, id))],
    ],
    []
  )

  await Promise.all(promises)
  await queryClient.invalidateQueries(DIMENSIONS_KEY)
}
