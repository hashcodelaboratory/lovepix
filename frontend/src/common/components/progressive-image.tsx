import React from 'react'
import Image from 'next/image'

type ProgressiveImageProps = {
  image?: string
  placeholder?: string
}

const ProgressiveImage = ({ image, placeholder }: ProgressiveImageProps) => {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Image
        placeholder='blur'
        src={image ?? ''}
        blurDataURL={placeholder ?? ''}
        alt='image'
        layout='fixed'
        objectFit='cover'
        width={300}
        height={300}
      />
    </div>
  )
}

export default ProgressiveImage
