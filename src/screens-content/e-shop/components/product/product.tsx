import { ProductsType } from 'common/api/use-products'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { ImageLayout } from 'screens-content/home/enums/enums'
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
      <Image
        src={image}
        width={200}
        height={300}
        alt='image'
        className={styles.image}
        onClick={goTo}
        blurDataURL='URL'
        placeholder='blur'
      />
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
      <span className={styles.price}>{price?.toFixed(2) ?? '-'} €</span>
    </div>
  )
}

export default Product
