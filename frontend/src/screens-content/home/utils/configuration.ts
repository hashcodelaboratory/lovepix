import { Material } from '../../../common/enums/material'

export const dimensionsByWidth = [
  '30 x 20',
  '90 x 60',
  '60 x 40',
  '45 x 30',
  '105 x 70',
  '120 x 80',
  '75 x 50',
  '150 x 100',
]

export const dimensionsByHeight = [
  '20 x 30',
  '30 x 45',
  '40 x 60',
  '50 x 75',
  '60 x 90',
  '80 x 120',
  '70 x 105',
  '100 x 150',
]

export const dimensionsBySquare = ['50 x 50', '80 x 80', '100 x 100', '20 x 20']

export const materials = [
  {
    id: 'm1',
    image:
      'https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/materials%2Fdibond?alt=media&token=f4447146-e623-4fbb-b4e5-97cb8082f9c5',
    name: Material.DIBOND,
  },
  {
    id: 'm2',
    image:
      'https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/materials%2Fcanvas?alt=media&token=18852992-441d-44ce-89c6-5883ee2193da',
    name: Material.CANVAS,
  },
  {
    id: 'm3',
    image:
      'https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/materials%2Facrylate?alt=media&token=25c03132-9fbe-421e-ab43-0a16b4c128f0',
    name: Material.AKRYL,
  },
]
