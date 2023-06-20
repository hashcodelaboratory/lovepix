import { Material } from 'common/enums/material'

export type Image = {
  name: string
  url: string
  width: number
  height: number
  qty: number
  origin: string
  material: Material
  price: number
  pdf?: string
}
