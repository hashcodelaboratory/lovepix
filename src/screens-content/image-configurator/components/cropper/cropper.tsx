import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, { useEffect, useRef } from "react";
import { dimensionsByHeight, dimensionsBySquare, dimensionsByWidth } from "screens-content/home/utils/configuration";
import DropzoneContainer from "screens-content/home/components/upload-image/dropzone/dropzone-container";
import { configurationsTable } from "../../../../../database.config";
import { Configuration } from "../../../../common/types/configuration";
import styles from "../../image-configurator-layout.module.scss";
import Image from "next/image";
import { ImageLayout } from "../../../home/enums/enums";
import { CONFIGURATION_TABLE_KEY } from "../../../../common/indexed-db/hooks/keys";
import { useTranslation } from "react-i18next";
import { messages } from "../../../../messages/messages";

type CropperComponentProps = {
  configuration: Configuration;
}

const CropperComponent = ({ configuration }: CropperComponentProps) => {
  const { t } = useTranslation();
  const cropperRef = useRef<any>(null);
  const confirmed = configuration?.saved ?? false;

  const onConfirm = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    configurationsTable.update(CONFIGURATION_TABLE_KEY, {
      image: cropper.getCroppedCanvas()?.toDataURL(),
      saved: true,
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

  if (!configuration?.origin)
    return <div className={styles.dropzoneBox}>
      <DropzoneContainer configuration={configuration} />
    </div>;


  return (
    <div className={styles.dropzoneBox}>
      {(!confirmed && configuration?.dimensionId) ?
        <>
          <Cropper
            src={configuration?.origin ?? ""}
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={16 / 9}
            guides={true}
            ref={cropperRef}
            cropBoxResizable={true}
            background={false}
            viewMode={2}
            dragMode="move"
            checkCrossOrigin={false}
            crossOrigin="anonymous"
          />
          <button disabled={confirmed} className={styles.confirmButton} onClick={onConfirm}>
            {String(t(messages.saveChanges))}
          </button>
        </> :
        <div className={styles.croppedContainer}>
          <Image className={styles.cropped} src={confirmed ? configuration?.image : configuration?.origin ?? ""}
                 width={600} height={400}
                 layout={ImageLayout.INTRINSIC} />
        </div>
      }
    </div>
  );
};

export default CropperComponent;
