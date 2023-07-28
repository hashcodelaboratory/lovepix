import { localizationKey } from '../../../localization/localization-key'
import Icon from '@icons/icon'
import { IconType } from '@icons/enums'

export const STEPS: {
  title: string
  icon: JSX.Element
}[] = [
  {
    title: localizationKey.uploadPhotoStepOne,
    icon: <Icon icon={IconType.UPLOAD_PHOTO} />,
  },
  {
    title: localizationKey.uploadPhotoStepTwo,
    icon: <Icon icon={IconType.SELECT_DIMENSION} />,
  },
  {
    title: localizationKey.uploadPhotoStepThree,
    icon: <Icon icon={IconType.UPDATE_CROPPER} />,
  },
  {
    title: localizationKey.uploadPhotoStepFour,
    icon: <Icon icon={IconType.CHOOSE_MATERIAL} />,
  },
]

export const STEPS_GRID_STYLE = {
  justifyContent: {
    xs: 'center',
    sm: 'space-between',
    md: 'space-between',
    lg: 'space-between',
    xl: 'space-between',
  },
}
