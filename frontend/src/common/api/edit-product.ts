import { MutationOptions, useMutation, UseMutationResult } from 'react-query'
import { database } from '../firebase/config'
import { doc, writeBatch } from '@firebase/firestore'
import { Collections } from '../firebase/enums'
import { FormAddProduct } from '../types/form-add-product'

export type UpdateProductRequest = {
  id: string
  data: FormAddProduct
}

const updateProduct = async (params: UpdateProductRequest) => {
  const { data, id } = params
  const batch = writeBatch(database)

  if (id) {
    const docRef = doc(database, Collections.PRODUCTS, id)
    await batch.update(docRef, {
      ...data,
    })

    await batch.commit()

    return { message: 'Updated' }
  }
  return { error: 'Not updated' }
}

export const useUpdateProduct = (
  options?: MutationOptions<any, any, UpdateProductRequest>
): UseMutationResult<any, any, UpdateProductRequest> =>
  useMutation(updateProduct, options)
