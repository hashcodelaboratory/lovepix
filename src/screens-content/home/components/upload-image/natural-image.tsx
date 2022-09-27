import Image, {ImageProps} from 'next/image';
import {useState} from "react";

const NaturalImage = (props: ImageProps) => {
  const [ratio, setRatio] = useState(16/9) // default to 16:9

  return (
    <Image
      {...props}
      // set the dimension (affected by layout)
      width={600}
      height={600 / ratio}
      layout="responsive" // you can use "responsive", "fill" or the default "intrinsic"
      objectFit='cover'
      onLoadingComplete={({ naturalWidth, naturalHeight }) =>
        setRatio(naturalWidth / naturalHeight)
      }
    />
  )
}

export default NaturalImage