import { Group } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import styles from '../../image-configurator-layout.module.scss'
import { DROPZONE_STYLE } from './utils'
import DropzoneIdle from './dropzone-idle'
import { FileRejection } from 'react-dropzone'
import Icon from '@icons/icon'
import { IconType } from '@icons/enums'
import { useSnackbar } from 'notistack'
import { SNACKBAR_OPTIONS_ERROR } from '../../../../snackbar/config'
import { localizationKey } from '../../../../localization/localization-key'
import { useTranslation } from 'next-i18next'
import { configurationsTable } from '../../../../../database.config'
import { Configuration } from '../../../../common/types/configuration'
import { CONFIGURATION_TABLE_KEY } from '../../../../common/indexed-db/hooks/keys'

type DropzoneContainerProps = {
  configuration: Configuration
}

const DropzoneContainer = ({ configuration }: DropzoneContainerProps) => {
  const { t } = useTranslation()

  const { printPhoto } = localizationKey

  const { enqueueSnackbar } = useSnackbar()

  const onDrop = async (files: File[]) => {
    const file = files[0]

    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = () => {
      const imageData = {
        origin: fr.result as string,
        image: undefined,
        dimensionId: undefined,
        material: undefined,
      }
      configurationsTable.add(imageData, CONFIGURATION_TABLE_KEY)
    }
  }

  const onReject = (files: FileRejection[]) => {
    enqueueSnackbar(
      `${String(t(localizationKey.fileRejected))} - ${
        files[0].errors[0].message
      }`,
      SNACKBAR_OPTIONS_ERROR
    )
  }

  return configuration?.origin ? null : (
    <>
      <Dropzone
        onDrop={(files) => onDrop(files)}
        onReject={(files) => onReject(files)}
        accept={{
          'image/*': [],
        }}
        sx={DROPZONE_STYLE}
        multiple={false}
        maxSize={10000000}
      >
        <Group position='center' spacing='xl' className={styles.dropzoneGroup}>
          <h1 className={styles.containerTitle}>{String(t(printPhoto))}</h1>
          <Dropzone.Accept>
            <Icon icon={IconType.UPLOAD_PHOTO} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <Icon icon={IconType.UPLOAD_PHOTO} />
          </Dropzone.Reject>
          <DropzoneIdle />
        </Group>
      </Dropzone>
    </>
  )
}

export default DropzoneContainer