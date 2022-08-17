import {messages} from "../../../messages/messages";
import IconSelectDimension from "../../../assets/icons/icon-select-dimension";
import IconChooseMaterial from "../../../assets/icons/icon-choose-material";
import IconUploadPhoto from "../../../assets/icons/icon-upload-photo";
import IconUpdateCropper from "../../../assets/icons/icon-update-cropper";

export const STEPS: {
    title: string;
    icon: JSX.Element;
}[] = [
    {
        title: messages.uploadPhotoStepOne,
        icon: <IconUploadPhoto width={200} height={60} />
    },
    {
        title: messages.uploadPhotoStepTwo,
        icon: <IconSelectDimension width={200} height={60} />
    },
    {
        title: messages.uploadPhotoStepThree,
        icon: <IconUpdateCropper width={200} height={60} />
    },
    {
        title: messages.uploadPhotoStepFour,
        icon: <IconChooseMaterial width={200} height={60} />
    }
]

export const STEPS_GRID_STYLE = { justifyContent: { xs: "center", sm: "space-between", md: "space-between", lg: "space-between", xl: "space-between" } }