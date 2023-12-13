import React from 'react'
import Image from 'next/image'
import { ImageLayout } from '../../screens-content/home/enums/enums'

type ProgressiveImageProps = {
  image?: string
  placeholder?: string
  width?: number
  height?: number
  layout?: ImageLayout
}

const ProgressiveImage = ({
  image,
  placeholder,
  width = 300,
  height = 300,
  layout = ImageLayout.FIXED,
}: ProgressiveImageProps) => {
  return (
    <div style={{ width, height }}>
      <Image
        placeholder='blur'
        src={image ?? ''}
        blurDataURL={placeholder ?? ''}
        alt='image'
        layout={layout}
        objectFit='cover'
        width={width}
        height={height}
      />
    </div>
  )
}

export default ProgressiveImage
