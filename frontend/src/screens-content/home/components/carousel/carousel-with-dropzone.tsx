import styles from '../../home.module.scss'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../localization/localization-key'
import { Dropzone } from '@mantine/dropzone'
import { configurationsTable } from '../../../../../database.config'
import { CONFIGURATION_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { Pages } from 'constants/pages/urls'
import { useRouter } from 'next/router'
import { SNACKBAR_OPTIONS_ERROR } from 'snackbar/config'
import { FileRejection } from 'react-dropzone'
import { useSnackbar } from 'notistack'
import Carousel from './carousel'

const CarouselDropzone = (): JSX.Element => {
  const { t } = useTranslation()

  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const onDrop = async (files: File[]) => {
    const file = files[0]

    const fr = new FileReader()
    fr.readAsDataURL(file)

    fr.onload = () => {
      const data = {
        origin: fr.result as string,
        image: undefined,
        dimensionId: undefined,
        material: undefined,
      }

      configurationsTable.add(data, CONFIGURATION_TABLE_KEY)

      handleContinueConfiguration()
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

  const handleContinueConfiguration = () => {
    router.push(Pages.CONFIGURATOR)
  }

  return <Carousel />
}

export default CarouselDropzone
