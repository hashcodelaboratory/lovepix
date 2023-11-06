import { useQuery, UseQueryOptions } from 'react-query'

const getGalleryDetail = async (id?: string) => {
  const res = await fetch(`/api/gallery/${id}`, {
    method: 'GET',
  })
  return res.json()
}

export const useGalleryDetail = (
  id?: string,
  options?: UseQueryOptions<any, any, any, any>
) =>
  useQuery({
    ...options,
    queryKey: ['GALLERY_DETAIL'],
    queryFn: () => getGalleryDetail(id),
  })
