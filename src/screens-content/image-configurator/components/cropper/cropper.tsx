import styles from "../../image-configurator-layout.module.scss";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useContext, useRef } from "react";
import AppContext from "app-context/app-context";
import {
  dimensionsByHeight,
  dimensionsBySquare,
  dimensionsByWidth,
} from "screens-content/home/utils/dimension";

const CropperComponent = () => {
  const cropperRef = useRef<HTMLImageElement>(null);

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    /*   console.log(cropper.getCroppedCanvas().toDataURL()); */
  };

  const {
    state: { image, dimensionId },
  } = useContext(AppContext);

  const allDimensions = [
    ...dimensionsByWidth,
    ...dimensionsByHeight,
    ...dimensionsBySquare,
  ];

  const selectedDimension = allDimensions.find((dim) => dim.id === dimensionId);

  const aspectRatio =
    selectedDimension && selectedDimension?.width / selectedDimension?.height;

  return (
    <Cropper
      src={image?.url}
      style={{ height: 400, width: "100%" }}
      // Cropper.js options
      aspectRatio={aspectRatio}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
      cropBoxResizable={true}
    />
  );
};

export default CropperComponent;
