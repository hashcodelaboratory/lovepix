import { useRouter } from 'next/router'
import React from 'react'
import styles from './product.module.scss'
import { ProductsType } from 'common/api/use-products'
import ProgressiveImage from '../../../../common/components/progressive-image'
import { ImageLayout } from '../../../home/enums/enums'

type ProductContent = {
  product: ProductsType
  width?: number
  height?: number
  layout?: ImageLayout
}

const Product = ({ product, width, height, layout }: ProductContent) => {
  const router = useRouter()
  const {
    id,
    title,
    price,
    webp1kbHighEndImageUrl,
    webpHighEndImageUrl,
    image,
  } = product

  const goTo = () => router.push(`/${id}`)

  return (
    <div className={styles.previewProduct} onClick={goTo}>
      <ProgressiveImage
        image={webpHighEndImageUrl ?? image}
        placeholder={webp1kbHighEndImageUrl ?? ''}
        width={width}
        height={height}
        layout={layout}
      />
      <div className={styles.previewImageDescription}>
        <p className={styles.productTitle}>{title}</p>
        <p className={styles.price}>{price?.toFixed(2) ?? '-'} €</p>
      </div>
    </div>
  )
}

export default Product
