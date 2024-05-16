import { PRODUCT_KEY } from '../../../../../../../common/api/use-products'
import { QueryClient } from 'react-query'
import * as yup from 'yup'
import { FullMetadata } from '@firebase/storage'
import { FormAddProduct } from '../../../../../../../common/types/form-add-product'
import { addProduct } from '../../../../../../../common/api/add-product'
import { uploadToStorage } from '../../../../../../../common/api/add-product-photo'

export const addProductValues = {
  title: '',
  price: undefined,
  count: undefined,
  description: '',
}

export const FORM_SCHEMA = yup
  .object({
    title: yup.string().required('Názov je povinný údaj.'),
    price: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required('Cena je povinný údaj.'),
    description: yup.string().required('Popis je povinný údaj.'),
    count: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required('Počet je povinný údaj.'),
    category: yup.string().required('Kategória je povinný údaj.'),
  })
  .required()

const uploadToFirestore = async (
  metadata: FullMetadata,
  data: FormAddProduct,
  url: string
) => {
  const { name } = metadata
  const params = {
    data: data,
    url: url,
    name: name,
  }
  await addProduct(params)
}

export const uploadProduct = async (
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
