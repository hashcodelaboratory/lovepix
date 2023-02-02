import { useQuery, UseQueryResult } from 'react-query'
import { database } from '../../../../common/firebase/config'
import { collection, getDocs } from '@firebase/firestore'
import { Collections } from '../../../../common/firebase/enums'
import { GALLERY_KEY } from './utils/keys'
import { GalleryItem } from '../../../../common/types/order'

const getGallery = async (): Promise<GalleryItem[]> => {
  const querySnapshot = await getDocs(collection(database, Collections.GALLERY))
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as GalleryItem)
  )
}

export const useGallery = (): UseQueryResult<GalleryItem[]> =>
  useQuery([GALLERY_KEY], () => getGallery())
