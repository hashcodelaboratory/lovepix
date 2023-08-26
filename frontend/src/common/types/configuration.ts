import { Material } from '../enums/material'

export type Configuration = {
  dimensionId: string
  image: string
  material: Material
  origin: string
  galleryItemId?: string
}

export type ImageUpdateType = {
  origin: string,
  galleryItemId?: string
}