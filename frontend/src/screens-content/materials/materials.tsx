import { Material, materialSection } from './components/section'
import { useTranslations } from '../../common/translations/useTranslations'
import { useTranslation } from 'next-i18next'
import { useMaterials } from 'common/api/use-materials'

const CustomMaterials = () => {
  const { i18n } = useTranslation()

  const { data: translations } = useTranslations(i18n.language)

  const materials: Material[] = [
    {
      title: translations?.materialsCanvasTitle,
      subtitle: translations?.materialsCanvasSubTitle,
      description: translations?.materialsCanvasDescription,
      illustration:
        'https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/materials-page%2Ffoto-na-platno.jpeg?alt=media&token=4cd5ef22-a11c-41ed-9a78-b24d1dc54ed7',
    },
    {
      title: translations?.materialsAcrylTitle,
      subtitle: translations?.materialsAcrylSubTitle,
      description: translations?.materialsAcrylDescription,
      illustration:
        'https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/materials-page%2Fakryl.png?alt=media&token=a22ad0a2-dd7b-497e-834b-87b229c5b02c',
    },
    {
      title: translations?.materialsAluminiumTitle,
      subtitle: translations?.materialsAluminiumSubTitle,
      description: translations?.materialsAluminiumDescription,
      illustration:
        'https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/materials-page%2Faluminium.png?alt=media&token=e7731043-dd86-4202-b048-8fd6966e0084',
    },
  ]

  const { data: materialsdata } = useMaterials()
  const visible = materialsdata?.filter((item) => item.availability == true)
  const titles = visible?.map(item => item.title)

  const visibleMaterials = materials.filter((item) => titles?.includes(item.title))
  return <>{visibleMaterials.map(materialSection)}</>
}

export default CustomMaterials
