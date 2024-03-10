import React from 'react'
import { ImageLayout } from '../../screens-content/home/enums/enums'
import Image from 'next/image'

type ProgressiveImageProps = {
  image?: string
  placeholder?: string
  width?: number
  height?: number
  layout?: ImageLayout
}

const ProgressiveImage = ({ image, placeholder }: ProgressiveImageProps) => {
  return (
    <img
      placeholder='blur'
      src={image ?? ''}
      alt='image'
      style={{
        minWidth: 150,
        minHeight: 150,
        height: '100%',
        objectFit: 'contain',
        margin: 'auto',
      }}
    />
  )
}

export default ProgressiveImage
