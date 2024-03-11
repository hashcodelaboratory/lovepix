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
import { Backdrop, CircularProgress } from '@mui/material'
import { Material } from '../../../../common/enums/material'
import { loggingService } from '../../../../analytics/logging-service'
import { LovepixEvent } from '../../../../analytics/lovepix-event'

export enum CarouselTestIds {
  navigateToConfiguratorButtonTestId = 'navigate_to_configurator_button_test_id',
}

type CarouselProps = {
  configuration: Configuration
}

const Carousel = ({ configuration }: CarouselProps) => {
  const router = useRouter()

  const [isComputing, setIsComputing] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [imageData, setImageData] = useState<ImageAddType>()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const {
    getRootProps: carouselRootProps,
    getInputProps: carouselInputProps,
    open,
  } = useDropzone({
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
    maxSize: 20000000,
  })

  const onDrop = async (files: File[]) => {
    loggingService.logEvent(
      LovepixEvent.UPLOAD_IMAGE_DRAG_AND_DROP_LANDING_PAGE,
      {
        extra: {
          files: files.map((file) => JSON.stringify(file)),
        },
      }
    )

    setIsComputing(true)

    const file = files[0]
    const fr = new FileReader()
    fr.readAsDataURL(file)

    fr.onload = () => {
      const image: ImageAddType = {
        origin: fr.result as string,
        image: undefined,
        dimensionId: undefined,
        material: Material.CANVAS,
      }
      handleImageFlowTest(image)
    }
  }

  const onReject = (files: FileRejection[]) => {
    setIsComputing(false)
    enqueueSnackbar(
      `${String(t(localizationKey.fileRejected))} - ${
        files[0].errors[0].message
      }`,
      SNACKBAR_OPTIONS_ERROR
    )
  }

  const toggleModal = () => setOpenModal(!openModal)

  const onConfirm = async () => {
    if (imageData) {
      toggleModal()
      addImageToConfigurator(imageData)
      await router.push(t(Pages.CONFIGURATOR))
    }
  }

  const onClose = () => toggleModal()

  const handleImageFlowTest = async (image: ImageAddType) => {
    if (canAddImage(configuration)) {
      addImageToConfigurator(image)
      await router.push(t(Pages.CONFIGURATOR))
    } else {
      setImageData(image)
      setOpenModal(true)
    }
  }

  return (
    <div {...carouselRootProps({ className: 'dropzone' })}>
      <input {...carouselInputProps()} />
      <Container className={styles.carouselContainer}>
        <h1 className={styles.carouselTitle}>
          {String(t(localizationKey.printPhoto))}
        </h1>
        <p className={styles.carouselSubTitle}>
          {String(t(localizationKey.uploadPhotoSubcontent))}
        </p>
      </Container>
      <div className={styles.carousel}>
        <Container className={styles.carouselContainerImage}>
          <div className={styles.carouselButton} onClick={open}>
            <div className={styles.carouselButtonIcon} />
            <p className={styles.carouselButtonText}>
              {String(t(localizationKey.uploadPhoto))}
            </p>
          </div>
        </Container>
      </div>
      <ConfirmationModal
        title={t(localizationKey.imageInConfiguratorTitle)}
        description={t(localizationKey.imageInConfiguratorDescription)}
        link={{
          href: t(Pages.CONFIGURATOR),
          text: t(localizationKey.imageInConfiguratorLink),
        }}
        onConfirm={onConfirm}
        onClose={onClose}
        open={openModal}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isComputing}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default Carousel
