import React from 'react'
import Image from 'next/image'

type ProgressiveImageProps = {
  image?: string
  placeholder?: string
}

const ProgressiveImage = ({ image, placeholder }: ProgressiveImageProps) => {
  return (
    <Image
      placeholder='blur'
      src={image ?? ''}
      blurDataURL={placeholder ?? ''}
      alt='image'
      layout='fixed'
      width={300}
      height={300}
    />
  )
}

export default ProgressiveImage
