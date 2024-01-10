import { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs } from '@firebase/firestore'
import { database } from 'common/firebase/config'
import { Collections } from 'common/firebase/enums'
import { GalleryItem } from '../../../../src/common/types/gallery'
import { doc, updateDoc } from 'firebase/firestore'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

export type Image = {
  url: string
  bucketName: string
  objectKey: string
}

export type Output = {
  objectKey: string
  originImageUrl: string | null
  webp1kbHighEndImageUrl: string | null
  webpHighEndImageUrl: string | null
}

const BUCKET_NAME = 'lovepix'

const migrateGallery = async (
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) => {
  try {
    if (req.method !== 'POST') {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    const galleryItemsSnapshot = await getDocs(
      collection(database, Collections.GALLERY)
    )

    const galleryItems = galleryItemsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as GalleryItem)
    )

    const output: Output[] = await Promise.all(
      galleryItems.map(({ id, url }) => ({
        objectKey: '',
        originImageUrl: '',
        webp1kbHighEndImageUrl: '',
        webpHighEndImageUrl: '',
      }))
    )

    await Promise.all(
      output.map(
        ({ objectKey, webp1kbHighEndImageUrl, webpHighEndImageUrl }: Output) =>
          updateDoc(doc(collection(database, Collections.GALLERY), objectKey), {
            webp1kbHighEndImageUrl:
              webp1kbHighEndImageUrl?.split('?')[0] ?? null,
            webpHighEndImageUrl: webpHighEndImageUrl?.split('?')[0] ?? null,
          })
      )
    )

    return res.status(200).json('DONE')
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default migrateGallery
