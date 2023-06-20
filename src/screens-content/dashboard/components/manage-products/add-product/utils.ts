import { PRODUCT_KEY } from 'common/api/use-products'
import { StorageFolder } from 'common/firebase/storage/enums'
import { QueryClient } from 'react-query'
import * as yup from 'yup'
import { FormAddProduct } from './add-product'
import {
  FullMetadata,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@firebase/storage'
import { database, storage } from 'common/firebase/config'
import { doc, setDoc } from 'firebase/firestore'
import { Collections } from 'common/firebase/enums'

export const FORM_SCHEMA = yup
  .object({
    title: yup.string().required('titleValidation'),
    price: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required('priceValidation'),
    description: yup.string().required('descriptionValidation'),
    count: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required('countValidation'),
  })
  .required()

const uploadToStorage = async (file: File) => {
  const _name = `${StorageFolder.PRODUCTS}/${file.name}`
  const imageRef = ref(storage, _name)
  const { metadata } = await uploadBytes(imageRef, file)
  if (metadata) {
    const url = await getDownloadURL(ref(storage, _name))
    return {
      url: url,
      metadata: metadata,
    }
  }
}

const uploadToFirestore = async (
  metadata: FullMetadata,
  data: FormAddProduct,
  url: string
) => {
  const { name } = metadata
  const docData = {
    title: data.title,
    price: data.price,
    description: data.description,
    count: data.count,
    image: url,
    path: name,
  }
  await setDoc(doc(database, Collections.PRODUCTS, `P${Date.now()}`), docData)
}

export const addPhoto = async (
  data: FormAddProduct,
  image: File | undefined,
  queryClient: QueryClient
) => {
  if (image) {
    const res = await uploadToStorage(image)
    await uploadToFirestore(
      res?.metadata ?? ({} as FullMetadata),
      data,
      res?.url ?? ''
    )
    await queryClient.invalidateQueries(PRODUCT_KEY)
  }
}
