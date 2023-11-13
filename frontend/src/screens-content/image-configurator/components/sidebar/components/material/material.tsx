import styles from '../../../../image-configurator-layout.module.scss'
import Header from '../header/header'
import { CheckCircle, Filter3 } from '@mui/icons-material'
import { localizationKey } from '../../../../../../localization/localization-key'
import { useTranslation } from 'next-i18next'
import { configurationsTable } from '../../../../../../../database.config'
import { CONFIGURATION_TABLE_KEY } from '../../../../../../common/indexed-db/hooks/keys'
import { Configuration } from '../../../../../../common/types/configuration'
import { MaterialType } from 'common/api/use-materials'
import { Material as TypeOfMaterial } from '../../../../../../common/enums/material'
import MaterialItem from './components/material-item'

export const DEFAULT_MATERIAL: TypeOfMaterial = TypeOfMaterial.CANVAS

type MaterialProps = {
  configuration: Configuration
  materials: MaterialType[]
}

const Material = ({ configuration, materials }: MaterialProps) => {
  const { t } = useTranslation()
  const unavailableMaterials = materials.filter((item) => !item.availability)
  const unavailableMaterialsIds = unavailableMaterials?.map((item) => item.id)
  const changeMaterial = (type: TypeOfMaterial) => {
    if (materials.find((item) => item.type === type)?.availability) {
      configurationsTable.update(CONFIGURATION_TABLE_KEY, {
        material: type,
      })
    }
  }

  const materialItems = materials.map((material) => (
    <MaterialItem
      key={material.id}
      material={material}
      configMaterial={configuration?.material}
      unavailableMaterialsIds={unavailableMaterialsIds}
      changeMaterial={changeMaterial}
    />
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
      <div className={styles.materialItemRow}>{materialItems}</div>
      <hr />
    </div>
  )
}

export default Material
