import styles from '../../home.module.scss'
import Container from '@mui/material/Container'
import { localizationKey } from '../../../../localization/localization-key'
import { SNACKBAR_OPTIONS_ERROR } from 'snackbar/config'
import { FileRejection } from 'react-dropzone'
import { Configuration } from 'common/types/configuration'
import { useDropzone } from 'react-dropzone'
import { useSnackbar } from 'notistack'
import {
  addImageToConfigurator,
  canAddImage,
} from 'common/utils/add-image-to-configurator'
import { useState } from 'react'
import { ImageAddType } from 'common/types/image-add-type'
import { ConfirmationModal } from 'screens-content/confirmation-modal/confirmation-modal'
import { useTranslation } from 'next-i18next'
import { Pages } from 'constants/pages/urls'
import { useRouter } from 'next/router'

export enum CarouselTestIds {
  navigateToConfiguratorButtonTestId = 'navigate_to_configurator_button_test_id',
}

type CarouselProps = {
  configuration: Configuration
}

const Carousel = ({ configuration }: CarouselProps) => {
  const { getRootProps: carouselRootProps, getInputProps: carouselInputProps } =
    useDropzone({
      onDropAccepted: (acceptedFiles) => {
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
      onDropAccepted: (acceptedFiles) => {
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

  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [imageData, setImageData] = useState<ImageAddType>()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const onDrop = async (files: File[]) => {
    const file = files[0]
    const fr = new FileReader()
    fr.readAsDataURL(file)

    fr.onload = () => {
      const image: ImageAddType = {
        origin: fr.result as string,
        image: undefined,
      }
      handleImageFlowTest(image)
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
  const modalButtonTrue = () => {
    setModalOpen(false)
    addImageToConfigurator(imageData!)
    router.push(t(Pages.CONFIGURATOR))
  }

  const modalButtonFalse = () => {
    setModalOpen(false)
  }

  const handleImageFlowTest = (image: ImageAddType) => {
    if (canAddImage(configuration)) {
      addImageToConfigurator(image)
      router.push(t(Pages.CONFIGURATOR))
    } else {
      setImageData(image)
      setModalOpen(true)
    }
  }

  return (
    <div {...carouselRootProps({ className: 'dropzone'})}>
      <input {...carouselInputProps()} />
      <div className={styles.carousel}>
        <Container className={styles.carouselContainer}>
          <h1 className={styles.carouselTitle}>
            {String(t(localizationKey.printPhoto))}
          </h1>
          <p className={styles.carouselSubTitle}>
            {String(t(localizationKey.uploadPhotoSubcontent))}
          </p>
          <button className={styles.carouselButton}>
            <div {...buttonRootProps({ className: 'dropzone' })}>
              <input {...buttonInputProps({})} />
              {String(t(localizationKey.uploadPhoto))}
            </div>
          </button>
        </Container>
      </div>
      <ConfirmationModal
        title={t(localizationKey.imageInConfiguratorTitle)}
        description={t(localizationKey.imageInConfiguratorDescription)}
        link={{
          href: t(Pages.CONFIGURATOR),
          text: t(localizationKey.imageInConfiguratorLink),
        }}
        buttonTrue={modalButtonTrue}
        buttonFalse={modalButtonFalse}
        defaultReturn={true}
        open={modalOpen}
      />
    </div>
  )
}

export default Carousel
