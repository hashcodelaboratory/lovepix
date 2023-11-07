import styles from '../../../../../image-configurator-layout.module.scss'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { ImageLayout } from '../../../../../../home/enums/enums'
import { DEFAULT_MATERIAL } from '../material'
import { MaterialType } from '../../../../../../../common/api/use-materials'
import { Material } from '../../../../../../../common/enums/material'

type MaterialItemProps = {
  material: MaterialType
  configMaterial: Material
  unavailableMaterialsIds: string[]
  changeMaterial: (type: Material) => void
}

const MaterialItem = ({
  material,
  configMaterial,
  unavailableMaterialsIds,
  changeMaterial,
}: MaterialItemProps) => {
  return (
    <div key={material.id} className={styles.materialItemColumn}>
      <div
        className={
          styles[
            material.type === configMaterial ?? DEFAULT_MATERIAL
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
            onClick={() => changeMaterial(material.type)}
            alt={material.id}
            key={uuidv4()}
            src={material?.image ?? ''}
            height={76}
            width={76}
            layout={ImageLayout.FIXED}
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
  )
}

export default MaterialItem
