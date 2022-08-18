import {messages} from "../../../messages/messages";
import Icons from "@icons/icons";

export const STEPS: {
    title: string;
    icon: JSX.Element;
}[] = [
    {
        title: messages.uploadPhotoStepOne,
        icon: Icons.uploadPhoto
    },
    {
        title: messages.uploadPhotoStepTwo,
        icon: Icons.selectDimension
    },
    {
        title: messages.uploadPhotoStepThree,
        icon: Icons.updateCropper
    },
    {
        title: messages.uploadPhotoStepFour,
        icon: Icons.chooseMaterial
    }
]

export const STEPS_GRID_STYLE = { justifyContent: { xs: "center", sm: "space-between", md: "space-between", lg: "space-between", xl: "space-between" } }