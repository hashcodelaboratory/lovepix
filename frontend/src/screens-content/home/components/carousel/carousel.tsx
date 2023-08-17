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
import { useContext, useState } from 'react'
import { ValidationContext } from 'screens-content/validationDialog/validationDialog'
import { Configuration } from 'common/types/configuration'

export enum CarouselTestIds {
  navigateToConfiguratorButtonTestId = 'navigate_to_configurator_button_test_id',
}

const Carousel = ({ configuration }: { configuration: Configuration }) => {
  const validation = useContext(ValidationContext)

  const { t } = useTranslation()
  const { printPhoto, uploadPhotoSubcontent, uploadPhoto } = localizationKey
  let imageData = {}
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()
  const checkFunction = () => {
    if (!configuration) return true
    if (!configuration.origin) return true
    return false
  }

  const responseFunc = (isTrue: boolean) => {
    console.log('hgiojfohio', imageData)
    if (isTrue) {
      if (!configuration)
        configurationsTable.add({ ...imageData }, CONFIGURATION_TABLE_KEY)
      else configurationsTable.update(CONFIGURATION_TABLE_KEY, { ...imageData })
    }
    return
  }

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
      imageData = data
      validation.validateFunction(checkFunction, responseFunc, 'Are you sure')
      //check_if_full(data, configuration, router)
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
          className={styles.dropzoneContainer}
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
          className={styles.dropzoneButton}
        >
          {String(t(uploadPhoto))}
        </Dropzone>
      </Container>
    </div>
  )
}

export default Carousel
