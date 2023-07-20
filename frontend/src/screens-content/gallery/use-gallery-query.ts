import {useMemo} from "react";
import {useRouter} from "next/router";

export const useGalleryQuery = () => {
  const router = useRouter()

  return useMemo(() => {
    const {query} = router;
    if (!query) {
      return undefined
    }

    const {category} = query as { category: string | undefined }

    return category
  }, [router.query])
}