import React from 'react'
import NaturalImage from "./natural-image";
import {imageSourceSet} from "./utils";
import ParallaxView from "./parallax-view";

type Props = {
  sourceUrl: string
  title: string
}

const ImageCard = ({sourceUrl, title}: Props) => (
  <ParallaxView>
    <NaturalImage
      src={imageSourceSet(sourceUrl)}
      alt={title}
    />
  </ParallaxView>
)

export default ImageCard