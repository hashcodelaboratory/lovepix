import { Skeleton } from '@mui/material'
import React from 'react'
import styles from './item-skeleton.module.scss'

const ItemSkeleton = () => {
  return (
    <div className={styles.itemSkeletonContainer}>
      <Skeleton
        className={styles.image}
        sx={{ height: 300, width: 300 }}
        animation='wave'
        variant='rectangular'
      />
      <div className={styles.description}>
        <Skeleton
          animation='wave'
          height={50}
          width='80%'
          className={styles.title}
        />
        <Skeleton
          animation='wave'
          height={20}
          width='40%'
          className={styles.price}
        />
      </div>
    </div>
  )
}

export default ItemSkeleton
