import styles from "../../image-configurator-layout.module.scss";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useContext, useRef } from "react";
import AppContext from "app-context/app-context";

const CropperComponent = () => {
  const cropperRef = useRef<HTMLImageElement>(null);

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
  };

  const {
    state: { image },
  } = useContext(AppContext);

  console.log(image.url);

  return (
    <Cropper
      src='https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg'
      style={{ height: 400, width: "100%" }}
      // Cropper.js options
      initialAspectRatio={16 / 9}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
    />
  );
};

export default CropperComponent;
