import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'
import { doc, setDoc } from 'firebase/firestore'
import { FormAddProduct } from 'common/types/form-add-product'

export const ADD_PRODUCT_KEY = 'ADD_PRODUCTS'

type AddProductType = {
  data: FormAddProduct
  url: string
  name: string
}

export const addProduct = async (params: AddProductType) => {
  const { data, url, name } = params
  const docData = {
    category: data.category,
    title: data.title,
    price: data.price,
    description: data.description,
    count: data.count,
    image: url,
    path: name,
  }
  const documentId = data.title
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

  await setDoc(doc(database, Collections.PRODUCTS, documentId), docData)
}

//TODO: use when BE ready
// export const useAddProducts = (docData: any): UseQueryResult<any[]> =>
//   useQuery([ADD_PRODUCT_KEY], () => addProduct(docData))
