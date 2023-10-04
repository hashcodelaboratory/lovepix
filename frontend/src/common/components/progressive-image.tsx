import { default as ReactProgressiveGracefulImage } from 'react-progressive-graceful-image'
import React from 'react'
import styles from '../../screens-content/home/home.module.scss'

type ProgressiveImageProps = {
  image?: string
  placeholder?: string
}

const ProgressiveImage = ({ image, placeholder }: ProgressiveImageProps) => {
  return (
    // @ts-ignore*/
    <ReactProgressiveGracefulImage
      src={image ?? ''}
      placeholder={placeholder ?? ''}
    >
      {(src, loading) => (
        <img
          className={loading ? styles.loading : styles.loaded}
          src={src}
          alt='icon'
          style={{ width: 300, height: 300, objectFit: 'cover' }}
        />
      )}
    </ReactProgressiveGracefulImage>
  )
}

export default ProgressiveImage
