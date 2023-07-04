import { createContext, Dispatch } from "react";

export type ImageConfiguratorContextProps = {
  state: {
    cropper: any;
  }
  stateAction: {
    setCropper: Dispatch<any>;
  }
}

const ImageConfiguratorContext = createContext<ImageConfiguratorContextProps>(
  {} as ImageConfiguratorContextProps,
);

export default ImageConfiguratorContext;
