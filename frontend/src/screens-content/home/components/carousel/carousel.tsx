import styles from '../../home.module.scss'
import Container from '@mui/material/Container'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../localization/localization-key'
import useNavigation from '../../../../navigation/use-navigation'
import { Dropzone } from '@mantine/dropzone'
import { useRouter } from 'next/router'
import { SNACKBAR_OPTIONS_ERROR } from 'snackbar/config'
import { FileRejection } from 'react-dropzone'
import { useSnackbar } from 'notistack'
import { configurationsTable } from '../../../../../database.config'
import { CONFIGURATION_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import check_if_full from 'screens-content/image-configurator/components/popup/check-if-full'
import { useLiveQuery } from 'dexie-react-hooks'

export enum CarouselTestIds {
  navigateToConfiguratorButtonTestId = 'navigate_to_configurator_button_test_id',
}

const Carousel = (): JSX.Element => {
  const configuration = useLiveQuery(
    () => configurationsTable.get(CONFIGURATION_TABLE_KEY) ?? null,
    []
  )

  const { t } = useTranslation()
  const { navigateToConfigurator } = useNavigation()
  const { printPhoto, uploadPhotoSubcontent, uploadPhoto } = localizationKey

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

      check_if_full(data, configuration, router)
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

  return (
    <div className={styles.carousel}>
      <Container className={styles.carouselContainer}>
        <Dropzone
          activateOnClick={false}
          onDrop={(files) => onDrop(files)}
          onReject={(files) => onReject(files)}
          accept={{
            'image/*': [],
          }}
          multiple={false}
          maxSize={10000000}
          sx={{
            backgroundColor: 'transparent',
            borderColor: 'black',
            ':hover': {
              backgroundColor: 'transparent',
            },
            cursor: 'default',
            border: 'none',
            padding: 0,
            borderRadius: 0,
          }}
        >
          <h1 className={styles.carouselTitle}>{String(t(printPhoto))}</h1>
          <p className={styles.carouselSubTitle}>
            {String(t(uploadPhotoSubcontent))}
          </p>
        </Dropzone>
        <Dropzone
          activateOnClick={true}
          onDrop={(files) => onDrop(files)}
          onReject={(files) => onReject(files)}
          accept={{
            'image/*': [],
          }}
          multiple={false}
          sx={{
            backgroundColor: 'transparent',
            borderColor: 'black',
            ':hover': {
              backgroundColor: 'transparent',
            },
            border: 'none',
            padding: 0,
            borderRadius: 0,
          }}
        >
          <button
            data-testid={CarouselTestIds.navigateToConfiguratorButtonTestId}
            className={styles.carouselButton}
            onClick={navigateToConfigurator}
          >
            {String(t(uploadPhoto))}
          </button>
        </Dropzone>
      </Container>
    </div>
  )
}

export default Carousel
