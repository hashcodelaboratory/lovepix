import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, { useEffect, useRef, useState } from "react";
import { dimensionsByHeight, dimensionsBySquare, dimensionsByWidth } from "screens-content/home/utils/configuration";
import DropzoneContainer from "screens-content/home/components/upload-image/dropzone/dropzone-container";
import { configurationsTable } from "../../../../../database.config";
import { Configuration } from "../../../../common/types/configuration";

type CropperComponentProps = {
  configuration: Configuration;
}

const CropperComponent = ({ configuration }: CropperComponentProps) => {
  const cropperRef = useRef<any>(null);

  const [loading, setLoading] = useState(false);

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

  const selectedDimension = allDimensions.find(
    (dim) => dim.id === configuration?.dimensionId,
  );

  const aspectRatio =
    selectedDimension && selectedDimension?.width / selectedDimension?.height;

  useEffect(() => {
    cropperRef?.current?.cropper?.setAspectRatio(aspectRatio);
  }, [cropperRef, aspectRatio]);

  if (!configuration?.origin) return <DropzoneContainer configuration={configuration} />;

  if (loading) return <>Loading</>;

  return (
    <Cropper
      src={configuration?.origin ?? ""}
      style={{ height: 400, width: "100%" }}
      initialAspectRatio={16 / 9}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
      cropBoxResizable={true}
      ready={(e) => {
        if (e.type === "ready") {
          setLoading(false);
        } else {
          setLoading(true);
        }
      }}
    />
  );
};

export default CropperComponent;
