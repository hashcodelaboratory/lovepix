import jsPDF from 'jspdf'
import { Image as ImageType } from '../../../../../../../common/types/image'
import { Material } from '../../../../../../../common/enums/material'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { database, storage } from '../../../../../../../common/firebase/config'
import { doc as document, writeBatch } from '@firebase/firestore'
import { Collections } from '../../../../../../../common/firebase/enums'
import { StorageFolder } from '../../../../../../../common/firebase/storage/enums'

const getX = (material: Material) => {
  switch (material) {
    case Material.CANVAS:
      return 5
    default:
      return 0
  }
}

const getY = (material: Material) => {
  switch (material) {
    case Material.CANVAS:
      return 5
    default:
      return 0
  }
}

const formatX = (material: Material, width: number) => {
  switch (material) {
    case Material.CANVAS:
      return width + 10
    default:
      return width + 1
  }
}

const formatY = (material: Material, height: number) => {
  switch (material) {
    case Material.CANVAS:
      return height + 10
    default:
      return height + 1
  }
}

const getWidth = (material: Material, width: number) => {
  switch (material) {
    case Material.CANVAS:
      return width
    default:
      return width + 1
  }
}

const getHeight = (material: Material, height: number) => {
  switch (material) {
    case Material.CANVAS:
      return height
    default:
      return height + 1
  }
}

export const generatePdf = async (
  images: ImageType[],
  index: number,
  upload: ImageType,
  id: string
) => {
  const { url, width, height, material } = upload

  const image = new Image()
  image.src = url

  const doc = new jsPDF({
    orientation: width >= height ? 'landscape' : 'portrait',
    unit: 'cm',
    format: [formatX(material, width), formatY(material, height)],
  })

  doc.deletePage(1)
  doc.addPage()
  doc.addImage(
    image,
    'jpeg',
    getX(material),
    getY(material),
    getWidth(material, width),
    getHeight(material, height)
  )

  const pdfURL = doc.output('bloburl')
  window.open(pdfURL as any, '_blank')

  const uploadURL = `${StorageFolder.ORDERS}/${id}/images/${id}_${width}x${height}_${upload.qty}`

  const res = await fetch(pdfURL ?? '')
  const file = await res.blob()

  const storageRef = ref(storage, uploadURL)

  const {
    metadata: { name },
  } = await uploadBytes(storageRef, file)
  if (name) {
    images[index].pdf = await getDownloadURL(
      ref(storage, `${StorageFolder.ORDERS}/${id}/images/${name}`)
    )

    const batch = writeBatch(database)
    const docRef = document(database, Collections.ORDERS, id)
    await batch.update(docRef, {
      shoppingCart: {
        images: images,
      },
    })

    await batch.commit()
  }
}
