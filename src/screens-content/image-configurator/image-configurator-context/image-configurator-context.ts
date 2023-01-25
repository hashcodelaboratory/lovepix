import { createContext, Dispatch, SetStateAction } from 'react'

export type ImageConfiguratorContextProps = {
  state: {
    image?: string
  }
  stateAction: {
    setImage: Dispatch<SetStateAction<string | undefined>>
  }
}

const ImageConfiguratorContext = createContext<ImageConfiguratorContextProps>(
  {} as ImageConfiguratorContextProps
)

export default ImageConfiguratorContext
