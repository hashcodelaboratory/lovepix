import {messages} from "../../../messages/messages";
import Icon from "@icons/icon";
import {IconType} from "@icons/enums";

export const STEPS: {
    title: string;
    icon: JSX.Element;
}[] = [
    {
        title: messages.uploadPhotoStepOne,
        icon: <Icon icon={IconType.UPLOAD_PHOTO} />
    },
    {
        title: messages.uploadPhotoStepTwo,
        icon: <Icon icon={IconType.SELECT_DIMENSION} />
    },
    {
        title: messages.uploadPhotoStepThree,
        icon: <Icon icon={IconType.UPDATE_CROPPER} />
    },
    {
        title: messages.uploadPhotoStepFour,
        icon: <Icon icon={IconType.CHOOSE_MATERIAL} />
    }
]

export const STEPS_GRID_STYLE = { justifyContent: { xs: "center", sm: "space-between", md: "space-between", lg: "space-between", xl: "space-between" } }