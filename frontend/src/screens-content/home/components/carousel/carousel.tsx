import styles from '../../home.module.scss'
import Container from '@mui/material/Container'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../localization/localization-key'
import { Dropzone } from '@mantine/dropzone'
import { useRouter } from 'next/router'
import { SNACKBAR_OPTIONS_ERROR } from 'snackbar/config'
import { FileRejection } from 'react-dropzone'
import { useContext } from 'react'
import { ValidationContext } from 'screens-content/validation-provider/validationProvider'
import { Configuration } from 'common/types/configuration'
import { addImageToConfigurator } from 'common/utils/add-image-to-configurator'
import { useDropzone } from 'react-dropzone'
import { useSnackbar } from 'notistack'

export enum CarouselTestIds {
  navigateToConfiguratorButtonTestId = 'navigate_to_configurator_button_test_id',
}

const Carousel = ({ configuration }: { configuration: Configuration }) => {
  const { getRootProps: carouselRootProps, getInputProps: carouselInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        onDrop(acceptedFiles)
      },
      onDropRejected: (fileRejections) => {
        onReject(fileRejections)
      },
      multiple: false,
      noClick: true,
      accept: {
        'image/*': [],
      },
    })

  const { getRootProps: buttonRootProps, getInputProps: buttonInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        onDrop(acceptedFiles)
      },
      onDropRejected: (fileRejections) => {
        onReject(fileRejections)
      },
      multiple: false,
      noClick: false,
      accept: {
        'image/*': [],
      },
    })

  const validation = useContext(ValidationContext)

  const { t } = useTranslation()
  const { printPhoto, uploadPhotoSubcontent, uploadPhoto } = localizationKey
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const onDrop = async (files: File[]) => {
    const file = files[0]
    const fr = new FileReader()
    fr.readAsDataURL(file)

    fr.onload = () => {
      let data = {
        origin: fr.result as string,
        image: undefined,
        dimensionId: undefined,
        material: undefined,
      }
      addImageToConfigurator(configuration, data, validation, t, router)
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
    <div {...carouselRootProps({ className: 'dropzone', noClick: true })}>
      <input {...carouselInputProps()} />
      <div className={styles.carousel}>
        <Container className={styles.carouselContainer}>
          <h1 className={styles.carouselTitle}>{String(t(printPhoto))}</h1>
          <p className={styles.carouselSubTitle}>
            {String(t(uploadPhotoSubcontent))}
          </p>
          <button className={styles.carouselButton}>
            <div {...buttonRootProps({ className: 'dropzone' })}>
              <input {...buttonInputProps({})} />
              {String(t(uploadPhoto))}
            </div>
          </button>
        </Container>
      </div>
    </div>
  )
}

export default Carousel
