import { Material } from '../enums/material'

export const getMaterialId = (param: Material) => {
  switch (param) {
    case Material.CANVAS:
      return 'm2'
    case Material.POSTER:
      return 'm4'
    case Material.DIBOND:
      return 'm1'
    case Material.ACRYLIC:
      return 'm3'
  }
}
