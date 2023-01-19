import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, { useEffect, useRef } from "react";
import {
  dimensionsByHeight,
  dimensionsBySquare,
  dimensionsByWidth,
} from "screens-content/home/utils/configuration";
import DropzoneContainer from "screens-content/home/components/upload-image/dropzone/dropzone-container";
import { useLiveQuery } from "dexie-react-hooks";
import { configurationsTable } from "../../../../../database.config";

const CropperComponent = () => {
  const configuration = useLiveQuery(
    () => configurationsTable.get("conf"),
    [],
  );

  const cropperRef = useRef<any>(null);

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    configurationsTable.update("conf", {
      image: cropper.getCroppedCanvas()?.toDataURL(),
    });
  };

  const allDimensions = [
    ...dimensionsByWidth,
    ...dimensionsByHeight,
    ...dimensionsBySquare,
  ];

  const selectedDimension = allDimensions.find((dim) => dim.id === configuration?.dimensionId);

  const aspectRatio =
    selectedDimension && selectedDimension?.width / selectedDimension?.height;

  useEffect(() => {
    cropperRef?.current?.cropper?.setAspectRatio(aspectRatio);
  }, [cropperRef, aspectRatio]);

  return !configuration?.origin ? (
    <DropzoneContainer />
  ) : (
    <Cropper
      src={configuration?.origin ?? ""}
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
