import { Skeleton } from '@mui/material'
import React from 'react'
import styles from './product-skeleton.module.scss'

const ProductSkeleton = () => {
  return (
    <div className={styles.productSkeletonContaine}>
      <Skeleton sx={{ height: 190 }} animation='wave' variant='rectangular' />
      <Skeleton
        animation='wave'
        height={20}
        width='80%'
        style={{ marginTop: 20 }}
      />
      <Skeleton
        animation='wave'
        height={20}
        width='40%'
        style={{ marginTop: 20 }}
      />
      <Skeleton
        animation='wave'
        height={60}
        width='100%'
        style={{ marginTop: 20 }}
      />
    </div>
  )
}

export default ProductSkeleton
