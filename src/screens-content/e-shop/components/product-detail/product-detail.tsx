import { Button, Container } from '@mui/material'
import { useProduct } from 'common/api/use-product'
import Image from 'next/image'
import React from 'react'
import { ImageLayout } from 'screens-content/home/enums/enums'
import InfoPanel from './info-panel/info-panel'
import styles from './product-detail.module.scss'

type ProductID = {
  id: string
}

const ProductDetail = ({ id }: ProductID) => {
  const { data: product, isLoading } = useProduct(id)
  const { image, title, price, count } = product ?? {}

  return (
    <Container className={styles.productDetailContainer}>
      <div className={styles.detailLayout}>
        <Image
          src={image ?? ''}
          layout={ImageLayout.INTRINSIC}
          width={400}
          height={400}
          alt='image'
          className={styles.image}
        />
        <div className={styles.productInfo}>
          <span className={styles.title}>{title}</span>
          <div className={styles.price}>
            {price?.toFixed(2)} € <span className={styles.withTax}>s DPH</span>
          </div>
          <div className={styles.count}>Na sklade {count} ks</div>
          <Button variant='outlined' fullWidth className={styles.button}>
            Pridať do košíka
          </Button>
        </div>
        <div>
          <InfoPanel />
        </div>
      </div>
    </Container>
  )
}

export default ProductDetail
