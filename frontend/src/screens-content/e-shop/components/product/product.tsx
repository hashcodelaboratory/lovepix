import { useRouter } from 'next/router'
import React from 'react'
import styles from './product.module.scss'
import { ProductsType } from 'common/api/use-products'

type ProductContent = {
  product: ProductsType
}

const Product = ({ product }: ProductContent) => {
  const router = useRouter()
  const { id, title, price, image, description } = product

  const goTo = () => router.push(`/${id}`)

  return (
    <div className={styles.previewProduct}> 
      <img
        src={image}
        alt={title}
        style={{ maxWidth: 300, height: 300 }}
        className={styles.image}
        onClick={goTo}
      />
      <div className={styles.previewImageDescription}>
        <p className={styles.productTitle}>{title}</p>
        <p className={styles.price}>{price?.toFixed(2) ?? '-'} €</p>
      </div>
    </div>
  )
}

export default Product
