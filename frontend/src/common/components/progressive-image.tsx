import React from 'react'
import { ImageLayout } from '../../screens-content/home/enums/enums'
import styles from './progressive-image.module.scss'

type ProgressiveImageProps = {
  image?: string
  placeholder?: string
  width?: number
  height?: number
  layout?: ImageLayout
}

const ProgressiveImage = ({ image }: ProgressiveImageProps) => {
  return (
    <div className={styles.imageWrapper}>
      <img
        placeholder='blur'
        src={image ?? ''}
        alt='image'
        className={styles.image}
      />
    </div>
  )
}

export default ProgressiveImage
