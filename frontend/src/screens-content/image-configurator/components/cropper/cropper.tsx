import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, { useContext, useEffect, useRef } from "react";
import { dimensionsByHeight, dimensionsBySquare, dimensionsByWidth } from "screens-content/home/utils/configuration";
import DropzoneContainer from "screens-content/home/components/upload-image/dropzone/dropzone-container";
import { Configuration } from "../../../../common/types/configuration";
import styles from "../../image-configurator-layout.module.scss";
import ImageConfiguratorContext from "../../image-configurator-context/image-configurator-context";

type CropperComponentProps = {
  configuration: Configuration;
}

const CropperComponent = ({ configuration }: CropperComponentProps) => {
  const { stateAction } = useContext(ImageConfiguratorContext);

  const cropperRef = useRef<any>(null);

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
    stateAction.setCropper(cropperRef);
  }, [cropperRef, aspectRatio]);

  if (!configuration?.origin)
    return <div className={styles.dropzoneBox}>
      <DropzoneContainer configuration={configuration} />
    </div>;


  return (
    <div className={styles.dropzoneBox}>
        <Cropper
          src={configuration?.origin ?? ""}
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={16 / 9}
          aspectRatio={aspectRatio}
          guides={true}
          ref={cropperRef}
          cropBoxResizable={true}
          background={false}
          viewMode={2}
          dragMode="move"
          checkCrossOrigin={false}
          crossOrigin="anonymous"
        />
    </div>
  );
};

export default CropperComponent;