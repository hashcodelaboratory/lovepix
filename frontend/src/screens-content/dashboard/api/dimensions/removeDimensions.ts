import { QueryClient } from 'react-query'
import { database } from '../../../../common/firebase/config'
import { deleteDoc, doc } from '@firebase/firestore'
import { Collections } from '../../../../common/firebase/enums'
import { DIMENSIONS_KEY } from '../../../../common/api/use-dimensions'

export const removeDimensions = async (
  selectedRows: string[],
  queryClient: QueryClient
) => {
  for (const row of selectedRows) {
  }

  const promises: Promise<void>[] = selectedRows.reduce(
    (acc: Promise<void>[], name: string) => [
      ...acc,
      ...[deleteDoc(doc(database, Collections.DIMENSIONS, `DIM-${name}`))],
    ],
    []
  )

  await Promise.all(promises)
  await queryClient.invalidateQueries(DIMENSIONS_KEY)
}
