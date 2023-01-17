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
import { WALLER_IMAGE_LIST } from "screens-content/home/utils/image-upload";
import { useRouter } from "next/router";
import { configurationsTable } from "../../../../../database.config";

const CropperComponent = () => {
  const data = useLiveQuery(() => configurationsTable.get("conf"), []);

  const cropperRef = useRef<any>(null);

  const router = useRouter();

  const galleryId = router?.query?.gallery as unknown as string;

  const handleImageFromGallery = async () => {
    const source = WALLER_IMAGE_LIST.find((item) => item.id === galleryId);

    const res = await fetch(source?.sourceUrl ?? "");

    const file = await res.blob();

    const fr = new FileReader();

    fr.readAsDataURL(file);

    fr.onload = () => {
      const data = {
        origin: fr.result as string,
        image: undefined,
        dimensionId: undefined,
        material: undefined,
      };

      configurationsTable.add(data, "conf");
    };
  };

  useEffect(() => {
    if (galleryId) {
      handleImageFromGallery();
    }
  }, [galleryId]);

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
    (dim) => dim.id === data?.dimensionId
  );

  const aspectRatio =
    selectedDimension && selectedDimension?.width / selectedDimension?.height;

  useEffect(() => {
    cropperRef?.current?.cropper?.setAspectRatio(aspectRatio);
  }, [cropperRef, aspectRatio]);

  return !data?.origin ? (
    <DropzoneContainer />
  ) : (
    <Cropper
      src={data?.origin ?? ""}
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
