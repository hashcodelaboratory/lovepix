import styles from '../../../../image-configurator-layout.module.scss'
import Header from '../header/header'
import { Filter3 } from '@mui/icons-material'
import { messages } from '../../../../../../messages/messages'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { ImageLayout } from 'screens-content/home/enums/enums'
import { materials } from 'screens-content/home/utils/configuration'
import { useLiveQuery } from 'dexie-react-hooks'
import { configurationsTable } from '../../../../../../../database.config'
import { CONFIGURATION_TABLE_KEY } from '../../../../../../common/indexed-db/hooks/keys'

const Material = () => {
  const configuration = useLiveQuery(
    () => configurationsTable.get(CONFIGURATION_TABLE_KEY),
    []
  )

  const { t } = useTranslation()

  const changeMaterial = (id: string) => {
    configurationsTable.update('conf', {
      material: id,
    })
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
          material.id === configuration?.material
            ? styles.imageWrapper
            : styles.relativeContainer
        }
      >
        <Image
          onClick={() => changeMaterial(material.id)}
          alt={material.id}
          key={uuidv4()}
          src={material?.image ?? ''}
          height={100}
          width={100}
          layout={ImageLayout.FIXED}
          objectFit='cover'
          style={{
            borderRadius: 5,
            cursor: 'pointer',
          }}
        />
        <p className={styles.materialCardTitle}>{material.name}</p>
      </div>
    </div>
  ))

  return (
    <div className={styles.containerPadding}>
      <Header icon={<Filter3 />} title={String(t(messages.chooseMaterial))} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 50,
        }}
      >
        {materialItems}
      </div>

      <hr />
    </div>
  )
}

export default Material
