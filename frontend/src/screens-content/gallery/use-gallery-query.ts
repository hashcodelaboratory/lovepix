import { useMemo } from 'react'
import { useRouter } from 'next/router'

export type GalleryQueryType = { category?: string }

export const useGalleryQuery = () => {
  const router = useRouter()

  return useMemo(() => {
    const { query } = router
    if (!query) {
      return undefined
    }

    const { category } = query as GalleryQueryType
    return category
  }, [router])
}
