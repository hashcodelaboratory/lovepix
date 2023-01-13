import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, { useContext, useEffect, useRef } from "react";
import AppContext from "app-context/app-context";
import {
  dimensionsByHeight,
  dimensionsBySquare,
  dimensionsByWidth,
} from "screens-content/home/utils/configuration";
import DropzoneContainer from "screens-content/home/components/upload-image/dropzone/dropzone-container";
import ImageConfiguratorContext from "../../image-configurator-context/image-configurator-context";
import { useRouter } from "next/router";
import { WALLER_IMAGE_LIST } from "screens-content/home/utils/image-upload";
import { ImageStatus } from "app-context/enums";
import { useCreateOrder } from "screens-content/home/api/order/useCreateOrder";

const CropperComponent = () => {
  const {
    state: { image, dimensionId },
  } = useContext(AppContext);
  const {
    stateAction: { setImage },
  } = useContext(ImageConfiguratorContext);

  const { mutate: createOrder } = useCreateOrder();

  const cropperRef = useRef<any>(null);

  const router = useRouter();

  const galleryId = router?.query?.gallery as unknown as string;

  useEffect(() => {
    const source = WALLER_IMAGE_LIST.find((item) => item.id === galleryId);

    const data = {
      url: source?.sourceUrl,
      status: ImageStatus.UPLOADED,
      size: 1,
      name: source?.title,
    };

    const date = Date.now();

    console.log(data);

    setImage(data as any);
    createOrder({ image: data, date });
  }, [createOrder, galleryId, setImage]);

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
