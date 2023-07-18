import { ProductsType } from 'common/api/use-products'
import { database } from 'common/firebase/config'
import { Collections } from 'common/firebase/enums'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { UseQueryResult } from 'react-query'

const useFilteredProducts = (category: string | null) => {
  const [products, setProducts] = useState<ProductsType[] | undefined>()

  const getProducts = async () => {
    const allProducts = collection(database, Collections.PRODUCTS)
    const filteredProducts = query(
      collection(database, Collections.PRODUCTS),
      where('category', '==', category)
    )
    const option = category !== null ? filteredProducts : allProducts
    const querySnapshot = await getDocs(option)
    const productArray = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as ProductsType)
    )
    setProducts(productArray)
  }

  useEffect(() => {
    getProducts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  return { products, getProducts }
}

export default useFilteredProducts
