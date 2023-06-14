import { Button, Container } from '@mui/material'
import { useProduct } from 'common/api/use-product'
import Image from 'next/image'
import React, { useState } from 'react'
import { ImageLayout } from 'screens-content/home/enums/enums'
import InfoPanel from './info-panel/info-panel'
import styles from './product-detail.module.scss'

type ProductID = {
  id: string
}

const ProductDetail = ({ id }: ProductID) => {
  const { data: product, isLoading } = useProduct(id)
  const { image, title, price, count, description } = product ?? {}
  const [quantity, setQuantity] = useState(1)

  const counterContent = (
    <div className={styles.counterContainer}>
      <div className={styles.counter}>
        <div className={styles.minus}>-</div>
        <div>{quantity}</div>
        <div className={styles.plus}>+</div>
      </div>
    </div>
  )

  return (
    <Container className={styles.productDetailContainer}>
      <div className={styles.detailLayout}>
        <Image
          src={image ?? ''}
          layout={ImageLayout.INTRINSIC}
          width={600}
          height={500}
          alt='image'
          className={styles.image}
          loading='lazy'
        />
        <hr />
        <div className={styles.productInfo}>
          <span className={styles.title}>{title}</span>
          <div className={styles.description}>{description}</div>
          <div className={styles.price}>
            {price?.toFixed(2)} € <span className={styles.withTax}>s DPH</span>
          </div>
          {counterContent}
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
