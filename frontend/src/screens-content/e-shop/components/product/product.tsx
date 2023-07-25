import { ProductsType } from 'common/api/use-products-by-category'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './product.module.scss'

type ProductContent = {
  product: ProductsType
}

const Product = ({ product }: ProductContent) => {
  const router = useRouter()
  const { id, title, price, image, description } = product

  const goTo = () => router.push(`/product/${id}`)

  return (
    <div className={styles.productCart}>
      <img
        src={image}
        alt={title}
        style={{ maxWidth: 300 }}
        className={styles.image}
        onClick={goTo}
      />
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
      <span className={styles.price}>{price?.toFixed(2) ?? '-'} €</span>
    </div>
  )
}

export default Product
