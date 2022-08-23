import {IconData} from "@icons/types";
import {IconType} from "@icons/enums";
import exampleIconPaths from "@icons/icon-paths";

export const ICONS: IconData = {
    [IconType.UPLOAD_PHOTO]: { data: exampleIconPaths.uploadPhoto },
    [IconType.CHOOSE_MATERIAL]: { data: exampleIconPaths.chooseMaterial },
    [IconType.SELECT_DIMENSION]: { data: exampleIconPaths.selectDimension, viewBox: "0 0 163.77 63.49" },
    [IconType.UPDATE_CROPPER]: { data: exampleIconPaths.updateCropper, viewBox: "0 0 80.3 63.49" },
};