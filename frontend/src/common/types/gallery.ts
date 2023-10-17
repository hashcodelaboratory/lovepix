export type GalleryItem = {
  id: string
  bucket: string
  contentType: string
  fullPath: string
  name: string
  size: number
  timeCreated: string
  updated: string
  url: string
  webp1kbHighEndImageUrl: string | null
  webpHighEndImageUrl: string | null
  price: number
  dimensions: string[]
  categories: string[]
}
