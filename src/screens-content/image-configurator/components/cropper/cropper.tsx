import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import AppContext from "app-context/app-context";
import {
  dimensionsByHeight,
  dimensionsBySquare,
  dimensionsByWidth,
} from "screens-content/home/utils/configuration";
import DropzoneContainer from "screens-content/home/components/upload-image/dropzone/dropzone-container";
import ImageConfiguratorContext from "../../image-configurator-context/image-configurator-context";

const CropperComponent = () => {
  const { state: { image, dimensionId } } = useContext(AppContext);
  const { stateAction: { setImage } } = useContext(ImageConfiguratorContext);

  const cropperRef = useRef<any>(null);

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    setImage(cropper.getCroppedCanvas()?.toDataURL());
  };

  const allDimensions = [
    ...dimensionsByWidth,
    ...dimensionsByHeight,
    ...dimensionsBySquare,
  ];

  const selectedDimension = allDimensions.find((dim) => dim.id === dimensionId);

  const aspectRatio =
    selectedDimension && selectedDimension?.width / selectedDimension?.height;

  useEffect(() => {
    cropperRef?.current?.cropper?.setAspectRatio(aspectRatio);
  }, [cropperRef, aspectRatio]);

  return !image?.url ? (
    <DropzoneContainer />
  ) : (
    <Cropper
      src={image?.url}
      style={{ height: 400, width: "100%" }}
      initialAspectRatio={16 / 9}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
      cropBoxResizable={true}
    />
  );
};

export default CropperComponent;
