import { localizationKey } from '../../../localization/localization-key'

export const MATERIALS: {
  img: string
  title: string
  text: string
}[] = [
  {
    img: 'https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/images%2Ffoto-na-platno.jpg?alt=media&token=261dff5d-85de-449b-8092-53f7a8ef5995',
    title: localizationKey.photoCanvasTitle,
    text: localizationKey.photoCanvasText,
  },
  {
    img: 'https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/images%2Ffoto-na-akryl.jpg?alt=media&token=5f0e1196-6f93-4447-9f5b-25b9c6b7a011',
    title: localizationKey.photoAcrylicTitle,
    text: localizationKey.photoAcrylicText,
  },
  {
    img: 'https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/images%2Ffoto-na-hlinikovej-doske.jpg?alt=media&token=73d7149c-1d50-4aa6-9277-723ce355bf78',
    title: localizationKey.photoAluminumTitle,
    text: localizationKey.photoAluminumText,
  },
]

export const MATERIALS_GRID_STYLE = {
  justifyContent: {
    xs: 'center',
    sm: 'center',
    md: 'space-between',
    lg: 'space-between',
    xl: 'space-between',
  },
}
