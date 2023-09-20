import styles from '../../../../image-configurator-layout.module.scss'
import Header from '../header/header'
import { CheckCircle, Filter3 } from '@mui/icons-material'
import { localizationKey } from '../../../../../../localization/localization-key'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { ImageLayout } from 'screens-content/home/enums/enums'
import { configurationsTable } from '../../../../../../../database.config'
import { CONFIGURATION_TABLE_KEY } from '../../../../../../common/indexed-db/hooks/keys'
import { Configuration } from '../../../../../../common/types/configuration'
import { MaterialType } from 'common/api/use-materials'
import { Material as TypeOfMaterial } from '../../../../../../common/enums/material'

export const DEFAULT_MATERIAL: TypeOfMaterial = TypeOfMaterial.CANVAS

type MaterialProps = {
  configuration: Configuration
  materials: MaterialType[]
}

const Material = ({ configuration, materials }: MaterialProps) => {
  const { t } = useTranslation()
  const unavailableMaterials = materials.filter((item) => !item.availability)
  const unavailableMaterialsIds = unavailableMaterials?.map((item) => item.id)
  const changeMaterial = (type: TypeOfMaterial) => () => {
    if (materials.find((item) => item.type === type)?.availability) {
      configurationsTable.update(CONFIGURATION_TABLE_KEY, {
        material: type,
      })
    }
  }

  const materialItems = materials.map((material) => (
    <div
      key={material.id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        className={
          styles[
            material.type === configuration?.material ?? DEFAULT_MATERIAL
              ? 'imageWrapper'
              : 'relativeContainer'
          ]
        }
      >
        <div
          className={
            styles[
              unavailableMaterialsIds?.includes(material.id)
                ? 'imageBlur'
                : 'relativeContainer'
            ]
          }
        >
          <Image
            onClick={changeMaterial(material.type)}
            alt={material.id}
            key={uuidv4()}
            src={material?.image ?? ''}
            height={112}
            width={112}
            layout={ImageLayout.INTRINSIC}
            objectFit='cover'
            style={{
              cursor: unavailableMaterialsIds?.includes(material.id)
                ? 'not-allowed'
                : 'pointer',
            }}
          />
        </div>
      </div>
      <p
        className={
          unavailableMaterialsIds?.includes(material.id)
            ? styles.disabledMaterialCardTitle
            : styles.materialCardTitle
        }
      >
        {material.title}
      </p>
    </div>
  ))

  const icon = configuration?.material ? (
    <CheckCircle color='success' />
  ) : (
    <Filter3 />
  )

  return (
    <div className={styles.containerPadding}>
      <Header
        icon={icon}
        title={String(t(localizationKey.chooseMaterial))}
        success={!!configuration?.material}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        {materialItems}
      </div>
      <hr />
    </div>
  )
}

export default Material
