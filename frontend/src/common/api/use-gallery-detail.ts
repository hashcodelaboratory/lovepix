import { useQuery } from 'react-query'

const getGalleryDetail = async (id?: string) => {
  const res = await fetch('/api/gallery/item-detail', {
    method: 'POST',
    body: JSON.stringify({ id: id }),
  })
  return res.json()
}

export const useGalleryDetail = (id?: string) =>
  useQuery({
    queryKey: ['GALLERY_DETAIL'],
    queryFn: () => getGalleryDetail(id),
    enabled: id !== undefined,
  })
