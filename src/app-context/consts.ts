import { ImageStatus } from "./enums";
import { UploadedImage } from "./app-context";

export const INITIAL_IMAGE: UploadedImage = {
  url: undefined,
  status: ImageStatus.DEFAULT,
  size: 0,
  name: undefined,
};
